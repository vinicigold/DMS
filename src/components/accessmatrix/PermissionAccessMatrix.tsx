"use client"

import { useAccessMatrixStore } from "@/service/systemutilities/accessmatrix/useAccessMatrixStore"
import { UserCog, ToggleLeft, ToggleRight, Info } from "lucide-react"

export default function PermissionAccessMatrix() {
	const { selectedRole, permissions, updatePermission } = useAccessMatrixStore()

	const handlePermissionChange = (permissionId: number, granted: boolean) => {
		if (selectedRole) {
			updatePermission(selectedRole.roleid, permissionId, granted)
		}
	}
	return (
		<div className="sticky top-6 bg-white p-8 rounded-lg shadow-md border border-gray-200 max-h-[calc(100vh-3rem)] overflow-y-auto">
			{selectedRole ? (
				<div>
					<h2 className="text-md font-semibold text-gray-700 mb-4">
						Permissions for {selectedRole.name}
					</h2>

					{permissions?.menus.map((menu) => (
						<div key={menu.menuId} className="mb-6">
							<h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center relative group">
								<span className="inline-block mr-1">
									<Info className="h-5 w-4 text-black" />
								</span>
								{menu.menuName}
								<span className="absolute left-6 bottom-full mb-1 w-max max-w-xs rounded bg-gray-800 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
									{menu.menuDescription}
								</span>
							</h3>
							<ul className="space-y-2">
								{menu.permissions.map((perm) => (
									<li
										key={perm.permissionId}
										className="flex items-center justify-between">
										<span className="text-gray-700 text-sm flex items-center relative group">
											<span className="inline-block mr-1 text-blue-400 h-5 w-4">
												<Info className="h-5 w-4" />
											</span>
											{perm.action}
											<span className="absolute left-6 bottom-full mb-1 w-max max-w-xs rounded bg-gray-800 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
												{perm.description}
											</span>
										</span>

										<div className="relative inline-flex items-center cursor-pointer">
											<input
												id={`perm-${perm.permissionId}`}
												type="checkbox"
												checked={perm.granted}
												onChange={(e) =>
													handlePermissionChange(
														perm.permissionId,
														e.target.checked
													)
												}
												className="sr-only peer"
											/>
											<button
												onClick={() =>
													selectedRole &&
													updatePermission(
														selectedRole.roleid,
														perm.permissionId,
														!perm.granted
													)
												}
												title={
													perm.granted
														? "Disable Permission"
														: "Enable Permission"
												}
												className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none">
												{perm.granted ? (
													<ToggleRight className="h-6 w-6 text-green-400 hover:text-green-600" />
												) : (
													<ToggleLeft className="h-6 w-6 text-red-400 hover:text-red-600" />
												)}
											</button>
										</div>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			) : (
				<p className="text-gray-500 text-center py-10">
					<UserCog className="w-16 h-16 text-gray-300 mx-auto mb-4" />
					Please select a role to view permissions.
				</p>
			)}
		</div>
	)
}
