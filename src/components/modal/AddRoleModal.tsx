"use client"
import React, { useState } from "react"
import { AddRole } from "@/service/systemutilities/accessrole/AddRole"
import { X, UserRoundCog, CirclePlus } from "lucide-react"

interface AddRoleModalProps {
	readonly isOpen: boolean
	readonly onClose: () => void
	readonly onAdd: (role: Role) => void
}

interface Role {
	roleid: number
	code: string
	accessname: string
	description: string
	status: boolean
}

interface RoleData {
	code: string
	name: string
	description: string
	isactive: boolean
}

export default function AddRoleModal({
	isOpen,
	onClose,
	onAdd,
}: AddRoleModalProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")
	const [formData, setFormData] = useState<RoleData>({
		code: "",
		name: "",
		description: "",
		isactive: true,
	})

	const initialFormData: RoleData = {
		code: "",
		name: "",
		description: "",
		isactive: true,
	}
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: name === "isactive" ? value === "true" : value,
		}))
	}
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError("")

		try {
			const data = await AddRole(formData)
			console.log("AddRole response:", data)

			if (data) {
				const newRole: Role = {
					roleid: data.roleid,
					code: data.code,
					accessname: data.accessname,
					description: data.description,
					status: data.status,
				}

				onAdd(newRole) // <-- update parent state
				onClose()
				setFormData(initialFormData)
			} else {
				setError("Failed to add role")
			}
		} catch (err) {
			setError("Failed to add role")
			console.error(err)
		}

		setIsLoading(false)
	}
	const handleClose = () => {
		setFormData(initialFormData)
		onClose()
		setError("")
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-hidden overscroll-contain">
			<div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto hide-scrollbar">
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-xl flex items-center justify-center">
							<UserRoundCog className="w-5 h-5 text-white" />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#112D4E]">Add New Role</h3>
							<p className="text-sm text-gray-500">Ceate a new user role</p>
						</div>
					</div>
					<button
						onClick={handleClose}
						className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
						<X className="w-4 h-4 text-gray-600" />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="p-6">
					<div className="space-y-4">
						<div>
							<label
								htmlFor="code"
								className="block text-[#112D4E] font-semibold mb-2 text-sm">
								Role Code *
							</label>
							<input
								type="text"
								id="code"
								name="code"
								onChange={handleChange}
								value={formData.code}
								required
								maxLength={10}
								className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200 uppercase"
							/>
							<p className="text-xs text-gray-500 mt-1">
								Short code for the role(max 10 character)
							</p>
						</div>
						<div>
							<label
								htmlFor="name"
								className="block text-[#112D4E] font-semibold mb-2 text-sm">
								Role Name *
							</label>
							<input
								type="text"
								id="name"
								name="name"
								onChange={handleChange}
								value={formData.name}
								required
								placeholder="e.g., HR Manager, Administrator"
								className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200 uppercase"
							/>
						</div>
						<div>
							<label
								htmlFor="name"
								className="block text-[#112D4E] font-semibold mb-2 text-sm">
								Description*
							</label>
							<textarea
								id="description"
								name="description"
								onChange={handleChange}
								value={formData.description}
								required
								rows={3}
								className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200 resize-none"
								placeholder="Describe the role responsibilities and permissions..."
							/>
						</div>
						<div>
							<label
								htmlFor="name"
								className="block text-[#112D4E] font-semibold mb-2 text-sm">
								Role Status*
							</label>
							<select
								id="isactive"
								name="isactive"
								onChange={handleChange}
								value={formData.isactive.toString()}
								className="w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200">
								<option value="true">Active</option>
								<option value="false">Inactive</option>
							</select>
						</div>
						{error && (
							<div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
								<p className="font-medium text-sm text-center text-red-600">
									{error}
								</p>
							</div>
						)}
						<div className="flex gap-4 mt-6">
							<button
								type="submit"
								disabled={isLoading}
								className="flex-1 bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-6 py-3 rounded-xl hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
								{isLoading ? (
									<>
										<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
										Creating Role...
									</>
								) : (
									<>
										<CirclePlus className="w-5 h-5" />
										Create Role
									</>
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
