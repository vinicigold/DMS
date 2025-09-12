"use client"
import React from "react"
import { Box, X, CirclePlus } from "lucide-react"
import { useModalStore } from "@/service/modal/useModalStore"
import { useAccessObjectStore } from "@/service/systemutilities/accessobject/useAccessObjectStore"

export default function EditAccessObjectModal() {
	const { currentModal, closeModal } = useModalStore()
	const { currentEditObj, editAccObj, loading } = useAccessObjectStore()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!currentEditObj) return
		const formData = new FormData(e.currentTarget as HTMLFormElement)

		await editAccObj({
			accessObjectId: currentEditObj.accessObjectId,
			parentId: formData.get("parentId")
				? Number(formData.get("parentId"))
				: null,
			parentName: (formData.get("parentName") as string) || "",
			objectType: (formData.get("objectType") as string) || "",
			objectName: (formData.get("objectName") as string) || "",
			objectDescription: (formData.get("objectDescription") as string) || "",
			status: formData.get("status") === "true",
		})

		closeModal()
	}
	if (currentModal !== "editAccessObj" || !currentEditObj) return null
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overscroll-contain bg-black/50 p-4 backdrop-blur-sm">
			<div className="hide-scrollbar max-h-[90vh] w-full max-w-lg scale-100 transform overflow-y-auto rounded-3xl bg-white shadow-2xl transition-all duration-300">
				<div className="flex items-center justify-between border-b border-gray-100 p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#112D4E] to-[#3F72AF]">
							<Box className="h-5 w-5 text-white" />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#112D4E]">
								Edit System Configuration
							</h3>
							<p className="text-sm text-gray-500">
								Edit a system configuration
							</p>
						</div>
					</div>
					<button
						onClick={closeModal}
						className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200">
						<X className="h-4 w-4 text-gray-600" />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="p-6">
					<div className="space-y-4">
						<div className="space-y-4">
							<div>
								<label
									htmlFor="accessObjectId"
									className="mb-2 block text-sm font-semibold text-[#112D4E]">
									Access Object ID *
								</label>
								<input
									type="number"
									id="accessObjectId"
									name="accessObjectId"
									readOnly
									defaultValue={currentEditObj.accessObjectId}
									className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
								/>
							</div>
							<div>
								<label
									htmlFor="parentId"
									className="mb-2 block text-sm font-semibold text-[#112D4E]">
									Parent ID *
								</label>
								<input
									type="text"
									id="parentId"
									name="parentId"
									required
									readOnly
									defaultValue={currentEditObj.parentId ?? ""}
									className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
								/>
							</div>
							<div>
								<label
									htmlFor="parentName"
									className="mb-2 block text-sm font-semibold text-[#112D4E]">
									Parent Name *
								</label>
								<input
									type="text"
									id="parentName"
									name="parentName"
									required
									defaultValue={currentEditObj.parentName}
									className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
								/>
							</div>
							<div>
								<label
									htmlFor="objectType"
									className="mb-2 block text-sm font-semibold text-[#112D4E]">
									Object Type *
								</label>
								<input
									type="text"
									id="objectType"
									name="objectType"
									required
									defaultValue={currentEditObj.objectType}
									className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
								/>
							</div>
							<div>
								<label
									htmlFor="objectName"
									className="mb-2 block text-sm font-semibold text-[#112D4E]">
									Object Name *
								</label>
								<input
									type="text"
									id="objectName"
									name="objectName"
									required
									defaultValue={currentEditObj.objectName}
									className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
								/>
							</div>
							<div>
								<label
									htmlFor="objectDescription"
									className="mb-2 block text-sm font-semibold text-[#112D4E]">
									Object Description *
								</label>
								<input
									type="text"
									id="objectDescription"
									name="objectDescription"
									required
									defaultValue={currentEditObj.objectDescription}
									className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
								/>
							</div>
							<div>
								<label
									htmlFor="status"
									className="mb-2 block text-sm font-semibold text-[#112D4E]">
									System Configuration Status*
								</label>
								<select
									id="status"
									name="status"
									defaultValue={currentEditObj.status ? "true" : "false"}
									className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none">
									<option value="true">Active</option>
									<option value="false">Inactive</option>
								</select>
							</div>
						</div>
						<div className="mt-6 flex gap-4">
							<button
								type="submit"
								disabled={loading}
								className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#112D4E] to-[#3F72AF] px-6 py-3 text-white transition-all duration-200 hover:from-[#163b65] hover:to-[#4a7bc8] disabled:cursor-not-allowed disabled:opacity-50">
								{loading ? (
									<>
										<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
										Updating Access Object...
									</>
								) : (
									<>
										<CirclePlus className="h-5 w-5" />
										Update Access Object
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
