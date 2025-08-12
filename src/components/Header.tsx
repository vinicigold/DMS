'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDownIcon, ChevronUpIcon, HomeIcon } from '@heroicons/react/24/solid'


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
    <header className='h-16 w-full bg-[#ffffff] flex items-center border-b justify-between px-6 '>
      <div className='flex h-15 shrink-0 items-center justify-center px-4 relative bg-[#ffffff]'>
          <div className='flex w-full items-center justify-start gap-2 h-12 px-3 rounded-md'>
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white'>
                  <HomeIcon className='size-4' />
              </div>
              <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='text-[#112D4E] font-semibold'>Document Management System</span>
              </div>
          </div>
      </div>
      <div className='flex items-center text-sm text-white gap-2 relative'>
        <span className=''>Welcome, User</span>
        <button onClick={() => setDropDown(!dropDown)}
          className='flex items-center gap-2 relative'>
          {dropDown ? (
            <ChevronUpIcon className='w-5 h-5 text-white' />
          ) : (
            <ChevronDownIcon className='w-5 h-5 text-white' /> 
          )}
        </button>
        {dropDown && (
          <div className='absolute right-2 top-11 bg-[#112D4E] shadow-lg rounded-lg p-4'>
            <button onClick={handleLogout}
              className='text-[#ffffff] hover:text-[#3F72AF]'>Logout</button>
          </div>
        ) }
      </div>
    </header>
  )
}
