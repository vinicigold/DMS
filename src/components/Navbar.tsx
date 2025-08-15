import React, { useState } from "react"
import {
	ChevronDownIcon,
	ChevronUpIcon,
	DocumentTextIcon,
	CircleStackIcon,
	ChartBarIcon,
	Cog6ToothIcon,
	FolderIcon,
	Squares2X2Icon,
	UserCircleIcon,
} from "@heroicons/react/24/solid"
import Link from "next/link"

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
		icon: Squares2X2Icon,
	},
	{
		id: 2,
		name: "Document Management",
		link: "/dms/documentmanagement",
		icon: DocumentTextIcon,
	},
	{
		id: 3,
		name: "API Reference",
		icon: CircleStackIcon,
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
		icon: ChartBarIcon,
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
		icon: Cog6ToothIcon,
		Children: [
			{
				id: 51,
				name: "Access Matrix",
				link: "/dms/apireferences/doctype",
			},
			{
				id: 52,
				name: "Acess Object",
				link: "/dms/apireferences/filetype",
			},
			{
				id: 53,
				name: "Access Role",
				link: "/dms/apireferences/sysconfig",
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
		icon: FolderIcon,
		Children: [
			{
				id: 61,
				name: "Directory Management",
				link: "/dms/apireferences/doctype",
			},
			{
				id: 62,
				name: "Upload Files",
				link: "/dms/apireferences/filetype",
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

	return (
		<aside className="hidden w-64 flex-col border-r bg-white text-[#112D4E] sm:flex hide-scrollbar">
			<nav className="flex flex-1 flex-col gap-1 font-bold overflow-auto p-2 hide-scrollbar">
				{navItems.map((item) => (
					<div key={item.id}>
						{item.Children ? (
							<div className="group/collapsible">
								<button
									type="button"
									className="flex w-full items-center justify-start gap-2 h-8 px-3 rounded-md hover:bg-blue-50"
									onClick={() => toggleCollapsible(item.id)}>
									{item.icon && <item.icon className="size-4" />}
									<span>{item.name}</span>
									<ChevronDownIcon
										className={`ml-auto size-4 transition-transform ${
											openCollapsibles[item.id] ? "rotate-180" : ""
										}`}
									/>
								</button>

								{openCollapsibles[item.id] && (
									<ul className="mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-gray-200 px-2.5 py-0.5">
										{item.Children.map((subItem) => (
											<li key={subItem.id}>
												<Link
													href={subItem.link || "#"}
													className="flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-sm text-gray-700 hover:bg-blue-50">
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
								className="flex w-full items-center justify-start gap-2 h-8 px-3 rounded-md hover:bg-blue-50">
								{item.icon && <item.icon className="size-4" />}
								<span>{item.name}</span>
							</Link>
						)}
					</div>
				))}
			</nav>

			<div className="mt-auto border-t p-2 relative">
				<button
					onClick={() => setIsUserDropDownOpen(!isUserDropDownOpen)}
					className="flex w-full items-center justify-start gap-2 h-12 px-3 rounded-md hover:bg-blue-50 focus:outline-none    ">
					<UserCircleIcon className="size-8" />
					<div className="flex flex-col gap-0.5 leading-none">
						<span className="font-semibold">ROAVIC IVAN</span>
						<span className="text-xs text-gray-500">
							ri.villanueva@example.com
						</span>
					</div>
					<ChevronUpIcon
						className={`ml-auto size-4 transition-transform ${
							isUserDropDownOpen ? "rotate-180" : ""
						}`}
					/>
				</button>
				{isUserDropDownOpen && (
					<div className="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1">
						<button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
							<span>Sign out</span>
						</button>
					</div>
				)}
			</div>
		</aside>
	)
}
