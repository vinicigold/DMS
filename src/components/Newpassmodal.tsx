'use client'
import React, { useState } from 'react'

interface NewPassModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onSubmit: (newPass: string) => void
}

export default function NewPassModal({
  isOpen,
  onClose,
  onSubmit
}: NewPassModalProps) {

  const [error, setError] = useState(false)
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  if (!isOpen) return null

  // Live validation checks
  const hasUpperCase = /[A-Z]/.test(newPass)
  const hasLowerCase = /[a-z]/.test(newPass)
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(newPass)
  const hasNum = /\d/.test(newPass)
  const hasMinLength = newPass.length >= 8

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newPass !== confirmPass) {
      setError(true)
      return
    }

    if (!hasUpperCase || !hasLowerCase || !hasSymbol || !hasNum || !hasMinLength) {
      setError(true)
      alert('Password must meet all strength requirements.')
      return
    }

    setError(false)
    onSubmit(newPass)
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white w-full max-w-sm p-6 rounded-xl shadow-md'>
        <h3 className='text-xl font-semibold text-[#112D4E] text-center mb-4'>Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <label className='block text-[#112D4E] font-medium mb-2' htmlFor='newPassword'>New Password</label>
          <input
            type='password'
            id='newPassword'
            name='newPassword'
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value)
              setError(false)
            }}
            required
            className='w-full p-3 border border-[#3F72AF] rounded mb-2 focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E]'
          />

          <label className='block text-[#112D4E] font-medium mb-2' htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value)
              setError(false)
            }}
            required
            className={`w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 text-[#112D4E] ${
              error ? 'border-red-500 focus:ring-red-500' : 'border-[#3F72AF] focus:ring-[#3F72AF]'
            }`}
          />
          {/* Password Requirements */}
          <ul className="text-sm mb-4">
            <li className={hasUpperCase ? 'text-green-600' : 'text-red-600'}>
              {hasUpperCase ? '✓' : '✗'} At least one uppercase letter
            </li>
            <li className={hasLowerCase ? 'text-green-600' : 'text-red-600'}>
              {hasLowerCase ? '✓' : '✗'} At least one lowercase letter
            </li>
            <li className={hasSymbol ? 'text-green-600' : 'text-red-600'}>
              {hasSymbol ? '✓' : '✗'} At least one symbol
            </li>
            <li className={hasNum ? 'text-green-600' : 'text-red-600'}>
              {hasNum ? '✓' : '✗'} At least one number
            </li>
            <li className={hasMinLength ? 'text-green-600' : 'text-red-600'}>
              {hasMinLength ? '✓' : '✗'} Minimum 8 characters
            </li>
          </ul>
          {error && (
            <p className='text-sm text-red-600 mb-2'>Passwords do not match or do not meet requirements.</p>
          )}

          <div className='flex justify-end space-x-2'>
            <button type='button' onClick={() => {
                onClose()
                setError(false)
                setNewPass('')
                setConfirmPass('')
              }}
              className='px-4 py-2 rounded bg-gray-300 text-[#112D4E] hover:bg-gray-400'>
              Cancel
            </button>
            <button type='submit'
              className='px-4 py-2 rounded bg-[#3F72AF] text-white hover:bg-[#2c5b93]'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
