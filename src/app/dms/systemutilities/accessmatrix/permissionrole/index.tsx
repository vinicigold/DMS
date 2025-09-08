"use client"
import React, { useEffect } from "react"
import { useAccessMatrixStore } from "@/service/systemutilities/accessmatrix/useAccessMatrixStore"
import PermissionAccessMatrix from "@/components/accessmatrix/PermissionAccessMatrix"
import RoleAccessMatrix from "@/components/accessmatrix/RoleAccessMatrix"

export default function PermissionRole() {
	const { fetchRoles } = useAccessMatrixStore()

	useEffect(() => {
		fetchRoles()
	}, [fetchRoles])

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<div className="mb-6">
				<h1 className="text-xl font-bold text-[#112D4E] underline">
					System Utilities
				</h1>
				<p className="text-sm text-gray-600">Access Matrix</p>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="col-span-2 flex justify-between items-center">
					<h2 className="px-4 py-2 text-lg font-semibold text-gray-700 rounded-lg">
						Roles
					</h2>
					<button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition">
						Add Permission
					</button>
				</div>

				<RoleAccessMatrix />

				<div className="relative">
					<PermissionAccessMatrix />
				</div>
			</div>
		</div>
	)
}
