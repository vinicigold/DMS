"use client"
import React, { useEffect, useState } from "react"
import { X, UserRoundCog, Save } from "lucide-react"

interface EditRoleModalProps {
	readonly isOpen: boolean
	readonly onClose: () => void
	readonly roleData: RoleData | null
}

interface RoleData {
	id?: string | number
	name: string
	description: string
	isactive: boolean
}

export default function EditRoleModal({
	isOpen,
	onClose,
	roleData,
}: EditRoleModalProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState<RoleData>({
		name: "",
		description: "",
		isactive: true,
	})

	// Load roleData when modal opens
	useEffect(() => {
		if (roleData) {
			setFormData(roleData)
		}
	}, [roleData])

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

		console.log("Updating role with data:", formData)

		// simulate API call
		await new Promise((res) => setTimeout(res, 1000))

		setIsLoading(false)
		onClose()
	}

	if (!isOpen) return null // ⬅️ prevent rendering when closed

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg transform transition-all duration-300 max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-xl flex items-center justify-center">
							<UserRoundCog className="w-5 h-5 text-white" />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#112D4E]">Edit Role</h3>
							<p className="text-sm text-gray-500">Edit user role</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
						<X className="w-4 h-4 text-gray-600" />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					<div>
						<label className="block text-[#112D4E] font-semibold mb-2 text-sm">
							Role Name *
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							placeholder="e.g., HR Manager"
							className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] uppercase"
						/>
					</div>

					<div>
						<label className="block text-[#112D4E] font-semibold mb-2 text-sm">
							Description *
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							required
							rows={3}
							className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] resize-none"
							placeholder="Describe role responsibilities..."
						/>
					</div>

					<div>
						<label className="block text-[#112D4E] font-semibold mb-2 text-sm">
							Role Status *
						</label>
						<select
							name="isactive"
							value={formData.isactive.toString()}
							onChange={handleChange}
							className="w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
							<option value="true">Active</option>
							<option value="false">Inactive</option>
						</select>
					</div>

					<div className="flex gap-4 mt-6">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100">
							Cancel
						</button>
						<button
							type="submit"
							disabled={isLoading}
							className="flex-1 bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-6 py-3 rounded-xl hover:from-[#163b65] hover:to-[#4a7bc8] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
							{isLoading ? (
								<>
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									Updating Role...
								</>
							) : (
								<>
									<Save className="w-5 h-5" />
									Update Role
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
