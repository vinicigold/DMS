export default function DashboardLayout({
	children,
	dms,
	cas,
	topbranch,
	rdr,
}: {
	readonly children: React.ReactNode
	readonly dms: React.ReactNode
	readonly cas: React.ReactNode
	readonly topbranch: React.ReactNode
	readonly rdr: React.ReactNode
}) {
	return (
		<div className="p-6 overflow-hidden hide-scrollbar ">
			<div className="mb-6">{children}</div>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-3 overflow-hidden hide-scrollbar">
				<div className="md:col-span-7">{dms}</div>
				<div className="md:col-span-5">{cas}</div>
				<div className="md:col-span-8">{rdr}</div>
				<div className="md:col-span-4">{topbranch}</div>
			</div>
		</div>
	)
}
