'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'


export default function Head() {

  const router = useRouter()
  const [dropDown, setDropDown] = useState(false)
  const dropDownRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickUser = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setDropDown(false)
      }
    }
    document.addEventListener('mousedown', handleClickUser)
    return () => {
      document.removeEventListener('mousedown', handleClickUser)
    }
  }, [])

  const handleLogout = async () => {
        router.push('/')
    }

  return (
    <header className="h-16 w-full bg-[#1C3879] flex items-center shadow justify-between px-6 ">
      <Image
        src="/dmsbgcut.png"
        alt="Logo"
        width={150}
        height={100}
        className=" r-2" />
      <div className="flex items-center text-sm text-white gap-2 relative">
        <span className="">Welcome, User</span>
        <button onClick={() => setDropDown(!dropDown)}
          className="flex items-center gap-2 relative">
          {dropDown ? (
            <ChevronUpIcon className="w-5 h-5 text-white" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-white" /> 
          )}
        </button>
        {dropDown && (
          <div className="absolute right-2 top-11 bg-[#112D4E] shadow-lg rounded-lg p-4">
            <button onClick={handleLogout}
              className="text-[#ffffff] hover:text-[#3F72AF]">Logout</button>
          </div>
        ) }
      </div>
    </header>
  )
}
