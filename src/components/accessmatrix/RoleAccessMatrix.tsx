"use client"

import { Edit, ToggleLeft, ToggleRight } from "lucide-react"
import { useAccessMatrixStore } from "@/service/systemutilities/accessmatrix/useAccessMatrixStore"
import { useModalStore } from "@/service/modal/useModalStore"
import EditRoleModal from "../modal/accessrolemodal/EditRoleModal"
import { Role } from "@/service/systemutilities/accessmatrix/AccessMatrixApi"

export default function RoleAccessMatrix() {
	const { openModal } = useModalStore()
	const {
		roles,
		selectedRole,
		selectRole,
		toggleRoleStatus,
		setCurrentEditRole,
	} = useAccessMatrixStore()

	const handleToggleEnabled = (role: Role) => {
		toggleRoleStatus(role.roleid)
	}
	return (
		<div className="space-y-4">
			{roles.map((role) => (
				<div
					key={role.roleid}
					className={`w-full cursor-pointer rounded-lg border p-6 shadow-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${
						selectedRole?.roleid === role.roleid
							? "border-blue-500 bg-blue-50"
							: "border-gray-200 bg-white hover:bg-gray-50"
					}`}>
					<div className="flex items-start justify-between">
						<button
							type="button"
							onClick={() => selectRole(role)}
							className="flex-1 text-left">
							<h3 className="text-md font-bold text-gray-900">{role.name}</h3>
							<p className="text-sm text-gray-600">{role.code}</p>
							<p className="text-sm text-gray-600">{role.description}</p>
							<p className="text-sm text-gray-500">
								{role.usercount ? `${role.usercount} users` : "No users"}
							</p>
						</button>
						<div className="mt-1 ml-4 flex items-center space-x-3">
							<span
								className={`rounded-full px-2 py-1 text-xs font-medium ${
									role.isactive
										? "bg-green-100 text-green-700"
										: "bg-gray-200 text-gray-600"
								}`}>
								{role.isactive ? "Active" : "Disabled"}
							</span>

							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation()
									setCurrentEditRole(role)
									openModal("editRole")
								}}
								className="rounded p-1 hover:bg-blue-100"
								title="Edit">
								<Edit className="h-4 w-4 text-blue-500" />
							</button>

							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation()
									handleToggleEnabled(role)
								}}
								title={role.isactive ? "Disable Role" : "Activate Role"}
								className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none">
								{role.isactive ? (
									<ToggleRight className="h-6 w-6 text-green-400 hover:text-green-600" />
								) : (
									<ToggleLeft className="h-6 w-6 text-red-400 hover:text-red-600" />
								)}
							</button>
						</div>
					</div>
				</div>
			))}
			<EditRoleModal />
		</div>
	)
}
