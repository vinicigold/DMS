'use client'
import React from 'react'

export default function Head() {
  return (
    <header className="h-16 w-full bg-[#1C3879] flex items-center shadow justify-between px-6 ">
      <h1 className="text-xl font-semibold text-[#ffffff]">DMS</h1>
      <div className="text-sm text-[#ffffff]">Logged in as Admin/SuperAdmin</div>
    </header>
  )
}
