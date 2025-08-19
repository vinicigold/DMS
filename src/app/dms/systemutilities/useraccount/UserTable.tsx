"use client"
import React, { useEffect, useState } from "react"
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid"
import AddUserModal from "./AddUserModal"
import { UserAccountsTable } from "@/service/systemutilities/useraccount/table/UserAccountTable"

interface User {
	id: number
	username: string
	staffId: string
	fullName: string
	institution: string
	rolename: string
	email: string
	mobileNumber: string
	status: "Active" | "Disable"
	passwordExpirationDate?: string
	dateLocked: string
	functions: string
}

export default function UserTable() {
	const [users, setUsers] = useState<User[]>([])
	const [showAddModal, setShowAddModal] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			const res = await UserAccountsTable({ limit: 10, offset: 0 })
			const mappedUsers: User[] =
				res?.users?.map((u, index) => ({
					id: index + 1,
					username: u.username,
					staffId: u.staffID,
					fullName: u.fullName,
					institution: u.institution,
					rolename: u.rolename,
					email: u.email,
					mobileNumber: u.mobileNumber,
					status: u.status === "Active" ? "Active" : "Disable",
					passwordExpirationDate: u.passwordExpirationDate,
					dateLocked: "-",
					functions: u.rolename,
				})) ?? []

			setUsers(mappedUsers)
		}
		fetchData()
	}, [])

	const handleEdit = (userId: number) => {
		console.log("Edit user:", userId)
	}

	const handleDelete = (userId: number) => {
		console.log("Delete user:", userId)
	}

	const handleToggleEnabled = (userId: number) => {
		setUsers(
			users.map((user) => {
				if (user.id === userId) {
					const newStatus = user.status === "Active" ? "Disable" : "Active"
					return {
						...user,
						status: newStatus,
					}
				}
				return user
			})
		)
	}

	const getStatusBadge = (status: User["status"]) => {
		const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
		switch (status) {
			case "Active":
				return `${baseClasses} bg-green-100 text-green-800`
			case "Disable":
				return `${baseClasses} bg-red-100 text-red-800`
			default:
				return `${baseClasses} bg-gray-100 text-gray-800`
		}
	}

	return (
		<div className="bg-white text-[#112D4E] p-4 rounded-lg shadow-md">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-bold">User Accounts</h3>
				<button
					onClick={() => setShowAddModal(true)}
					className="bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-4 py-2 rounded-lg hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200 flex items-center gap-2">
					<UserPlusIcon className="w-4 h-4" />
					Add User
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="bg-[#CCE3FF] text-[#112D4E]">
							<th className="px-3 py-2 text-left font-semibold">Username</th>
							<th className="px-3 py-2 text-left font-semibold">Staff ID</th>
							<th className="px-3 py-2 text-left font-semibold">Full Name</th>
							<th className="px-3 py-2 text-left font-semibold">Institution</th>
							<th className="px-3 py-2 text-left font-semibold">Role</th>
							<th className="px-3 py-2 text-left font-semibold">Email</th>
							<th className="px-3 py-2 text-left font-semibold">Mobile</th>
							<th className="px-3 py-2 text-left font-semibold">Status</th>
							<th className="px-3 py-2 text-left font-semibold">
								Password Expiration
							</th>
							<th className="px-3 py-2 text-left font-semibold">Date Locked</th>
							<th className="px-3 py-2 text-center font-semibold">Function</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr
								key={user.id}
								className={`border-b ${
									index % 2 === 0 ? "bg-white" : "bg-gray-50"
								} hover:bg-[#CCE3FF]/30 transition-colors`}>
								<td className="px-3 py-2 font-medium">{user.username}</td>
								<td className="px-3 py-2">{user.staffId}</td>
								<td className="px-3 py-2">{user.fullName}</td>
								<td className="px-3 py-2">{user.institution}</td>
								<td className="px-3 py-2">{user.rolename}</td>
								<td className="px-3 py-2">{user.email}</td>
								<td className="px-3 py-2">{user.mobileNumber}</td>
								<td className="px-3 py-2">
									<span className={getStatusBadge(user.status)}>
										{user.status}
									</span>
								</td>
								<td className="px-3 py-2">
									{user.passwordExpirationDate
										? new Date(user.passwordExpirationDate)
												.toISOString()
												.replace("T", " ")
												.replace("Z", "")
												.split(".")[0]
										: "-"}
								</td>
								<td className="px-3 py-2">{user.dateLocked || "-"}</td>
								<td className="px-3 py-2">
									<div className="flex justify-center gap-2">
										<button
											onClick={() => handleEdit(user.id)}
											title="Edit User"
											className="text-[#3F72AF] hover:text-[#112D4E] hover:bg-[#CCE3FF] p-1 rounded transition-all duration-200">
											<PencilIcon className="w-4 h-4" />
										</button>
										<button
											onClick={() => handleDelete(user.id)}
											title="Delete User"
											className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-all duration-200">
											<TrashIcon className="w-4 h-4" />
										</button>
										<button
											onClick={() => handleToggleEnabled(user.id)}
											title={
												user.status === "Active"
													? "Disable User"
													: "Activate User"
											}
											className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none
											${
												user.status === "Active"
													? "bg-[#3F72AF] hover:bg-[#112D4E]"
													: "bg-gray-300 hover:bg-gray-400"
											}`}>
											<span
												className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
												${user.status === "Active" ? "translate-x-6" : "translate-x-1"}`}
											/>
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<AddUserModal
				isOpen={showAddModal}
				onClose={() => setShowAddModal(false)}
			/>
		</div>
	)
}
