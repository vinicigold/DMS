'use client'
import React, { useState } from 'react'
import { XMarkIcon, EnvelopeIcon, UserIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'

interface StaffIdModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onSubmit: (email: string) => void
  readonly error: boolean
}

export default function StaffIdModal({
  isOpen,
  onClose,
  onSubmit,
  error,
}: StaffIdModalProps) {
  const [staffId, setStaffId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (staffId === '20250755206') {
    onSubmit(staffId)
  } else {
    alert('Invalid Staff ID. Please try again.')
  }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-xl flex items-center justify-center'>
              <EnvelopeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#112D4E]">Forgot Password</h3>
              <p className="text-sm text-gray-500">Enter your staff ID</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <XMarkIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className='p-6'>
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Enter your staff ID and we will send you a verification code to reset your password.
            </p>
          </div>
          <div className='mb-6'>
            <label htmlFor="staffId" className="block text-[#112D4E]font-semibold mb-3 text-sm">
              Enter staff ID
            </label>
            <div className='relative'>
              <UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                <input
                  type="text"
                  id="staffId"
                  value={staffId}
                  onChange={(e) => {
                    setStaffId(e.target.value)
                  }}
                  required
                  placeholder="Staff ID"
                  className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 text-[#112D4E] bg-white transition-all duration-200
                    ${error ? 'border-red-500 focus:ring-red-500'
                    :
                    'border-[#3F72AF] focus:ring-[#3F72AF]'
                  }`}
                  disabled={isLoading}
                />
            </div>
            {error && (
              <p className='text-sm text-red-600 mb-2'>Staff ID doesnt exist.</p>
            )}
          </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white font-semibold py-4 rounded-xl hover:from-[#163b65] hover:to-[#4a7bc8]
              transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
                </>
              ) : (
                <>
                <PaperAirplaneIcon className="w-5 h-5" />
                Send Verification Code
                </>
              )}
            </button>
        </form>
      </div>
    </div>
  )
}
