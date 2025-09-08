"use client"
import React from "react"
import Nav from "@/components/Navbar"
import Head from "@/components/Header"

interface LayoutProps {
	readonly children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="h-screen flex flex-col overflow-hidden">
			<Head />
			<div className="flex flex-row flex-1 overflow-hidden ">
				<Nav />
				<main className=" flex-1 overflow-auto hide-scrollbar">{children}</main>
			</div>
		</div>
	)
}
