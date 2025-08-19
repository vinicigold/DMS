import AccessRoleTable from "./AccessRoleTable"

export default function AccessRole() {
	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-[#112D4E] underline">
					System Utilities
				</h1>
				<p className="text-gray-600">Access Role</p>
			</div>
			<AccessRoleTable />
		</div>
	)
}
