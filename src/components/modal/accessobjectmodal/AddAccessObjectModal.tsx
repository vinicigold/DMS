"use client"
import React, { useEffect } from "react"
import { Box, X, CirclePlus } from "lucide-react"
import { useModalStore } from "@/service/modal/useModalStore"
import { useAccessObjectStore } from "@/service/systemutilities/accessobject/useAccessObjectStore"

export default function AddAccessObjectModal() {
	const { currentModal, closeModal } = useModalStore()
	const { parentObjects, loading, fetchParents, addObject } =
		useAccessObjectStore()

	const [form, setForm] = React.useState({
		parentId: null as number | null,
		parentName: "",
		objectType: "",
		objectName: "",
		objectDescription: "",
		status: "true",
	})

	const resetForm = () => {
		setForm({
			parentId: null as number | null,
			parentName: "",
			objectType: "",
			objectName: "",
			objectDescription: "",
			status: "true",
		})
	}

	useEffect(() => {
		if (currentModal === "addAccessObj") {
			fetchParents()
		}
	}, [currentModal, fetchParents])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		await addObject({
			parentId: form.parentId,
			parentName: form.parentName,
			objectType: form.objectType,
			objectName: form.objectName,
			objectDescription: form.objectDescription,
			status: form.status === "true",
		})

		closeModal()
		resetForm()
	}

	const handleCloseModal = () => {
		closeModal()
		resetForm() // Reset form immediately when the close button is clicked
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target
		let newValue: string | number | null = value

		if (name === "parentId") {
			newValue = value === "" ? null : Number(value)
		}

		setForm((prev) => ({ ...prev, [name]: newValue }))
	}

	if (currentModal !== "addAccessObj") return null
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
								New Access Object
							</h3>
							<p className="text-sm text-gray-500">Ceate a new access object</p>
						</div>
					</div>
					<button
						onClick={handleCloseModal}
						className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200">
						<X className="h-4 w-4 text-gray-600" />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="p-6">
					<div className="space-y-4">
						<div>
							<label
								htmlFor="parentId"
								className="mb-2 block text-sm font-semibold text-[#112D4E]">
								Parent ID
							</label>
							<select
								name="parentId"
								value={form.parentId ?? ""}
								onChange={handleChange}
								className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
								disabled={loading}>
								<option value="">-- None (Parent) --</option>
								{(parentObjects ?? []).map((option) => (
									<option
										key={option.accessObjectId}
										value={option.accessObjectId}>
										{option.parentName}
									</option>
								))}
							</select>
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
								value={form.parentName}
								onChange={handleChange}
								name="parentName"
								required
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
								value={form.objectType}
								onChange={handleChange}
								name="objectType"
								required
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
								value={form.objectName}
								onChange={handleChange}
								name="objectName"
								required
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
								value={form.objectDescription}
								onChange={handleChange}
								name="objectDescription"
								required
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
								value={form.status}
								onChange={handleChange}
								className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none">
								<option value="true">Active</option>
								<option value="false">Inactive</option>
							</select>
						</div>
					</div>
					<div className="mt-6 flex gap-4">
						<button
							type="submit"
							// disabled={loading}
							className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#112D4E] to-[#3F72AF] px-6 py-3 text-white transition-all duration-200 hover:from-[#163b65] hover:to-[#4a7bc8] disabled:cursor-not-allowed disabled:opacity-50">
							{loading ? (
								<>
									<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
									Creating Access Object...
								</>
							) : (
								<>
									<CirclePlus className="h-5 w-5" />
									Create Access Object
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
