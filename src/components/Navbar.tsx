import React, { useEffect, useState } from "react"
import {
	ChevronDown,
	LayoutDashboard,
	Database,
	ChartBarIncreasing,
	Settings,
	FolderClosed,
} from "lucide-react"
import Link from "next/link"
import { UserProfile } from "@/service/userpofile/UserProfile"
import { usePathname } from "next/navigation"

interface UserProfileResponse {
	name: string
	role: string
	permissions: string[]
}

interface NavItem {
	id: number
	name: string
	link?: string
	icon?: React.ElementType
	permission?: string
	Children?: NavItem[]
}

const navItems: NavItem[] = [
	{ id: 1, name: "Dashboard", link: "/dms/dashboard", icon: LayoutDashboard },
	{
		id: 3,
		name: "API Reference",
		icon: Database,
		Children: [
			{
				id: 31,
				name: "Document Type",
				link: "/dms/apireferences/doctype",
				permission: "readDocumentType",
			},
			{
				id: 32,
				name: "File Type",
				link: "/dms/apireferences/filetype",
				permission: "readFileTypes",
			},
			{
				id: 33,
				name: "System Configuration",
				link: "/dms/apireferences/systemconfig",
				permission: "readSystemConfig",
			},
		],
	},
	{
		id: 4,
		name: "Reports",
		icon: ChartBarIncreasing,
		Children: [
			{ id: 41, name: "Audit Trail", link: "/dms/apireferences/doctype" },
		],
	},
	{
		id: 5,
		name: "System Utilities",
		icon: Settings,
		Children: [
			{
				id: 51,
				name: "Access Matrix",
				link: "/dms/systemutilities/accessmatrix",
				permission: "readAccessMatrix",
			},
			{
				id: 52,
				name: "Acess Object",
				link: "/dms/systemutilities/accessobject",
				permission: "readAccessObject",
			},
			{
				id: 53,
				name: "Access Role",
				link: "/dms/systemutilities/accessrole",
				permission: "readAccessRole",
			},
			{ id: 54, name: "References", link: "/dms/apireferences/sysconfig" },
			{
				id: 55,
				name: "System Parameters",
				link: "/dms/systemutilities/systemparameter",
			},
			{
				id: 56,
				name: "User Accounts",
				link: "/dms/systemutilities/useraccount",
				permission: "readUserAccount",
			},
		],
	},
	{
		id: 6,
		name: "INAI File Management",
		icon: FolderClosed,
		Children: [
			{
				id: 61,
				name: "Directory Management",
				link: "/dms/apireferences/doctype",
			},
			{
				id: 62,
				name: "Upload Files",
				link: "/dms/filemanagement/uploadfiles",
				permission: "readUploadFile",
			},
			{
				id: 63,
				name: "Transmitted Files",
				link: "/dms/apireferences/sysconfig",
			},
			{ id: 64, name: "Failed Upload", link: "/dms/apireferences/sysconfig" },
			{
				id: 65,
				name: "Logs View History",
				link: "/dms/apireferences/sysconfig",
			},
		],
	},
]

export default function Nav() {
	const [user, setUser] = useState<UserProfileResponse | null>(null)
	const pathname = usePathname()

	const [openCollapsibles, setOpenCollapsibles] = useState<
		Record<number, boolean>
	>(
		navItems.reduce<Record<number, boolean>>((acc, item) => {
			if (item.Children) acc[item.id] = false
			return acc
		}, {}),
	)
	const toggleCollapsible = (id: number) => {
		setOpenCollapsibles((prev) => ({ ...prev, [id]: !prev[id] }))
	}

	useEffect(() => {
		const fetchUser = async () => {
			const profile = await UserProfile()
			setUser(profile)

			// initialize collapsibles for items that have children
			const collapsibles: Record<number, boolean> = {}
			navItems.forEach((item) => {
				if (item.Children) collapsibles[item.id] = false
			})
			setOpenCollapsibles(collapsibles)
		}
		fetchUser()
	}, [])

	const hasPermission = (permission?: string) => {
		if (!permission) return true // if no permission is required, show
		return user?.permissions.includes(permission) ?? false
	}

	return (
		<aside className="hide-scrollbar fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/30 bg-white/90 shadow-xl backdrop-blur-lg transition-transform duration-300 ease-in-out lg:static">
			<div className="flex h-full flex-col pt-2">
				<nav className="hide-scrollbar flex-1 space-y-2 px-4">
					{navItems.map(
						(item) =>
							hasPermission(item.permission) && (
								<div key={item.id}>
									{item.Children ? (
										<div className="group/collapsible">
											<button
												type="button"
												className="flex h-8 w-full items-center justify-start gap-2 rounded-md px-1 hover:bg-[blue-50]"
												onClick={() => toggleCollapsible(item.id)}>
												{item.icon && <item.icon className="size-4" />}
												<span>{item.name}</span>
												<ChevronDown
													className={`ml-auto size-4 transition-transform ${
														openCollapsibles[item.id] ? "rotate-180" : ""
													}`}
												/>
											</button>
											{openCollapsibles[item.id] && (
												<ul className="mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-gray-200 px-2.5 py-0.5 font-semibold">
													{item.Children.filter((sub) =>
														hasPermission(sub.permission),
													).map((subItem) => (
														<li key={subItem.id}>
															<Link
																href={subItem.link || "#"}
																className={`flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-xs ${
																	pathname === subItem.link
																		? "bg-[#112D4E] font-semibold text-white"
																		: "text-gray-700 hover:bg-blue-50"
																} `}>
																<span>{subItem.name}</span>
															</Link>
														</li>
													))}
												</ul>
											)}
										</div>
									) : (
										<Link
											href={item.link || "#"}
											className={`flex h-8 w-full items-center justify-start gap-2 rounded-md px-1 ${
												pathname === item.link
													? "bg-[#112D4E] font-semibold text-white" // Active state
													: "text-gray-700 hover:bg-blue-50"
											} // Default`}>
											{item.icon && <item.icon className="size-4" />}
											<span>{item.name}</span>
										</Link>
									)}
								</div>
							),
					)}
				</nav>
			</div>
		</aside>
	)
}
