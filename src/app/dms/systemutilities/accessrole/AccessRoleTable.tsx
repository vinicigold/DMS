"use client"
import React, { useEffect, useState } from "react"
import { SquarePen, ToggleLeft, ToggleRight, CirclePlus } from "lucide-react"
import { FetchAccessRoleTable } from "@/service/systemutilities/accessrole/table/FetchAccessRoleTable"
import AddRoleModal from "@/components/modal/accessrolemodal/AddRoleModal"
import EditRoleModal from "@/components/modal/accessrolemodal/EditRoleModal"
import { EditRole } from "@/service/systemutilities/accessrole/EditRole"

interface Role {
	roleid: number
	code: string
	accessname: string
	description: string
	status: boolean
}

export default function AccessRoleTable() {
	const [roles, setRoles] = useState<Role[]>([])
	const [addRoleModalOpen, setAddRoleModalOpen] = useState(false)
	const [editRoleModalOpen, setEditRoleModalOpen] = useState(false)
	const [selectedRole, setSelectedRole] = useState<Role | null>(null)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [limit, setLimit] = useState<number>(0)
	const [total, setTotal] = useState<number>(0)

	useEffect(() => {
		async function loadRoles() {
			const data = await FetchAccessRoleTable({ page })
			if (data) {
				const results = data.results
				setRoles(results.data)
				setPage(results.page)
				setLimit(results.limit)
				setTotalPages(results.totalpages)
				setTotal(results.total)
			}
		}
		loadRoles()
	}, [page])

	const handleEdit = (role: Role) => {
		setSelectedRole(role)
		setEditRoleModalOpen(true)
	}

	const handleToggleEnabled = async (role: Role) => {
		try {
			await EditRole({
				roleid: role.roleid,
				accessname: role.accessname,
				description: role.description,
				status: !role.status,
			})

			// If successful, update state
			setRoles((prev) =>
				prev.map((r) =>
					r.roleid === role.roleid ? { ...r, status: !role.status } : r
				)
			)
		} catch (error) {
			console.error(error)
			alert("Failed to update role status. Please try again.")
		}
	}

	return (
		<div className="bg-white text-[#112D4E] p-4 rounded-lg shadow-md">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-bold">Access Role</h3>
				<button
					onClick={() => setAddRoleModalOpen(true)}
					className="bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-4 py-2 rounded-lg hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200 flex items-center gap-2">
					<CirclePlus className="w-4 h-4" />
					Add Role
				</button>
			</div>
			<div className="overflow-x-auto h-[450px]">
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
						{roles.map((role, index) => (
							<tr
								key={role.roleid}
								className={`border-b ${
									index % 2 === 0 ? "bg-white" : "bg-gray-50"
								} hover:bg-[#CCE3FF]/30 transition-colors`}>
								<td className="px-3 py-2 font-medium">{role.roleid}</td>
								<td className="px-3 py-2">{role.code}</td>
								<td className="px-3 py-2">{role.accessname}</td>
								<td className="px-3 py-2">{role.description}</td>
								<td className="px-3 py-2">
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											role.status
												? "bg-green-100 text-green-700"
												: "bg-gray-200 text-gray-600"
										}`}>
										{role.status ? "Active" : "Disabled"}
									</span>
								</td>
								<td className="px-3 py-2">
									<div className="flex justify-center gap-2">
										<button
											onClick={() => handleEdit(role)}
											title="Edit Role"
											className="hover:bg-[#CCE3FF] p-1 rounded transition-all duration-200">
											<SquarePen className="w-4 h-4 text-[#3F72AF] hover:text-[#112D4E]" />
										</button>
										<button
											onClick={() => handleToggleEnabled(role)}
											title={role.status ? "Disable Role" : "Activate Role"}
											className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none">
											{role.status ? (
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
						className="px-2 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-[#CCE3FF]">
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
						className="px-2 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-[#CCE3FF]">
						&gt;
					</button>
				</div>
			</div>
			<AddRoleModal
				isOpen={addRoleModalOpen}
				onClose={() => setAddRoleModalOpen(false)}
				onAdd={(newRole: Role) => {
					setRoles((prev) => [...prev, newRole])
				}}
			/>
			<EditRoleModal
				isOpen={editRoleModalOpen}
				onClose={() => setEditRoleModalOpen(false)}
				roleData={selectedRole}
				onUpdate={(updatedRole) => {
					setRoles((prev) =>
						prev.map((role) =>
							role.roleid === updatedRole.roleid
								? { ...role, ...updatedRole }
								: role
						)
					)
				}}
			/>
		</div>
	)
}
