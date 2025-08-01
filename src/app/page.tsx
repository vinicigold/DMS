'use client'
import { useRef, useState } from 'react'
import OtpModal from '@/components/Otpmodal'

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [email, setEmail] = useState('')
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [isInvalidEmail, setIsInvalidEmail] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const otpFields = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6']
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const [showNewPassModal, setShowNewPassModal] = useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Logging in with:', formData)
  }
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'ivan@gmail.com'){
      setShowEmailModal(false)
      setShowOtpModal(true)
    }
    else{
      setIsInvalidEmail(true)
    }
  }
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otp = otpRefs.current.map(ref => ref?.value || '').join('')
    if (otp === '696969'){
      setShowOtpModal(false)
      setShowNewPassModal(true)
    }else{
      alert('invalid otp')
    }
  }
  const allowNum = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
  }
  const handleOtpChange = (e:React.ChangeEvent<HTMLInputElement>, index: number) =>{
    const value = e.target.value
    if(value){
      e.target.value = value
      if(index < otpFields.length - 1) {
        otpRefs.current[index + 1]?.focus()
      }
    }
  }
  const handleOtpDel = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
    if (e.currentTarget.value === '') {
      if (index > 0) {
        otpRefs.current[index - 1]?.focus()
      }
    } else {
      e.currentTarget.value = ''
    }
  }
  }
  return (
    <div className='min-h-screen flex items-center justify-center px-4 bg-[#f9f7f7] relative'>
      <div className={`w-full max-w-md bg-[#DBE2EF] p-8 rounded-2xl shadow-lg z-10 transition-all duration-300 ${showEmailModal || showOtpModal || showNewPassModal ? 'blur-sm scale-[0.98] opacity-80' : ''}`}>
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
            className='w-full bg-[#B9D7EA] text-[#112D4E] font-semibold py-3 rounded hover:bg-[#769FCD] transition duration-200'>
            Login
          </button>
          <div className='text-center mt-4'>
            <button type='button' onClick={() => setShowEmailModal(true)} className='text-[#112D4E] hover:underline text-sm'>
              Forgot password?
            </button>
          </div>
        </form>
      </div>
      {showEmailModal && (
        <div className='fixed inset-0 bg-white/30 flex items-center justify-center z-50'>
          <div className='bg-white w-full max-w-sm p-6 rounded-xl shadow-md'>
            <h3 className='text-xl font-semibold text-[#112D4E] text-center mb-4'>Forgot Password</h3>
            <form onSubmit={handleEmailSubmit}>
              <label htmlFor='email' className='block text-[#112D4E] mb-2 font-medium'>Enter your email</label>
              <input type='email' id='email' value={email} onChange={e => {
                  setEmail(e.target.value) 
                  setIsInvalidEmail(false)
                }} required placeholder='you@example.com'
                className={`w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 ${isInvalidEmail
                ? 'border-red-500 focus:ring-red-500': 'border-[#3F72AF] focus:ring-[#3F72AF]'}`}
              />
              <div className='flex justify-end space-x-2'>
                <button type='button' onClick={() => setShowEmailModal(false)}
                  className='px-4 py-2 rounded bg-gray-300 text-[#112D4E] hover:bg-gray-400'>
                  Cancel
                </button>
                <button type='submit' className='px-4 py-2 rounded bg-[#3F72AF] text-white hover:bg-[#2c5b93]'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showOtpModal && (
  <OtpModal
    isOpen={showOtpModal}
    onClose={() => setShowOtpModal(false)}
    onSubmit={(otp) => console.log('Submitted OTP:', otp)}
  />
)}
      {showNewPassModal && (
        <div className='fixed inset-0 bg-white/30 flex items-center justify-center z-50'>
          <div className='bg-white w-full max-w-sm p-6 rounded-xl shadow-md'>
            <h3 className='text-xl font-semibold text-[#112D4E] text-center mb-4'>Reset Password</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const newPass = (e.currentTarget).newPassword.value
              const confirmPass = (e.currentTarget).confirmPassword.value
              if (newPass === confirmPass) {
                console.log('Password successfully reset:', newPass)
                setShowNewPassModal(false)
              } else {
                alert('Passwords do not match!')
              }
            }}>
              <label className='block text-[#112D4E] font-medium mb-2' htmlFor='newPassword'>New Password</label>
              <input type='password' id='newPassword' name='newPassword' required
                className='w-full p-3 border border-[#3F72AF] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E]'
              />
              <label className='block text-[#112D4E] font-medium mb-2' htmlFor='confirmPassword'>Confirm Password</label>
              <input type='password' id='confirmPassword' name='confirmPassword' required
                className='w-full p-3 border border-[#3F72AF] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E]'
              />
              <div className='flex justify-end space-x-2'>
                <button type='button' onClick={() => setShowNewPassModal(false)}
                  className='px-4 py-2 rounded bg-gray-300 text-[#112D4E] hover:bg-gray-400'>
                  Cancel
                </button>
                <button type='submit' className='px-4 py-2 rounded bg-[#3F72AF] text-white hover:bg-[#2c5b93]'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
