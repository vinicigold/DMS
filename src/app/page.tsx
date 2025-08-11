'use client'
import { useState } from 'react'
import OtpModal from '@/components/Otpmodal'
import EmailModal from '@/components/Staffidmodal'
import NewPassModal from '@/components/Newpassmodal'
import { useRouter } from 'next/navigation'
import { LockClosedIcon, EyeIcon, EyeSlashIcon, UserIcon, KeyIcon, DocumentDuplicateIcon} from '@heroicons/react/24/solid'

export default function Login() {
  const [signIn, setSignIn] = useState({
    username: '',
    password: ''
  })

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showStaffIdModal, setShowStaffIdModal] = useState(false)
  const [isInvalidStaffId, setIsInvalidStaffId] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [forOtpReset, setForOtpReset] = useState(false)
  const [showNewPassModal, setShowNewPassModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignIn(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

      if (signIn.username === 'admin' && signIn.password === 'admin') {
        setForOtpReset(false)
        setShowOtpModal(true)
      } else {
        setSignIn({ username: '', password: '' })
        setError('Invalid username or password')
      }
      setIsLoading(false)
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#f9f7f7] via-[#f1f5f9] to-[#e2e8f0] relative'>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg
          fill='none' fillRule='evenodd'%3E%3Cg fill='%23112D4E' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <div className={`w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 z-10 transition-all duration-500
      ${showStaffIdModal || showOtpModal || showNewPassModal ? 'blur-sm scale-[0.98] opacity-80':'hover:shadow-3xl'}`}>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <DocumentDuplicateIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className='text-3xl font-bold text-[#112D4E] mb-2'>
              Document Management System
            </h2>
            <p className="text-[#64748b] text-sm">V1.0.0</p>
          </div>
          {error && (
            <div className='bg-red-50 border border-red-200 rounded-xl p-4 mb-6'>
              <p className='font-medium text-sm text-center text-red-600'>{error}</p>
            </div>
          )}
          <div className='mb-4'>
            <label htmlFor='username' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
              Username
            </label>
            <div className='relative'>
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b] w-5 h-5" />
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={signIn.username}
                  onChange={handleChange}
                  placeholder='Enter your username'
                  required
                  className='w-full pl-12 pr-4 py-4 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E]
                  bg-white transition-all duration-200 hover:border-[#cbd5e1]'
                />
            </div>
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
              Password
            </label>
            <div className='relative'>
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b] w-5 h-5" />
                <input type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  value={signIn.password}
                  onChange={handleChange}
                  placeholder='Enter your password'
                  required
                  className='w-full pl-12 pr-4 py-4 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E]
                  bg-white transition-all duration-200 hover:border-[#cbd5e1]'
                />
                <button type='button' onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748b]'>
                    {showPassword
                      ?<EyeIcon className="w-5 h-5" />
                      :<EyeSlashIcon className="w-5 h-5" />}
                </button>
            </div>
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white font-semibold py-4 rounded-xl hover:from-[#163b65] hover:to-[#4a7bc8] transition-all 
            duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'>
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <KeyIcon className="w-5 h-5" />
                  Sign In
                </>
              )}
          </button>
          <div className='text-center mt-6'>
            <button 
              type='button' 
              onClick={() => setShowStaffIdModal(true)} 
              className='text-[#3F72AF] hover:text-[#112D4E] text-sm font-medium hover:underline transition-colors'>
              Forgot your password?
            </button>
          </div>
        </form>
      </div>
     {showStaffIdModal && (
        <EmailModal
          isOpen={showStaffIdModal}
          onClose={() => {
            setShowStaffIdModal(false)
            setIsInvalidStaffId(false)
          }}
          onSubmit={(submittedStaffId) => {
            console.log('Submitted Staff ID:', submittedStaffId)
            setShowStaffIdModal(false)
            setForOtpReset(true)
            setShowOtpModal(true)
          }}
          error={isInvalidStaffId}
        />
      )}
      {showOtpModal && (
        <OtpModal
          isOpen={showOtpModal}
          onClose={() => {
            setShowOtpModal(false)
            setForOtpReset(false)
          }}
          onSubmit={(otp) => {
            console.log('Submitted OTP:', otp)
            setShowOtpModal(false)
            if (forOtpReset) {
              setForOtpReset(false)
              setShowNewPassModal(true)
            } else {
              router.push('/dms/dashboard')
            }
          }}
        />
      )}
      {showNewPassModal && (
        <NewPassModal
          isOpen={showNewPassModal}
          onClose={() => setShowNewPassModal(false)}
          onSubmit={(newPass) => {
            console.log('New Password:', newPass)
            setShowNewPassModal(false)
          }}
        />
      )}
    </div>
  )
}
