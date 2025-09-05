"use client"
import React, { useEffect } from "react"
import { SquarePen, CirclePlus, ToggleRight, ToggleLeft } from "lucide-react"
import { FetchFiletypeTable } from "@/service/apireference/filetype/table/FetchFiletypeTable"
import { useModalStore } from "@/service/modal/useModalStore"
import AddFiletypeModal from "@/components/modal/filetypemodal/AddFiletypeModal"
import EditFiletypeModal from "@/components/modal/filetypemodal/EditFiletypeModal"
import { useFileTypeStore } from "@/service/apireference/filetype/useFiletypeStore"
import { EditFileType } from "@/service/apireference/filetype/EditFiletype"

export default function FiletypeTabe() {
	const { data, page, limit, total, totalPages, setPage, fetchFiletypes } =
		FetchFiletypeTable()
	const { setSelectedFileType } = useFileTypeStore()
	const { openModal } = useModalStore()
	useEffect(() => {
		fetchFiletypes(page, limit)
	}, [page, limit, fetchFiletypes])

	const getStatusBadge = (status: boolean) => {
		const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
		return status
			? `${baseClasses} bg-green-100 text-green-800`
			: `${baseClasses} bg-red-100 text-red-800`
	}

	const handleToggleEnabled = (doc: {
		id: number
		mimeType: string
		description: string
		status: boolean
	}) => {
		const newStatus = !doc.status

		FetchFiletypeTable.getState().updateFiletypeStatus(doc.id, newStatus)

		EditFileType.getState()
			.editFileType({
				fileTypeId: doc.id,
				mimeType: doc.mimeType,
				description: doc.description,
				status: newStatus,
			})
			.catch(() => {
				FetchFiletypeTable.getState().updateFiletypeStatus(doc.id, doc.status)
			})
	}

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
								FetchFiletypeTable.getState().setLimit(newLimit)
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
					onClick={() => openModal("addFile")}
					className="bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-4 py-2 rounded-lg hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200 flex items-center gap-2">
					<CirclePlus className="w-4 h-4" />
					Add File Type
				</button>
			</div>

			{/* Table */}
			<div className="overflow-x-auto h-[450px]">
				<table className="w-full text-sm">
					<thead>
						<tr className="bg-[#CCE3FF] text-[#112D4E]">
							<th className="px-3 py-2 text-left font-semibold">ID</th>
							<th className="px-3 py-2 text-left font-semibold">
								File Mime Type
							</th>
							<th className="px-3 py-2 text-left font-semibold">Description</th>
							<th className="px-3 py-2 text-left font-semibold">Status</th>
							<th className="px-3 py-2 text-center font-semibold">Function</th>
						</tr>
					</thead>
					<tbody>
						{data.map((file) => (
							<tr key={file.id} className="border-b hover:bg-gray-50">
								<td className="px-3 py-2">{file.id}</td>
								<td className="px-3 py-2">{file.mimeType}</td>
								<td className="px-3 py-2">{file.description}</td>
								<td className="px-3 py-2">
									<span className={getStatusBadge(file.status)}>
										{file.status ? "Active" : "Disabled"}
									</span>
								</td>
								<td className="px-3 py-2">
									<div className="flex justify-center gap-2">
										<button
											onClick={() => {
												setSelectedFileType({
													id: file.id,
													mimeType: file.mimeType,
													description: file.description,
													status: file.status,
												})
												openModal("editFile")
											}}
											title="Edit Document Type"
											className="hover:bg-[#cce3ff] p-1 rounded transition-all duration-200">
											<SquarePen className="w-4 h-4 text-[#3F72AF] hover:text-[#112D4E]" />
										</button>
										<button
											onClick={() => handleToggleEnabled(file)}
											title={
												file.status ? "Disable File Type" : "Activate File Type"
											}
											className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none">
											{file.status ? (
												<ToggleRight className="h-6 w-6 text-green-400 hover:text-green-600" />
											) : (
												<ToggleLeft className="h-6 w-6 text-red-400 hover:text-red-600" />
											)}
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
			<AddFiletypeModal />
			<EditFiletypeModal />
		</div>
	)
}
