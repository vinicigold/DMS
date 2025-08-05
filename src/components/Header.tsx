'use client'
import React from 'react'

export default function Head() {
  return (
    <header className="h-16 w-full bg-[#DBE2EF] shadow flex items-center justify-between px-6 ">
      <h1 className="text-xl font-semibold text-[#112D4E]">Welcome to the Dashboard</h1>
      <div className="text-sm text-[#112D4E]">Logged in as Admin/SuperAdmin</div>
    </header>
  )
}
