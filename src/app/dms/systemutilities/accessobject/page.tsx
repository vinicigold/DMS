import AccessObjectTable from "./AccessObjectTable"

export default function AccessObject() {
	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<div className="mb-6">
				<h1 className="text-xl font-bold text-[#112D4E] underline">
					System Utilities
				</h1>
				<p className="text-sm text-gray-600">Access Object</p>
			</div>
			<AccessObjectTable />
		</div>
	)
}
