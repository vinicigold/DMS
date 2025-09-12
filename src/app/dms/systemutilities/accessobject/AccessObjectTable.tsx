"use client"
import React, { useEffect } from "react"
import { SquarePen, ToggleLeft, ToggleRight, CirclePlus } from "lucide-react"
import { useModalStore } from "@/service/modal/useModalStore"
import AddAccessObjectModal from "@/components/modal/accessobjectmodal/AddAccessObjectModal"
import { useAccessObjectStore } from "@/service/systemutilities/accessobject/useAccessObjectStore"
import EditAccessObjectModal from "@/components/modal/accessobjectmodal/EditAccessObjectModal"

export default function AccessObjectTable() {
	const { openModal } = useModalStore()
	const {
		accessObjects,
		fetchObjects,
		setCurrentEditObj,
		page,
		limit,
		total,
		totalPages,
		setPage,
		setLimit,
	} = useAccessObjectStore()

	const getStatusBadge = (status: boolean) => {
		const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
		return status
			? `${baseClasses} bg-green-100 text-green-800`
			: `${baseClasses} bg-red-100 text-red-800`
	}

	useEffect(() => {
		fetchObjects(page, limit)
	}, [page, limit, fetchObjects])

	return (
		<div className="rounded-lg bg-white p-4 text-[#112D4E] shadow-md">
			<div className="mb-4 flex items-center justify-between">
				<div className="mb-2 flex items-center justify-between text-xs">
					<div>
						Show{" "}
						<select
							value={limit}
							onChange={(e) => setLimit(Number(e.target.value))}
							className="rounded border border-gray-300 px-1 py-1">
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
						</select>{" "}
						entries
					</div>
				</div>
				<button
					onClick={() => openModal("addAccessObj")}
					className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#112D4E] to-[#3F72AF] px-4 py-2 text-white transition-all duration-200 hover:from-[#163b65] hover:to-[#4a7bc8]">
					<CirclePlus className="h-4 w-4" />
					Add Access Object
				</button>
			</div>
			<div className="hide-scrollbar h-[450px] overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="bg-[#CCE3FF] text-[#112D4E]">
							<th className="px-3 py-2 text-left font-semibold">
								Access Object ID
							</th>
							<th className="px-3 py-2 text-left font-semibold">Parent ID</th>
							<th className="px-3 py-2 text-left font-semibold">Parent Name</th>
							<th className="px-3 py-2 text-center font-semibold">
								Object Type
							</th>
							<th className="px-3 py-2 text-center font-semibold">
								Object Name
							</th>
							<th className="px-3 py-2 text-center font-semibold">
								Object Description
							</th>
							<th className="px-3 py-2 text-center font-semibold">Status</th>
							<th className="px-3 py-2 text-center font-semibold">Function</th>
						</tr>
					</thead>
					<tbody>
						{accessObjects.map((obj) => (
							<tr
								key={obj.accessObjectId}
								className="border-b hover:bg-gray-50">
								<td className="px-3 py-2">{obj.accessObjectId}</td>
								<td className="px-3 py-2">{obj.parentId || "-"}</td>
								<td className="px-3 py-2">{obj.parentName || "-"}</td>
								<td className="px-3 py-2">{obj.objectType}</td>
								<td className="px-3 py-2">{obj.objectName}</td>
								<td className="px-3 py-2">{obj.objectDescription || "-"}</td>
								<td className="px-3 py-2 text-center">
									<span className={getStatusBadge(obj.status)}>
										{obj.status ? "Active" : "Disabled"}
									</span>
								</td>
								<td className="px-3 py-2">
									<div className="flex items-center justify-center gap-2">
										<button
											onClick={() => {
												setCurrentEditObj(obj)
												openModal("editAccessObj")
											}}
											title="Edit System Config"
											className="rounded p-1 transition-all duration-200 hover:bg-[#CCE3FF]">
											<SquarePen className="h-4 w-4 text-[#3F72AF] hover:text-[#112D4E]" />
										</button>
										<button
											// onClick={() => handleToggleEnabled(config)}
											title={
												obj.status ? "Disable File Type" : "Activate File Type"
											}
											className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none">
											{obj.status ? (
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
			<div className="mt-3 mb-1 flex items-center justify-between space-x-2 text-sm">
				<div className="text-gray-500">
					Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of{" "}
					{total} entries
				</div>
				<div className="flex items-center space-x-1">
					<button
						onClick={() => setPage(Math.max(page - 1, 1))}
						disabled={page === 1}
						className="rounded-lg bg-gray-200 px-2 py-1 text-gray-700 hover:bg-[#CCE3FF] disabled:opacity-50">
						&lt;
					</button>

					{Array.from({ length: totalPages }, (_, i) => i + 1)
						.filter(
							(p) =>
								p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1),
						)
						.map((p, idx, arr) => (
							<React.Fragment key={p}>
								{idx > 0 && p - arr[idx - 1] > 1 && (
									<span className="px-1">...</span>
								)}
								<button
									onClick={() => setPage(p)}
									className={`rounded-lg px-2 py-1 ${
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
						className="rounded-lg bg-gray-200 px-2 py-1 text-gray-700 hover:bg-[#CCE3FF] disabled:opacity-50">
						&gt;
					</button>
				</div>
			</div>
			<AddAccessObjectModal />
			<EditAccessObjectModal />
		</div>
	)
}
