"use client"

import { useAccessMatrixStore } from "@/service/systemutilities/accessmatrix/useAccessMatrixStore"
import { UserCog, ToggleLeft, ToggleRight, Info } from "lucide-react"

export default function PermissionAccessMatrix() {
	const { selectedRole, permissions, updatePermission } = useAccessMatrixStore()

	const handlePermissionChange = (permissionId: number, granted: boolean) => {
		if (selectedRole) {
			updatePermission(selectedRole.roleid, permissionId, granted)
			console.log("testing water", permissionId)
		}
	}
	return (
		<div className="hide-scrollbar sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto rounded-lg border border-gray-200 bg-white p-8 shadow-md">
			{selectedRole ? (
				<div>
					<h2 className="text-md mb-4 font-semibold text-gray-700">
						Permissions for {selectedRole.name}
					</h2>

					{permissions?.menus.map((menu) => (
						<div key={menu.menuId} className="mb-6">
							<h3 className="group relative mb-2 flex items-center text-sm font-bold text-gray-800">
								<span className="mr-1 inline-block">
									<Info className="h-5 w-4 text-black" />
								</span>
								{menu.menuName}
								<span className="absolute bottom-full left-6 mb-1 w-max max-w-xs rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
									{menu.menuDescription}
								</span>
							</h3>
							<ul className="space-y-2">
								{menu.permissions.map((perm) => (
									<li
										key={perm.accessObjectId}
										className="flex items-center justify-between">
										<span className="group relative flex items-center text-sm text-gray-700">
											<span className="mr-1 inline-block h-5 w-4 text-blue-400">
												<Info className="h-5 w-4" />
											</span>
											{perm.action}
											<span className="absolute bottom-full left-6 mb-1 w-max max-w-xs rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
												{perm.description}
											</span>
										</span>

										<div className="relative inline-flex cursor-pointer items-center">
											<input
												id={`perm-${perm.accessObjectId}`}
												type="checkbox"
												checked={perm.granted}
												onChange={(e) =>
													handlePermissionChange(
														perm.accessObjectId,
														e.target.checked,
													)
												}
												className="peer sr-only"
											/>
											<button
												onClick={() =>
													handlePermissionChange(
														perm.accessObjectId,
														!perm.granted,
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
				<p className="py-10 text-center text-gray-500">
					<UserCog className="mx-auto mb-4 h-16 w-16 text-gray-300" />
					Please select a role to view permissions.
				</p>
			)}
		</div>
	)
}
