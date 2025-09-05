"use client"
import React from "react"
import PermissionAccessMatrix from "@/components/accessmatrix/PermissionAccessMatrix"
import RoleAccessMatrix from "@/components/accessmatrix/RoleAccessMatrix"

export default function PermissionRole() {
	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<div className="mb-6">
				<h1 className="text-xl font-bold text-[#112D4E] underline">
					System Utilities
				</h1>
				<p className="text-sm text-gray-600">Access Matrix</p>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<RoleList />
				<PermissionList />
			</div>
		</div>
	)
}
