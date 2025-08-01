'use client'

import React, { useState } from 'react'

interface NewPassModalProps {
  isOpen: boolean
  onClose: () => void
  onReset: (newPassword: string) => void
}

const NewPassModal: React.FC<NewPassModalProps> = ({ isOpen, onClose, onReset }) => {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === confirm) {
      onReset(password)
    } else {
      alert('Passwords do not match.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-[#112D4E] text-center mb-4">Set New Password</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-password" className="block text-[#112D4E] mb-2 font-medium">
            New Password
          </label>
          <input
            id="new-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mb-4 border-b-2 border-[#3F72AF] text-[#112D4E] focus:outline-none bg-transparent"
          />
          <label htmlFor="confirm-password" className="block text-[#112D4E] mb-2 font-medium">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-3 py-2 mb-4 border-b-2 border-[#3F72AF] text-[#112D4E] focus:outline-none bg-transparent"
          />
          <div className="flex justify-center space-x-3">
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
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPassModal
