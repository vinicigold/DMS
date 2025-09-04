"use client"
import React from "react"
import { X, UserRoundCog, Save } from "lucide-react"
import { useModalStore } from "@/service/modal/useModalStore"
import { useDoctypeStore } from "@/service/apireference/doctype/useDoctypeStore"
import { EditDoctype } from "@/service/apireference/doctype/EditDoctype"
import { FetchDoctypeTable } from "@/service/apireference/doctype/table/FetchDoctypeTable"

export default function EditDoctypeModal() {
	const { fetchDoctypes } = FetchDoctypeTable()
	const { currentModal, closeModal } = useModalStore()
	const { selectedDoctype } = useDoctypeStore()
	const { isLoading, error, editDoctype } = EditDoctype()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!selectedDoctype) {
			console.error("No doctype selected")
			return
		}

		const formData = new FormData(e.currentTarget)
		const docTypeName = formData.get("doctypename") as string

		const payload: {
			doctypeID: number
			docTypeName: string
		} = {
			doctypeID: selectedDoctype.doctypeid,
			docTypeName,
		}

		await editDoctype(payload)

		fetchDoctypes()

		closeModal()
	}

	if (currentModal !== "editDoc" || !selectedDoctype) return null

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-hidden overscroll-contain">
			<div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto hide-scrollbar">
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-xl flex items-center justify-center">
							<UserRoundCog className="w-5 h-5 text-white" />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#112D4E]">
								Edit Document
							</h3>
							<p className="text-sm text-gray-500">Edit a document type</p>
						</div>
					</div>
					<button
						onClick={closeModal}
						className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
						<X className="w-4 h-4 text-gray-600" />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="p-6">
					<div className="space-y-4">
						<div>
							<label
								htmlFor="doctypeid"
								className="block text-[#112D4E] font-semibold mb-2 text-sm">
								Document Type ID *
							</label>
							<input
								type="text"
								id="doctypeid"
								name="doctypeid"
								value={selectedDoctype.doctypeid}
								readOnly
								required
								className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200 uppercase"
							/>
						</div>
						<div>
							<label
								htmlFor="doctypename"
								className="block text-[#112D4E] font-semibold mb-2 text-sm">
								Document Type Name *
							</label>
							<input
								type="text"
								id="doctypename"
								name="doctypename"
								defaultValue={selectedDoctype.doctypename}
								required
								className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200 uppercase"
							/>
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
								className="flex-1 bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-6 py-3 rounded-xl hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
								{isLoading ? (
									<>
										<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
										Creating Document Type...
									</>
								) : (
									<>
										<Save className="w-5 h-5" />
										Create Document Type
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
