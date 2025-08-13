'use client'
import type React from 'react'
import { useState } from 'react'
import { GetUserInfo } from './Route'
import { XMarkIcon, UserPlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'

interface User {
    username: string
    staffId: string
    fullName: string
    institution: string
    role: string
    email: string
    mobileNumber: string
    status: 'Active' | 'Inactive' | 'Locked'
    dateLocked?: string
    functions: string
}

interface AddUserModalProps {
    readonly isOpen: boolean
    readonly onClose: () => void
    readonly onSubmit: (user: Omit<User, 'id'>) => void
}

export default function AddUserModal({ isOpen, onClose, onSubmit }: AddUserModalProps) {
    const [formData, setFormData] = useState({
        staffId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        userRole: '',
        userStatus: 'Active' as 'Active' | 'Inactive',
        email: '',
        mobileNumber: '',
        birthdate: '',
        institution: 'CARD MRI',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSearch = async () => {
        if(!formData.staffId.trim()) return

        setIsSearching(true)

        const staffInfo = await GetUserInfo(formData.staffId)
        console.log("Fetched from backend:", staffInfo)

        if(staffInfo) {
            setFormData(prev => ({
                ...prev,
                firstName: staffInfo.FirstName || "",
                middleName: staffInfo.MiddleName || "",
                lastName: staffInfo.LastName || "",
                email: staffInfo.Email || "",
                mobileNumber: staffInfo.MobileNumber || "",
                birthdate: staffInfo.DateOfBirth || ""
            }))
        } else {
            console.warn("No staff info found for this ID")
        }
        setIsSearching(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim()
        const username = `${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}`

        const newUser: Omit<User, 'id'> = {
            functions: formData.userRole,
            username: username,
            staffId: formData.staffId,
            fullName: fullName,
            institution: formData.institution,
            role: formData.userRole,
            email: formData.email,
            mobileNumber: formData.mobileNumber,
            status: formData.userStatus,
        }

        onSubmit(newUser)
        setIsLoading(false)

        // Reset form
        setFormData({
            staffId: '',
            firstName: '',
            middleName: '',
            lastName: '',
            userRole: '',
            userStatus: 'Active',
            email: '',
            mobileNumber: '',
            birthdate: '',
            institution: 'CARD MRI',
        })
    }

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
            <div className='bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto'>
                <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-xl flex items-center justify-center'>
                        <UserPlusIcon className='w-5 h-5 text-white' />
                    </div>
                    <div>
                    <h3 className='text-xl font-bold text-[#112D4E]'>Add New User</h3>
                    <p className='text-sm text-gray-500'>Create a new user account</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className='w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors'>
                        <XMarkIcon className='w-4 h-4 text-gray-600' />
                </button>
                </div>

                <form onSubmit={handleSubmit} className='p-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                            <div>
                                <label htmlFor='staffId' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Staff ID *
                                </label>
                                <div className='flex gap-2'>
                                    <input
                                        type='text'
                                        id='staffId'
                                        name='staffId'
                                        value={formData.staffId}
                                        onChange={handleChange}
                                        required
                                        className='flex-1 px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200'
                                        placeholder='Enter staff ID'
                                    />
                                    <button
                                        type='button'
                                        onClick={handleSearch}
                                        disabled={isSearching}
                                        className='px-3 py-3 bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white rounded-xl hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200
                                        disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[50px]'>
                                            {isSearching ? (
                                                <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                                            ) : (
                                                <MagnifyingGlassIcon className="w-4 h-4" />
                                            )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor='firstName' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    First Name *
                                </label>
                                <input
                                    type='text'
                                    id='firstName'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200'
                                    placeholder='Enter first name'
                                />
                            </div>

                            <div>
                                <label htmlFor='middleName' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Middle Name
                                </label>
                                <input
                                    type='text'
                                    id='middleName'
                                    name='middleName'
                                    value={formData.middleName}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200'
                                    placeholder='Enter middle name'
                                />
                            </div>

                            <div>
                                <label htmlFor='lastName' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Last Name *
                                </label>
                                <input
                                    type='text'
                                    id='lastName'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200'
                                    placeholder='Enter last name'
                                />
                            </div>

                            <div>
                                <label htmlFor='userRole' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    User Role *
                                </label>
                                <select
                                    id='userRole'
                                    name='userRole'
                                    value={formData.userRole}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200'>
                                        <option value=''>Select role</option>
                                        <option value='System Admin'>System Admin</option>
                                        <option value='Document Manager'>Document Manager</option>
                                        <option value='Regular User'>Regular User</option>
                                        <option value='Viewer'>Viewer</option>
                                </select>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <div>
                                <label htmlFor='email' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Email Address *
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200'
                                    placeholder='Enter email address'
                                />
                            </div>

                            <div>
                                <label htmlFor='mobileNumber' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Mobile Number *
                                </label>
                                <input
                                    type='tel'
                                    id='mobileNumber'
                                    name='mobileNumber'
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200'
                                    placeholder='0912 345 6789'
                                />
                            </div>

                            <div>
                                <label htmlFor='birthdate' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Birthdate *
                                </label>
                                <input
                                    type='date'
                                    id='birthdate'
                                    name='birthdate'
                                    value={formData.birthdate}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200'
                                />
                            </div>

                            <div>
                                <label htmlFor='institution' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Institution *
                                </label>
                                <input
                                    type='text'
                                    id='institution'
                                    name='institution'
                                    value={formData.institution}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200'
                                    placeholder='Enter institution'
                                />
                            </div>

                            <div>
                                <label htmlFor='userStatus' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    User Status *
                                </label>
                                <select
                                    id='userStatus'
                                    name='userStatus'
                                    value={formData.userStatus}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200'>
                                        <option value='Active'>Active</option>
                                        <option value='Inactive'>Inactive</option>
                                        <option value='Locked'>Locked</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 mt-6'>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='flex-1 bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-6 py-3 rounded-xl hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
                        {isLoading ? (
                            <>
                            <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                            Creating User...
                            </>
                        ) : (
                            <>
                            <UserPlusIcon className='w-5 h-5' />
                            Create User
                            </>
                        )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
