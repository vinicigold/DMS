import React, { useEffect, useState } from "react"
import {
	ChevronDown,
	ChevronUp,
	LayoutDashboard,
	Database,
	ChartBarIncreasing,
	Settings,
	FolderClosed,
	CircleUser,
} from "lucide-react"
import Link from "next/link"
import { UserProfile } from "@/service/userpofile/UserProfile"
import { useRouter } from "next/navigation"

interface UserProfileResponse {
	name: string
	role: string
}

interface NavItem {
	id: number
	name: string
	link?: string
	icon?: React.ElementType
	Children?: NavItem[]
}

const navItems: NavItem[] = [
	{
		id: 1,
		name: "Dashboard",
		link: "/dms/dashboard",
		icon: LayoutDashboard,
	},
	{
		id: 3,
		name: "API Reference",
		icon: Database,
		Children: [
			{
				id: 31,
				name: "Document Type",
				link: "/dms/apireferences/doctype",
			},
			{
				id: 32,
				name: "File Type",
				link: "/dms/apireferences/filetype",
			},
			{
				id: 33,
				name: "System Configuration",
				link: "/dms/apireferences/sysconfig",
			},
		],
	},
	{
		id: 4,
		name: "Reports",
		icon: ChartBarIncreasing,
		Children: [
			{
				id: 41,
				name: "Audit Trail",
				link: "/dms/apireferences/doctype",
			},
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
			},
			{
				id: 52,
				name: "Acess Object",
				link: "/dms/apireferences/filetype",
			},
			{
				id: 53,
				name: "Access Role",
				link: "/dms/systemutilities/accessrole",
			},
			{
				id: 54,
				name: "References",
				link: "/dms/apireferences/sysconfig",
			},
			{
				id: 55,
				name: "System Parameters",
				link: "/dms/apireferences/sysconfig",
			},
			{
				id: 56,
				name: "User Accounts",
				link: "/dms/systemutilities/useraccount",
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
			},
			{
				id: 63,
				name: "Transmitted Files",
				link: "/dms/apireferences/sysconfig",
			},
			{
				id: 64,
				name: "Failed Upload",
				link: "/dms/apireferences/sysconfig",
			},
			{
				id: 65,
				name: "Logs View History",
				link: "/dms/apireferences/sysconfig",
			},
		],
	},
]

export default function Nav() {
	const [isUserDropDownOpen, setIsUserDropDownOpen] = useState(false)
	const [user, setUser] = useState<UserProfileResponse | null>(null)
	const router = useRouter()
	const [openCollapsibles, setOpenCollapsibles] = useState<
		Record<number, boolean>
	>(
		navItems.reduce<Record<number, boolean>>((acc, item) => {
			if (item.Children) acc[item.id] = false
			return acc
		}, {})
	)
	const toggleCollapsible = (id: number) => {
		setOpenCollapsibles((prev) => ({ ...prev, [id]: !prev[id] }))
	}

	useEffect(() => {
		const fetchUser = async () => {
			const profile = await UserProfile()
			setUser(profile)
		}
		fetchUser()
	}, [])

	const handleLogout = async () => {
		router.push("/")
	}

	return (
		<aside className="hidden w-53 flex-col border-r bg-white text-[#112D4E] sm:flex hide-scrollbar">
			<nav
				className="flex flex-1 flex-col gap-1 text-sm font-semibold overflow-auto p-1
			 hide-scrollbar">
				{navItems.map((item) => (
					<div key={item.id}>
						{item.Children ? (
							<div className="group/collapsible">
								<button
									type="button"
									className="flex w-full items-center justify-start gap-2 h-8 px-1 rounded-md hover:bg-blue-50"
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
									<ul className="mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 font-semibold border-l border-gray-200 px-2.5 py-0.5">
										{item.Children.map((subItem) => (
											<li key={subItem.id}>
												<Link
													href={subItem.link || "#"}
													className="flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-xs text-gray-700 hover:bg-blue-50">
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
								className="flex w-full items-center justify-start gap-2 h-8 px-1 rounded-md hover:bg-blue-50">
								{item.icon && <item.icon className="size-4" />}
								<span>{item.name}</span>
							</Link>
						)}
					</div>
				))}
			</nav>

			<div className="mt-auto border-t p-1 relative">
				<button
					onClick={() => setIsUserDropDownOpen(!isUserDropDownOpen)}
					className="flex w-full items-center justify-start gap-1 h-12 px-2 rounded-md hover:bg-blue-50 focus:outline-none">
					<CircleUser className="size-8" />
					<div className="flex flex-col gap-0.5 leading-none">
						<span className="text-sm font-semibold">
							{user?.name || "Loading..."}
						</span>
						<span className="text-xs font-semibold">{user?.role || ""}</span>
					</div>
					<ChevronUp
						className={`ml-auto size-4 transition-transform ${
							isUserDropDownOpen ? "rotate-180" : ""
						}`}
					/>
				</button>
				{isUserDropDownOpen && (
					<div className="absolute bottom-full left-0 w-full bg-gradient-to-r bg-[#112D4E] to-[#3F72AF] border border-gray-200 rounded-md shadow-lg z-20 py-1">
						<button
							onClick={handleLogout}
							className="block w-full text-left px-4 py-2 text-sm text-white hover:text-[#99c2f4]">
							<span>Sign out</span>
						</button>
					</div>
				)}
			</div>
		</aside>
	)
}
