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
		<div className="hide-scrollbar overflow-hidden p-2">
			<div className="mb-6">{children}</div>
			<div className="hide-scrollbar grid grid-cols-1 gap-6 overflow-hidden pb-3 md:grid-cols-12">
				<div className="md:col-span-7">{dms}</div>
				<div className="md:col-span-5">{cas}</div>
				<div className="md:col-span-8">{rdr}</div>
				<div className="md:col-span-4">{topbranch}</div>
			</div>
		</div>
	)
}
