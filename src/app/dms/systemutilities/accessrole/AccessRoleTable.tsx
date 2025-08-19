"use client"
import React, { useEffect, useState } from "react"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { FetchAccessRoleTable } from "@/service/systemutilities/accessrole/table/FetchAccessRoleTable"

interface Role {
	roleid: number
	accessname: string
	description: string
	status: boolean
}

export default function AccessRoleTable() {
	const [roles, setRoles] = useState<Role[]>([])

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

	return (
		<div className="bg-white text-[#112D4E] p-4 rounded-lg shadow-md">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-bold">User Accounts</h3>
				<button className="bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-4 py-2 rounded-lg hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200 flex items-center gap-2">
					<PlusCircleIcon className="w-4 h-4" />
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
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
