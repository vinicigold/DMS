"use client"
import React, { useEffect } from "react"
import { SquarePen, ToggleLeft, ToggleRight, CirclePlus } from "lucide-react"
import { useModalStore } from "@/service/modal/useModalStore"
import { useSystemConfigStore } from "@/service/apireference/systemconfig/useSystemConfigStore"
import AddSysConfigModal from "@/components/modal/systemconfigmodal/AddSysConfigModal"
import EditSysConfigModal from "@/components/modal/systemconfigmodal/EditSysConfigModal"

export default function SysConfigTable() {
	const { openModal } = useModalStore()
	const {
		configs,
		page,
		limit,
		total,
		totalPages,
		setPage,
		setLimit,
		fetchConfigs,
	} = useSystemConfigStore()

	const getStatusBadge = (status: boolean) => {
		const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
		return status
			? `${baseClasses} bg-green-100 text-green-800`
			: `${baseClasses} bg-red-100 text-red-800`
	}

	useEffect(() => {
		fetchConfigs(page, limit)
	}, [page, limit, fetchConfigs])

	return (
		<div className="bg-white text-[#112D4E] p-4 rounded-lg shadow-md">
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center justify-between mb-2 text-xs">
					<div>
						Show{" "}
						<select
							value={limit}
							onChange={(e) => setLimit(Number(e.target.value))}
							className="border border-gray-300 rounded px-1 py-1">
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
						</select>{" "}
						entries
					</div>
				</div>
				<button
					onClick={() => openModal("addSysConfig")}
					className="bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-4 py-2 rounded-lg hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200 flex items-center gap-2">
					<CirclePlus className="w-4 h-4" />
					Add System Configuration
				</button>
			</div>
			<div className="overflow-x-auto hide-scrollbar h-[450px]">
				<table className="w-full text-sm">
					<thead>
						<tr className="bg-[#CCE3FF] text-[#112D4E]">
							<th className="px-3 py-2 text-left font-semibold">ID</th>
							<th className="px-3 py-2 text-left font-semibold">System Name</th>
							<th className="px-3 py-2 text-left font-semibold">IP Address</th>
							<th className="px-3 py-2 text-center font-semibold">Drive</th>
							<th className="px-3 py-2 text-center font-semibold">Path</th>
							<th className="px-3 py-2 text-center font-semibold">Status</th>
							<th className="px-3 py-2 text-center font-semibold">Function</th>
						</tr>
					</thead>
					<tbody>
						{configs.map((config) => (
							<tr
								key={config.systemconfigid}
								className="border-b hover:bg-gray-50">
								<td className="px-3 py-2">{config.systemconfigid}</td>
								<td className="px-3 py-2">{config.systemName}</td>
								<td className="px-3 py-2">{config.ipAddress}</td>
								<td className="px-3 py-2 text-center">{config.drive}</td>
								<td className="px-3 py-2 text-center">{config.path}</td>
								<td className="px-3 py-2 text-center">
									<span className={getStatusBadge(config.status)}>
										{config.status ? "Active" : "Disabled"}
									</span>
								</td>
								<td className="px-3 py-2">
									<div className="flex justify-center gap-2">
										<button
											onClick={() => openModal("editSysConfig")}
											title="Edit System Config"
											className="hover:bg-[#CCE3FF] p-1 rounded transition-all duration-200">
											<SquarePen className="w-4 h-4 text-[#3F72AF] hover:text-[#112D4E]" />
										</button>
										<button className="hover:bg-[#CCE3FF] p-1 rounded transition-all duration-200">
											{config.status ? (
												<ToggleRight className="w-5 h-5 text-green-500 hover:text-[#112D4E]" />
											) : (
												<ToggleLeft className="w-5 h-5 text-red-500 hover:text-[#112D4E]" />
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
			<AddSysConfigModal />
			<EditSysConfigModal />
		</div>
	)
}
