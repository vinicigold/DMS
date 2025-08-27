"use client"
import React, { useEffect, useState } from "react"
import {
	SquarePen,
	ToggleLeft,
	ToggleRight,
	UserRoundPlus,
	History,
} from "lucide-react"
import AddUserModal from "../../../../components/modal/AddUserModal"
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
}

export default function UserTable() {
	const [users, setUsers] = useState<User[]>([])
	const [showAddModal, setShowAddModal] = useState(false)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [limit, setLimit] = useState<number>(0)
	const [total, setTotal] = useState<number>(0)

	useEffect(() => {
		const fetchData = async () => {
			const data = await UserAccountsTable({ page })

			if (data) {
				const mappedUsers: User[] =
					data.data?.map((u, index) => ({
						id: index + 1 + (data.page - 1) * data.limit,
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
					})) ?? []

				setUsers(mappedUsers)
				setLimit(data.limit)
				setTotalPages(data.totalpages)
				setPage(data.page)
				setTotal(data.total)
			}
		}

		fetchData()
	}, [page])

	const handleEdit = (userId: number) => {
		console.log("Edit user:", userId)
	}

	const handleReset = (userId: number) => {
		console.log("Reset user:", userId)
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
					<UserRoundPlus className="w-4 h-4" />
					Add User
				</button>
			</div>
			<div className="overflow-x-auto h-[450px]">
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
											className="hover:bg-[#CCE3FF] p-1 rounded transition-all duration-200">
											<SquarePen className="w-4 h-4 text-[#3F72AF] hover:text-[#112D4E]" />
										</button>
										<button
											onClick={() => handleReset(user.id)}
											title="Reset User"
											className="hover:bg-[#CCE3FF] p-1 rounded transition-all duration-200">
											<History className="w-4 h-4 text-[#3F72AF] hover:text-[#112D4E]" />
										</button>
										<button
											onClick={() => handleToggleEnabled(user.id)}
											title={
												user.status === "Active"
													? "Disable User"
													: "Activate User"
											}
											className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none">
											{user.status === "Active" ? (
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
			<div className="flex text-sm justify-end items-center mt-1 space-x-2">
				{/* Previous arrow */}
				<button
					onClick={() => setPage(Math.max(page - 1, 1))}
					className="px-2 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-[#CCE3FF]">
					&lt;
				</button>

				{/* Page numbers */}
				{Array.from({ length: totalPages }, (_, i) => i + 1)
					.filter((p) => {
						// Show first, last, current, and neighbors
						return (
							p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)
						)
					})
					.map((p, idx, arr) => (
						<React.Fragment key={p}>
							{idx > 0 && p - arr[idx - 1] > 1 && (
								<span className="px-1">...</span>
							)}
							<button onClick={() => setPage(p)}>{p}</button>
						</React.Fragment>
					))}

				{/* Next arrow */}
				<button
					onClick={() => setPage(Math.min(page + 1, totalPages))}
					className="px-2 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-[#CCE3FF]">
					&gt;
				</button>
			</div>
			<div className="text-sm text-gray-500 mb-2">
				Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of{" "}
				{total} entries
			</div>
			<AddUserModal
				isOpen={showAddModal}
				onClose={() => setShowAddModal(false)}
			/>
		</div>
	)
}
