"use client"
import React, { useEffect, useState } from "react"
import { SquarePen, ToggleLeft, ToggleRight, CirclePlus } from "lucide-react"
import { FetchAccessRoleTable } from "@/service/systemutilities/accessrole/table/FetchAccessRoleTable"
import AddRoleModal from "@/components/modal/AddRoleModal"

interface Role {
	roleid: number
	accessname: string
	description: string
	status: boolean
}

export default function AccessRoleTable() {
	const [roles, setRoles] = useState<Role[]>([])
	const [addRoleModalOpen, setAddRoleModalOpen] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			const res = await FetchAccessRoleTable({ limit: 10, offset: 0 })
			const mappedRoles: Role[] =
				res?.roles?.map((r) => ({
					roleid: r.roleid,
					accessname: r.accessname,
					description: r.description,
					status: r.status,
				})) ?? []

			setRoles(mappedRoles)
		}
		fetchData()
	}, [])

	const handleEdit = (role: number) => {
		console.log("Edit user:", role)
	}

	const handleToggleEnabled = (roleid: number) => {
		setRoles((prev) =>
			prev.map((role) =>
				role.roleid === roleid ? { ...role, status: !role.status } : role
			)
		)
	}

	return (
		<div className="bg-white text-[#112D4E] p-4 rounded-lg shadow-md">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-bold">User Accounts</h3>
				<button
					onClick={() => setAddRoleModalOpen(true)}
					className="bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-4 py-2 rounded-lg hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200 flex items-center gap-2">
					<CirclePlus className="w-4 h-4" />
					Add Role
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="bg-[#CCE3FF] text-[#112D4E]">
							<th className="px-3 py-2 text-left font-semibold">Role ID</th>
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
											onClick={() => handleEdit(role.roleid)}
											title="Edit User"
											className="hover:bg-[#CCE3FF] p-1 rounded transition-all duration-200">
											<SquarePen className="w-4 h-4 text-[#3F72AF] hover:text-[#112D4E]" />
										</button>
										<button
											onClick={() => handleToggleEnabled(role.roleid)}
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
			<AddRoleModal
				isOpen={addRoleModalOpen}
				onClose={() => setAddRoleModalOpen(false)}
			/>
		</div>
	)
}
