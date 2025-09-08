"use client"

import { Edit, Trash2 } from "lucide-react"
import { useAccessMatrixStore } from "@/service/systemutilities/accessmatrix/useAccessMatrixStore"
import { useModalStore } from "@/service/modal/useModalStore"

export default function RoleAccessMatrix() {
	const { openModal } = useModalStore()
	const { roles, selectedRole, selectRole } = useAccessMatrixStore()
	const handleEdit = (role: Role) => {
		setCurrentEditRole(role) // in your modal store
		openModal("editRole") // open edit modal
	}
	return (
		<div className="space-y-4">
			{roles.map((role) => (
				<button
					key={role.roleid}
					type="button"
					className={`w-full text-left p-6 border rounded-lg shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
						selectedRole?.roleid === role.roleid
							? "border-blue-500 bg-blue-50"
							: "border-gray-200 bg-white hover:bg-gray-50"
					}`}
					onClick={() => selectRole(role)}>
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-md font-bold text-gray-900">{role.name}</h3>
						<div className="flex space-x-2 text-gray-500">
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation() // Prevent triggering selectRole
									handleEdit(role.roleid)
								}}
								className="p-1 rounded hover:bg-blue-100"
								title="Edit">
								<Edit className="h-4 w-4 text-blue-500" />
							</button>
							<Trash2 className="h-4 w-4 hover:text-red-500" />
						</div>
					</div>
					<p className="text-gray-600 text-sm mb-4">{role.description}</p>
					<p className="text-sm font-xs text-gray-500">
						{role.usercount ? `${role.usercount} users` : "No users"}
					</p>
				</button>
			))}
		</div>
	)
}
