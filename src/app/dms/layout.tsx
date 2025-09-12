"use client"
import React from "react"
import Nav from "@/components/Navbar"
import Head from "@/components/Header"

interface LayoutProps {
	readonly children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#112D4E] to-[#3F72AF]">
			<Head />

			<div className="flex">
				<Nav />
				<main className="flex-1 p-2 lg:ml-0">
					<div className="mx-auto max-w-7xl">{children}</div>
				</main>
			</div>
		</div>
	)
}
