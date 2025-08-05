'use client'
import React, { useState } from 'react'

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
    <div className="fixed inset-0 bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-[#112D4E] text-center mb-4">Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-[#112D4E] mb-2 font-medium">
            Enter staff ID
          </label>
          <input
            type="text"
            id="staffId"
            value={staffId}
            onChange={(e) => {
              setStaffId(e.target.value)
            }}
            required
            placeholder="Staff ID"
            className={`w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 ${
              error ? 'border-red-500 focus:ring-red-500' : 'border-[#3F72AF] focus:ring-[#3F72AF]'
            }`}
          />
          {error && (
            <p className='text-sm text-red-600 mb-2'>Staff ID doesnt exist.</p>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 text-[#112D4E] hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#3F72AF] text-white hover:bg-[#2c5b93]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
