"use client"
import React, { useEffect, useState } from "react"
import { User, ChevronUp } from "lucide-react"
import { UserProfile } from "@/service/userpofile/UserProfile"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface UserProfileResponse {
	name: string
	role: string
	permissions: string[]
}

export default function Head() {
	const [isUserDropDownOpen, setIsUserDropDownOpen] = useState(false)
	const [user, setUser] = useState<UserProfileResponse | null>(null)
	const router = useRouter()

	const handleLogout = async () => {
		router.push("/")
	}

	useEffect(() => {
		const fetchUser = async () => {
			const profile = await UserProfile()
			setUser(profile)
		}
		fetchUser()
	}, [])
	return (
		<header className="relative z-50 border-b border-white/30 bg-white/90 shadow-lg backdrop-blur-lg">
			<div className="flex items-center justify-between px-4 py-1">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#112D4E] to-[#3F72AF]">
							{/* <Home className="h-4 w-4 text-white" /> */}
							<Image
								src="/dmstesttest.png" // ✅ should be in /public
								alt="DMS Test Logo"
								width={200}
								height={200}
								className="object-contain"
							/>
						</div>
						<div>
							<h1 className="text-xl font-bold text-[#112D4E]">Document</h1>
							<p className="-mt-1 text-sm text-[#112D4E]/70">
								Management System
							</p>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-4">
					{/* User Menu */}
					<div className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[#112D4E]/20">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#112D4E] to-[#3F72AF]">
							<User className="h-4 w-4 text-white" />
						</div>
						<div className="hidden sm:block">
							<div className="flex flex-col gap-0.5 leading-none">
								<button
									onClick={() => setIsUserDropDownOpen(!isUserDropDownOpen)}
									className="flex h-12 w-full items-center justify-start gap-1 rounded-md px-2 hover:bg-blue-50 focus:outline-none">
									<div className="flex flex-col gap-0.5 leading-none">
										<span className="text-sm font-semibold">
											{user?.name || "Loading..."}
										</span>
										<span className="text-xs font-semibold text-gray-600">
											{user?.role || ""}
										</span>
									</div>
									<ChevronUp
										className={`ml-auto size-4 transition-transform ${
											isUserDropDownOpen ? "rotate-180" : ""
										}`}
									/>
								</button>
								{isUserDropDownOpen && (
									<div className="absolute top-full left-0 z-20 mt-1 w-full rounded-md border border-gray-200 bg-gradient-to-r from-[#112D4E] to-[#3F72AF] py-1 shadow-lg">
										<button
											onClick={handleLogout}
											className="block w-full px-4 py-2 text-left text-sm text-white hover:text-[#99c2f4]">
											<span>Sign out</span>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
