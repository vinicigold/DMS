"use client"

import { Edit, Trash2 } from "lucide-react"
import { useAccessMatrixStore } from "@/service/systemutilities/accessmatrix/useAccessMatrixStore"

export default function RoleAccessMatrix() {
	const { roles, selectedRole, selectRole } = useAccessMatrixStore()
	return (
		<div className="space-y-4">
			<h2 className="text-lg font-semibold text-gray-700">Roles</h2>
			{roles.map((role) => (
				<div
					key={role.roleid}
					className={`p-6 border rounded-lg shadow-sm transition-all cursor-pointer ${
						selectedRole?.roleid === role.roleid
							? "border-green-500 bg-green-50"
							: "border-gray-200 bg-white hover:bg-gray-50"
					}`}
					onClick={() => selectRole(role)}>
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-xl font-bold text-gray-900">
							{role.accessname}
						</h3>
						<div className="flex space-x-2 text-gray-500">
							<Edit className="h-4 w-4 hover:text-blue-500" />
							<Trash2 className="h-4 w-4 hover:text-red-500" />
						</div>
					</div>
					<p className="text-gray-600 mb-4">{role.description}</p>
					<p className="text-sm font-medium text-gray-500">3 users</p>
				</div>
			))}
		</div>
	)
}
