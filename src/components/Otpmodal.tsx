'use client'

import React, { useState, useRef } from 'react'
import { XMarkIcon, ShieldCheckIcon, ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

interface OtpModalProps {
    readonly isOpen: boolean
    readonly onClose: () => void
    readonly onSubmit: (otp: string) => void
    readonly isForReset?: boolean
}

export default function OtpModal({
    isOpen,
    onClose,
    onSubmit,
    isForReset = false

}: OtpModalProps) {
    const otpFieldIds = ['otp-1', 'otp-2', 'otp-3', 'otp-4', 'otp-5', 'otp-6']
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [resendCooldown, setResendCooldown] = useState(0)
    const otpRefs = useRef<(HTMLInputElement | null)[]>([])

const startResendCountdown = () => {
    setResendCooldown(30)
    const interval = setInterval(() => {
        setResendCooldown(prev => {
            if (prev <= 1) {
                clearInterval(interval)
                return 0
            }
            return prev - 1
        })
    }, 1000)
}

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
  setIsLoading(true)
  setError('')

    if (otp === '696969') {
        onSubmit(otp)
    } else {
        setError('Invalid OTP')
    }
    setIsLoading(false)
}

const handleResendOtp = () => {
    if (resendCooldown > 0 ) return
    setResendCooldown(30)
    setIsLoading(true)
    startResendCountdown()
    setIsLoading(false)
}

if (!isOpen) return null

return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3f72AF] rounded-xl flex items-center justify-center'>
                        <ShieldCheckIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[#112D4E] ">Enter OTP</h3>
                        <p className='text-sm text-gray-500'>
                            {isForReset ? 'Enter the OTP sent to your email to reset your password.' : 'Enter the OTP sent to your email.'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className='w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors'>
                    <XMarkIcon className="w-4 h-4 text-gray-600 hover:text-gray-800 transition-colors" />
                </button>
            </div>
            <form onSubmit={handleSubmit} className='p-6'>
                <div className='text-center mb-6'>
                    <p className='text-gray-600 mb-4'>
                        We sent a 6-digit verification code
                    </p>
                </div>
                <div className="flex gap-3 justify-center mb-6">
                    {otpFieldIds.map((id, index) => (
                    <input
                        key={id}
                        type="text"
                        maxLength={1}
                        ref={(el) => {(otpRefs.current[index] = el)}}
                        onInput={allowNum}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpDel(e, index)}
                        className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-200
                            ${id? 'border-[#3F72AF] bg-[##3F72AF]/5'
                            :'border-gray-200 hover:border-gray-300'
                            }focus:outline-none focus:border-[#3F72AF] focus:ring-4 focus:ring-[#3F72AF]/10`}
                        disabled={isLoading}
                        required
                    />
                    ))}
                </div>
                {error && (
                    <div className='bg-red-50 border border-red-200 rounded-xl p-3 mb-4'>
                        <p className='text-red-600 text-sm text-center'>{error}</p>
                    </div>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white font-semibold py-4 rounded-xl hover:from-[#163B65] hover:to-[#4A7BC8]
                    transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                    flex items-center justify-center gap-2 mb-4">
                    {isLoading ? (
                        <>
                            <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'/>
                            Verifying...
                        </>
                    ) : (
                        <>
                            <CheckCircleIcon className="w-5 h-5" />
                            Verify OTP
                        </>
                    )}
                </button>
                <div className='text-center'>
                    <p>
                        <button
                            type='button'
                            onClick={handleResendOtp}
                            disabled={resendCooldown > 0 || isLoading}
                            className='text-[#3F72AF] hover:text[#112D4E] font-medium text-sm hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                            flex items-center justify-center gap-1 mx-auto'>
                                <ArrowPathIcon className="w-4 h-4" />
                                {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : 'Resend OTP'  }
                        </button>
                    </p>
                </div>
            </form>
        </div>
    </div>
)
}
