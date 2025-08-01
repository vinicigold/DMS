'use client'

import React, { useRef } from 'react'

interface OtpModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (otp: string) => void
}

    const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const otpRefs = useRef<(HTMLInputElement | null)[]>([])
    const otpValues = useRef<string[]>(['', '', '', '', '', ''])
    const otpFields = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6']

const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value
    otpValues.current[index] = val
    if (val && index < 5) otpRefs.current[index + 1]?.focus()
}

const handleOtpDel = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otpValues.current[index] && index > 0) {
    otpRefs.current[index - 1]?.focus()
    }
}

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(otpValues.current.join(''))
}

const allowNum = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
}

if (!isOpen) return null

return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-[#112D4E] text-center mb-4">Enter OTP</h3>
        <form onSubmit={handleSubmit}>
            <fieldset className='mb-4'>
                <legend className='block text-[#112D4E] mb-2 font-medium'>Enter the 6-digit code sent to your email</legend>
                    <div className='flex justify-center space-x-3 mb-4'>
                        {otpFields.map((fieldId, index) => (
                        <input key={fieldId} id={fieldId} type='text' maxLength={1} onInput={allowNum} onKeyDown={(e) => handleOtpDel(e, index)}
                        onChange={(e) => handleOtpChange(e, index)} ref={(el) => {(otpRefs.current[index] = el)}} required
                        className='w-10 text-center border-b-2 border-[#3F72AF] text-[#112D4E] text-xl focus:outline-none focus:border-[#112D4E] bg-transparent'
                        />
                    ))}
                </div>
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
                        Verify
                        </button>
                    </div>
            </fieldset>
        </form>
    </div>
    </div>
)
}

export default OtpModal
