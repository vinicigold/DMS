"use client"
import React from "react"
import { ScrollText } from "lucide-react"

export default function Head() {
	return (
		<header className="h-13 w-full bg-gradient-to-r bg-[#112D4E] to-[#3F72AF] flex items-center justify-between px-6 ">
			<div className="flex h-15 shrink-0 items-center justify-center px-4 relative bg-[#bg-[#112D4E]]">
				<div className="flex w-full items-center justify-start gap-2 h-12 px-3 rounded-md">
					<div className="flex aspect-square size-13 items-center justify-center rounded-lg text-white">
						<ScrollText className="size-10" />
					</div>
					<div className="flex flex-col gap-0.5 leading-none">
						<span className="text-[#ffffff] text-sm font-semibold">
							Document Management System
						</span>
					</div>
				</div>
			</div>
		</header>
	)
}
