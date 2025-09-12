"use client"
import React, { useEffect } from "react"
import { SquarePen, ToggleLeft, ToggleRight, CirclePlus } from "lucide-react"
import AddRoleModal from "@/components/modal/accessrolemodal/AddRoleModal"
import EditRoleModal from "@/components/modal/accessrolemodal/EditRoleModal"
import { useAccessRoleStore } from "@/service/systemutilities/accessrole/useAccessRoleStore"
import { useModalStore } from "@/service/modal/useModalStore"

export default function AccessRoleTable() {
	const { openModal } = useModalStore()
	const {
		roles,
		fetchRoles,
		page,
		limit,
		total,
		totalPages,
		setPage,
		setLimit,
		setCurrentEditRole,
	} = useAccessRoleStore()

	const getStatusBadge = (status: boolean) => {
		const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
		return status
			? `${baseClasses} bg-green-100 text-green-800`
			: `${baseClasses} bg-red-100 text-red-800`
	}

	useEffect(() => {
		fetchRoles(page, limit)
	}, [page, limit, fetchRoles])

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
					onClick={() => openModal("addAccessRole")}
					className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#112D4E] to-[#3F72AF] px-4 py-2 text-white transition-all duration-200 hover:from-[#163b65] hover:to-[#4a7bc8]">
					<CirclePlus className="h-4 w-4" />
					Add Role
				</button>
			</div>
			<div className="h-[450px] overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="bg-[#CCE3FF] text-[#112D4E]">
							<th className="px-3 py-2 text-left font-semibold">Role ID</th>
							<th className="px-3 py-2 text-left font-semibold">Code</th>
							<th className="px-3 py-2 text-left font-semibold">Access Name</th>
							<th className="px-3 py-2 text-left font-semibold">Description</th>
							<th className="px-3 py-2 text-left font-semibold">Status</th>
							<th className="px-3 py-2 text-center font-semibold">Function</th>
						</tr>
					</thead>
					<tbody>
						{roles.map((role) => (
							<tr key={role.roleid} className="border-b hover:bg-gray-50">
								<td className="px-3 py-2 font-medium">{role.roleid}</td>
								<td className="px-3 py-2">{role.code}</td>
								<td className="px-3 py-2">{role.name}</td>
								<td className="px-3 py-2">{role.description}</td>
								<td className="px-3 py-2 text-center">
									<span className={getStatusBadge(role.isactive)}>
										{role.isactive ? "Active" : "Disabled"}
									</span>
								</td>
								<td className="px-3 py-2">
									<div className="flex justify-center gap-2">
										<button
											onClick={() => {
												setCurrentEditRole(role)
												openModal("editRole")
											}}
											title="Edit System Config"
											className="rounded p-1 transition-all duration-200 hover:bg-[#CCE3FF]">
											<SquarePen className="h-4 w-4 text-[#3F72AF] hover:text-[#112D4E]" />
										</button>
										<button
											// onClick={() => handleToggleEnabled(role)}
											title={
												role.isactive
													? "Disable File Type"
													: "Activate File Type"
											}
											className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none">
											{role.isactive ? (
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
						className="rounded-lg bg-gray-200 px-2 py-1 text-gray-700 hover:bg-[#CCE3FF]">
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
						className="rounded-lg bg-gray-200 px-2 py-1 text-gray-700 hover:bg-[#CCE3FF]">
						&gt;
					</button>
				</div>
			</div>
			<AddRoleModal />
			<EditRoleModal />
		</div>
	)
}
