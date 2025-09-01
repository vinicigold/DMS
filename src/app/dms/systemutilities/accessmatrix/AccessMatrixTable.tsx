"use client"
import React, { useEffect, useState } from "react"

interface Role {
	RoleID: number
	Code: string
	Name: string
	Description: string
	IsActive: boolean
}

interface Permission {
	permissionId: number
	action: string
	roles: Record<string, boolean>
}

interface Menu {
	menuName: string
	permissions: Permission[]
}

export default function AccessMatrixTable() {
	const [roles, setRoles] = useState<Role[]>([])
	const [menus, setMenus] = useState<Menu[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			try {
				const token = localStorage.getItem("authToken")
				const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

				const res = await fetch(`${API_BASE}/dms/access-matrix`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}` || "",
					},
					credentials: "include",
				})

				if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)

				const data = await res.json()
				setRoles(data.roles)
				setMenus(data.menus)
			} catch (err) {
				console.error("Error fetching access matrix:", err)
			}
			setLoading(false)
		}

		fetchData()
	}, [])

	const handleCheckboxChange = (
		permissionId: number,
		roleId: number,
		checked: boolean
	) => {
		setMenus((prev) =>
			prev.map((menu) => ({
				...menu,
				permissions: menu.permissions.map((perm) =>
					perm.permissionId === permissionId
						? { ...perm, roles: { ...perm.roles, [roleId]: checked } }
						: perm
				),
			}))
		)
	}

	if (loading) return <p className="text-gray-500">Loading access matrix...</p>

	return (
		<div className="bg-white text-[#112D4E] p-4 rounded-lg shadow-md">
			{/* Header */}
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-bold">Access Matrix</h3>
			</div>

			{/* Scrollable table */}
			<div className="overflow-x-auto h-[450px]">
				<table className="w-full text-sm border-collapse">
					<thead>
						<tr className="bg-[#CCE3FF] text-[#112D4E]">
							<th className="px-3 py-2 text-left font-semibold">Permission</th>
							{roles.map((role) => (
								<th
									key={role.RoleID}
									className="px-3 py-2 text-center font-semibold">
									{role.Name || "(Unnamed Role)"}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{menus.map((menu) => (
							<React.Fragment key={menu.menuName}>
								{/* Menu header row */}
								<tr className="bg-gray-50">
									<td
										className="px-3 py-2 font-semibold"
										colSpan={1 + roles.length}>
										{menu.menuName}
									</td>
								</tr>

								{menu.permissions.map((perm, permIdx) => (
									<tr
										key={perm.permissionId}
										className={`${
											permIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
										} hover:bg-[#CCE3FF]/30 transition-colors border-b-1`}>
										<td className="px-3 py-2 pl-4">{perm.action}</td>

										{roles.map((role) => (
											<td
												key={`${perm.permissionId}-${role.RoleID}`}
												className="px-3 py-2 text-center">
												<input
													type="checkbox"
													checked={perm.roles[role.RoleID] || false}
													onChange={(e) =>
														handleCheckboxChange(
															perm.permissionId,
															role.RoleID,
															e.target.checked
														)
													}
													className="h-4 w-4 text-[#3F72AF] border-gray-300 rounded focus:ring-[#3F72AF]"
												/>
											</td>
										))}
									</tr>
								))}
							</React.Fragment>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
