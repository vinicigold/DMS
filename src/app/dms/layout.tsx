'use client'
import React, { useState } from 'react'
import Nav from '@/components/Navbar'
import Head from '@/components/Header'

interface LayoutProps {
    readonly children: React.ReactNode
}

export default function Layout ({ children }: LayoutProps) {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className="h-screen flex flex-col">
            <Head />
            <div className="flex flex-1">
                <Nav isOpen={isOpen} setIsOpen={setIsOpen}/>
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}