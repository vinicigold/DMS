import SysConfigTable from "./SysConfigTable"

export default function Document() {
	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<div className="mb-6">
				<h1 className="text-xl font-bold text-[#112D4E] underline">
					API Reference
				</h1>
				<p className="text-sm text-gray-600">System Configuration</p>
			</div>
			<SysConfigTable />
		</div>
	)
}
