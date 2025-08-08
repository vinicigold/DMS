'use client'

import React, { useRef } from 'react'
import { XMarkIcon, LockClosedIcon, EyeIcon, } from '@heroicons/react/24/solid'

interface OtpModalProps {
    readonly isOpen: boolean
    readonly onClose: () => void
    readonly onSubmit: (otp: string) => void
}

export default function OtpModal({
    isOpen,
    onClose,
    onSubmit
}: OtpModalProps) {
    const otpRefs = useRef<(HTMLInputElement | null)[]>([])
    const otpFieldIds = ['otp-1', 'otp-2', 'otp-3', 'otp-4', 'otp-5', 'otp-6']

const  allowNum = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
}

const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.value.length && index < otpFieldIds.length - 1) {
        otpRefs.current[index + 1]?.focus()
    }
}

const handleOtpDel = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
if (e.key === 'Backspace') {
    if (e.currentTarget.value === ''){
        if(index > 0 ) {
            otpRefs.current[index - 1]?.focus()
        }
    }else{
        e.currentTarget.value=''
    }
}
}

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  const otp = otpRefs.current.map(ref => ref?.value || '').join('')

  if (otp === '696969') {
    onSubmit(otp)
  } else {
    alert('Invalid OTP. Please try again.')
  }
}

if (!isOpen) return null

return (
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-md">
    <h3 className="text-xl font-semibold text-[#112D4E] text-center mb-4">Enter OTP</h3>
    <form onSubmit={handleSubmit}>
        <fieldset className="mb-4">
        <legend className="block text-[#112D4E] mb-2 font-medium">Enter the 6-digit code sent to your email</legend>
        <div className="flex justify-center space-x-3 mb-4">
            {otpFieldIds.map((id, index) => (
            <input
                key={id}
                type="text"
                maxLength={1}
                ref={(el) => {(otpRefs.current[index] = el)}}
                onInput={allowNum}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleOtpDel(e, index)}
                className="w-10 text-center border-b-2 border-[#3F72AF] text-[#112D4E] text-xl focus:outline-none focus:border-[#112D4E] bg-transparent"
                required
            />
            ))}
        </div>
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
            Verify
            </button>
        </div>
        </fieldset>
    </form>
    </div>
</div>
)
}
