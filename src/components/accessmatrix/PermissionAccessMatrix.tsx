"use client"

import { useAccessMatrixStore } from "@/service/systemutilities/accessmatrix/useAccessMatrixStore"

export default function PermissionAccessMatrix() {
	const { selectedRole, permissions, updatePermission } = useAccessMatrixStore()

	const handlePermissionChange = (permissionId: number, granted: boolean) => {
		if (selectedRole) {
			updatePermission(selectedRole.roleid, permissionId, granted)
		}
	}
	return (
		<div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
			{selectedRole ? (
				<div>
					<h2 className="text-lg font-semibold text-gray-700 mb-4">
						Permissions for {selectedRole.accessname}
					</h2>
					{permissions?.menus.map((menu) => (
						<div key={menu.menuId} className="mb-6">
							<h3 className="text-md font-bold text-gray-800 mb-2">
								{menu.menuName}
							</h3>
							<ul className="space-y-2">
								{menu.permissions.map((perm) => (
									<li
										key={perm.permissionId}
										className="flex items-center justify-between">
										<span className="text-gray-700">{perm.action}</span>
										<label className="relative inline-flex items-center cursor-pointer">
											<input
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
											<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
										</label>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			) : (
				<p className="text-gray-500 text-center py-10">
					Please select a role to view permissions.
				</p>
			)}
		</div>
	)
}
