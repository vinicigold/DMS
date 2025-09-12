"use client"
import React from "react"
import { useModalStore } from "@/service/modal/useModalStore"
import { X, UserRoundCog, Save } from "lucide-react"
import { useAccessRoleStore } from "@/service/systemutilities/accessrole/useAccessRoleStore"

export default function EditRoleModal() {
	const { currentModal, closeModal } = useModalStore()
	const { currentEditRole, editRole, loading } = useAccessRoleStore()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!currentEditRole) return
		const formData = new FormData(e.currentTarget as HTMLFormElement)

		await editRole({
			roleid: currentEditRole.roleid,
			accessname: (formData.get("accessname") as string) || "",
			description: (formData.get("description") as string) || "",
			status: formData.get("status") === "true",
		})

		closeModal()
	}

	if (currentModal !== "editRole" || !currentEditRole) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
			<div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
				{/* header */}
				<div className="flex items-center justify-between border-b border-gray-100 p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#112D4E] to-[#3F72AF]">
							<UserRoundCog className="h-5 w-5 text-white" />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#112D4E]">Edit Role</h3>
							<p className="text-sm text-gray-500">Update role details</p>
						</div>
					</div>
					<button
						onClick={closeModal}
						className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200">
						<X className="h-4 w-4 text-gray-600" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4 p-6">
					<div>
						<label
							htmlFor="accessname"
							className="mb-2 block text-sm font-semibold text-[#112D4E]">
							Access Name *
						</label>
						<input
							type="text"
							id="accessname"
							name="accessname"
							required
							defaultValue={currentEditRole.name}
							className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
						/>
					</div>
					<div>
						<label
							htmlFor="description"
							className="mb-2 block text-sm font-semibold text-[#112D4E]">
							Description
						</label>
						<input
							type="text"
							id="description"
							name="description"
							defaultValue={currentEditRole.description}
							className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
						/>
					</div>
					<div>
						<label
							htmlFor="status"
							className="mb-2 block text-sm font-semibold text-[#112D4E]">
							Status
						</label>
						<select
							id="status"
							name="status"
							defaultValue={currentEditRole.isactive ? "true" : "false"}
							className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none">
							<option value="true">Active</option>
							<option value="false">Inactive</option>
						</select>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#112D4E] to-[#3F72AF] px-6 py-3 text-white transition hover:from-[#163b65] hover:to-[#4a7bc8] disabled:opacity-50">
						{loading ? (
							<>
								<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
								Updating Role...
							</>
						) : (
							<>
								<Save className="h-5 w-5" />
								Update Role
							</>
						)}
					</button>
				</form>
			</div>
		</div>
	)
}
