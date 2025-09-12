"use client"
import React, { useState } from "react"
import { X, UserRoundCog, CirclePlus } from "lucide-react"
import { useModalStore } from "@/service/modal/useModalStore"
import { useAccessRoleStore } from "@/service/systemutilities/accessrole/useAccessRoleStore"

export default function AddRoleModal() {
	const { currentModal, closeModal } = useModalStore()
	const { addRole, loading, error } = useAccessRoleStore()

	const [form, setForm] = useState({
		code: "",
		name: "",
		description: "",
		isactive: true,
	})
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target
		setForm((prev) => ({
			...prev,
			[name]: name === "isactive" ? value === "true" : value,
		}))
	}

	const resetForm = () =>
		setForm({ code: "", name: "", description: "", isactive: true })

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		await addRole(form)
		resetForm()
		closeModal()
	}
	const handleClose = () => {
		closeModal()
		resetForm()
	}

	if (currentModal !== "addAccessRole") return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overscroll-contain bg-black/50 p-4 backdrop-blur-sm">
			<div className="hide-scrollbar max-h-[90vh] w-full max-w-lg scale-100 transform overflow-y-auto rounded-3xl bg-white shadow-2xl transition-all duration-300">
				<div className="flex items-center justify-between border-b border-gray-100 p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#112D4E] to-[#3F72AF]">
							<UserRoundCog className="h-5 w-5 text-white" />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#112D4E]">Add New Role</h3>
							<p className="text-sm text-gray-500">Ceate a new user role</p>
						</div>
					</div>
					<button
						onClick={handleClose}
						className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200">
						<X className="h-4 w-4 text-gray-600" />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="p-6">
					<div className="space-y-4">
						<div>
							<label
								htmlFor="code"
								className="mb-2 block text-sm font-semibold text-[#112D4E]">
								Role Code *
							</label>
							<input
								type="text"
								id="code"
								name="code"
								onChange={handleChange}
								value={form.code}
								required
								maxLength={10}
								className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] uppercase transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
							/>
							<p className="mt-1 text-xs text-gray-500">
								Short code for the role(max 10 character)
							</p>
						</div>
						<div>
							<label
								htmlFor="name"
								className="mb-2 block text-sm font-semibold text-[#112D4E]">
								Role Name *
							</label>
							<input
								type="text"
								id="name"
								name="name"
								onChange={handleChange}
								value={form.name}
								required
								placeholder="e.g., HR Manager, Administrator"
								className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] uppercase transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
							/>
						</div>
						<div>
							<label
								htmlFor="name"
								className="mb-2 block text-sm font-semibold text-[#112D4E]">
								Description*
							</label>
							<textarea
								id="description"
								name="description"
								onChange={handleChange}
								value={form.description}
								required
								rows={3}
								className="w-full resize-none rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
								placeholder="Describe the role responsibilities and permissions..."
							/>
						</div>
						<div>
							<label
								htmlFor="name"
								className="mb-2 block text-sm font-semibold text-[#112D4E]">
								Role Status*
							</label>
							<select
								id="status"
								name="status"
								value={form.isactive.toString()}
								onChange={handleChange}
								className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none">
								<option value="true">Active</option>
								<option value="false">Inactive</option>
							</select>
						</div>
						{error && (
							<div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
								<p className="text-center text-sm font-medium text-red-600">
									{error}
								</p>
							</div>
						)}
					</div>
					<div className="mt-6 flex gap-4">
						<button
							type="submit"
							disabled={loading}
							className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#112D4E] to-[#3F72AF] px-6 py-3 text-white transition-all duration-200 hover:from-[#163b65] hover:to-[#4a7bc8] disabled:cursor-not-allowed disabled:opacity-50">
							{loading ? (
								<>
									<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
									Creating Role...
								</>
							) : (
								<>
									<CirclePlus className="h-5 w-5" />
									Create Role
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
