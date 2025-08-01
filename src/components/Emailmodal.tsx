'use client'

import React, { useState } from 'react'

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  onSend: (email: string) => void
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, onSend }) => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSend(email)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-[#112D4E] text-center mb-4">Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-[#112D4E] mb-2 font-medium">
            Enter your email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mb-4 border-b-2 border-[#3F72AF] text-[#112D4E] text-base focus:outline-none bg-transparent"
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
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmailModal
