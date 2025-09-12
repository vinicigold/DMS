import AccessRoleTable from "./AccessRoleTable"

export default function AccessRole() {
	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="mb-6">
				<h1 className="text-xl font-bold text-[#112D4E] underline">
					System Utilities
				</h1>
				<p className="text-sm text-gray-600">Access Role</p>
			</div>
			<AccessRoleTable />
		</div>
	)
}
