'use client'
import { useState } from 'react'
import OtpModal from '@/components/Otpmodal'
import EmailModal from '@/components/Staffidmodal'
import NewPassModal from '@/components/Newpassmodal'

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [showStaffIdModal, setShowStaffIdModal] = useState(false)
  const [isInvalidStaffId, setIsInvalidStaffId] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [showNewPassModal, setShowNewPassModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Logging in with:', formData)
  }
  return (
    <div className='min-h-screen flex items-center justify-center px-4 bg-[#f9f7f7] relative'>
      <div className={`w-full max-w-md bg-[#DBE2EF] p-8 rounded-2xl shadow-lg z-10 transition-all duration-300 ${showStaffIdModal || showOtpModal || showNewPassModal ? 'blur-sm scale-[0.98] opacity-80' : ''}`}>
        <form onSubmit={handleSubmit} className='w-full'>
          <h2 className='text-3xl font-bold text-center mb-6 text-[#112D4E]'>
            DMS
          </h2>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-[#112D4E] font-semibold mb-2'>
              Username
            </label>
            <input type='text' id='username' name='username' value={formData.username} onChange={handleChange}
              placeholder='Enter your username' required
              className='w-full p-3 border border-[#3F72AF] rounded focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-[#112D4E] font-semibold mb-2'>
              Password
            </label>
            <input type='password' id='password' name='password' value={formData.password} onChange={handleChange}
              placeholder='Enter your password' required
              className='w-full p-3 border border-[#3F72AF] rounded focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white'
            />
          </div>
          <button type='submit'
            className='w-full bg-[#112D4E] text-[#ffffff] font-semibold py-3 rounded hover:bg-[#769FCD] transition duration-200'>
            Login
          </button>
          <div className='text-center mt-4'>
            <button type='button' onClick={() => setShowStaffIdModal(true)} className='text-[#112D4E] hover:underline text-sm'>
              Forgot password?
            </button>
          </div>
        </form>
      </div>
     {showStaffIdModal && (
        <EmailModal
          isOpen={showStaffIdModal}
          onClose={() => {
            setShowStaffIdModal(false)
            setIsInvalidStaffId(false)}}
          onSubmit={(submittedStaffId) => {
            console.log('Submitted Staff ID:', submittedStaffId)
            setShowStaffIdModal(false)
            setShowOtpModal(true)
          }}
          error={isInvalidStaffId}
        />
      )}
      {showOtpModal && (
        <OtpModal
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          onSubmit={(otp) => {
            console.log('Submitted OTP:', otp)
            setShowOtpModal(false)
            setShowNewPassModal(true)
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
