"use client"
import React, { useEffect } from "react"
import { SquarePen, Trash2, CirclePlus } from "lucide-react"
import { FetchDoctypeTable } from "@/service/apireference/doctype/table/FetchDoctypeTable"
import AddDoctypeModal from "@/components/modal/doctypemodal/AddDoctypeModal"
import { useModalStore } from "@/service/modal/useModalStore"
import { useDoctypeStore } from "@/service/apireference/doctype/useDoctypeStore"
import EditDoctypeModal from "@/components/modal/doctypemodal/EditDoctypeModa"

export default function DoctypeTable() {
	const { data, page, limit, total, totalPages, setPage, fetchDoctypes } =
		FetchDoctypeTable()
	const { setSelectedDoctype } = useDoctypeStore()
	const { openModal } = useModalStore()

	useEffect(() => {
		fetchDoctypes(page, limit)
	}, [page, limit, fetchDoctypes])

	return (
		<div className="bg-white text-[#112D4E] p-4 rounded-lg shadow-md">
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center justify-between mb-2 text-xs">
					<div>
						Show{" "}
						<select
							value={limit}
							onChange={(e) => {
								const newLimit = parseInt(e.target.value, 10)
								FetchDoctypeTable.getState().setLimit(newLimit)
								setPage(1)
							}}
							className="border border-gray-300 rounded px-1 py-1">
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
						</select>{" "}
						entries
					</div>
				</div>
				<button
					onClick={() => openModal("addDoc")}
					className="bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-4 py-2 rounded-lg hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200 flex items-center gap-2">
					<CirclePlus className="w-4 h-4" />
					Add Document Type
				</button>
			</div>

			{/* Table */}
			<div className="overflow-x-auto hide-scrollbar h-[450px]">
				<table className="w-full text-sm">
					<thead>
						<tr className="bg-[#CCE3FF] text-[#112D4E]">
							<th className="px-3 py-2 text-left font-semibold">ID</th>
							<th className="px-3 py-2 text-left font-semibold">
								Document Type Name
							</th>
							<th className="px-3 py-2 text-left font-semibold">
								Date Created
							</th>
							<th className="px-3 py-2 text-center font-semibold">Function</th>
						</tr>
					</thead>
					<tbody>
						{data.map((doc) => (
							<tr key={doc.doctypeid} className="border-b hover:bg-gray-50">
								<td className="px-3 py-2">{doc.doctypeid}</td>
								<td className="px-3 py-2">{doc.doctypename}</td>
								<td className="px-3 py-2">
									{new Date(doc.createdat).toLocaleDateString()}
								</td>
								<td className="px-3 py-2">
									<div className="flex justify-center gap-2">
										<button
											onClick={() => {
												setSelectedDoctype({
													doctypeid: doc.doctypeid,
													doctypename: doc.doctypename,
												})
												openModal("editDoc")
											}}
											title="Edit Document Type"
											className="hover:bg-[#CCE3FF] p-1 rounded transition-all duration-200">
											<SquarePen className="w-4 h-4 text-[#3F72AF] hover:text-[#112D4E]" />
										</button>
										<button
											title="Delete Document Type"
											className="hover:bg-[#CCE3FF] p-1 rounded transition-all duration-200">
											<Trash2 className="w-4 h-4 text-red-500 hover:text-[#112D4E]" />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex items-center justify-between text-sm mt-3 mb-1 space-x-2">
				<div className="text-gray-500">
					Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of{" "}
					{total} entries
				</div>
				<div className="flex items-center space-x-1">
					<button
						onClick={() => setPage(Math.max(page - 1, 1))}
						disabled={page === 1}
						className="px-2 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-[#CCE3FF] disabled:opacity-50">
						&lt;
					</button>

					{Array.from({ length: totalPages }, (_, i) => i + 1)
						.filter(
							(p) =>
								p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)
						)
						.map((p, idx, arr) => (
							<React.Fragment key={p}>
								{idx > 0 && p - arr[idx - 1] > 1 && (
									<span className="px-1">...</span>
								)}
								<button
									onClick={() => setPage(p)}
									className={`px-2 py-1 rounded-lg ${
										p === page
											? "bg-[#CCE3FF] text-[#112D4E]"
											: "bg-gray-200 text-gray-700 hover:bg-[#CCE3FF]"
									}`}>
									{p}
								</button>
							</React.Fragment>
						))}
					<button
						onClick={() => setPage(Math.min(page + 1, totalPages))}
						disabled={page === totalPages}
						className="px-2 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-[#CCE3FF] disabled:opacity-50">
						&gt;
					</button>
				</div>
			</div>
			<AddDoctypeModal />
			<EditDoctypeModal />
		</div>
	)
}
