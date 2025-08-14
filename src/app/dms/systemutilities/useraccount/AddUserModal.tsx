'use client'
import type React from 'react'
import { useState } from 'react'
import { GetUserInfo, RegisterUser } from './Route'
import { XMarkIcon, UserPlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'

type RoleOption = {
    id: number
    name: string
}

const roleOptions: RoleOption[] = [
    { id: 1, name: 'Super Admin' },
    { id: 2, name: 'Institution Admin' },
    { id: 3, name: 'Institution User' },
]

type EmployeeStatus = {
    id: number
    name: string
}

const empStatusId: EmployeeStatus[] = [
    { id: 1, name: 'Probitionary' },
    { id: 2, name: 'Regular' },
    { id: 3, name: 'Contractual' },
    { id: 4, name: 'On Leave' },
    { id: 5, name: 'Reinstated' },
    { id: 6, name: 'Resigned' },
    { id: 7, name: 'Terminated' },
    { id: 8, name: 'Retired' },
    { id: 9, name: 'Deceased' },
    { id: 10, name: 'Suspended' },
]

type AccountStatus = {
    id: number
    name: string
}

const accountStatusId: AccountStatus[] = [
    { id: 1, name: 'New' },
    { id: 2, name: 'Active' },
    { id: 3, name: 'Inactive' },
    { id: 4, name: 'Locked' },
    { id: 5, name: 'Expired' },
    { id: 6, name: 'Deactivated' },
    { id: 7, name: 'Reset' },
]

interface AddUserModalProps {
    readonly isOpen: boolean
    readonly onClose: () => void
}

export default function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
    const [formData, setFormData] = useState({
        staffID: '',
        firstName: '',
        middleName: '',
        lastName: '',
        userRole: 0,
        userStatus: 0,
        email: '',
        mobileNumber: '',
        birthdate: '',
        employeeStatusId: 0,
    })
    const initialFormData = {
        staffID: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        birthdate: '',
        userRole: 0,
        userStatus: 0,
        employeeStatusId: 0
    }

    const handleClose = () => {
        setFormData(initialFormData)
        onClose()
    }

    const [isLoading, setIsLoading] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: ['userRole', 'employeeStatusId', 'userStatus'].includes(name) ? parseInt(value,10) : value }))
    }

    const handleSearch = async () => {
        if(!formData.staffID.trim()) return

        setIsSearching(true)

        const staffInfo = await GetUserInfo(formData.staffID)

        if(staffInfo) {
            setFormData(prev => ({
                ...prev,
                firstName: staffInfo.FirstName || '',
                middleName: staffInfo.MiddleName || '',
                lastName: staffInfo.LastName || '',
                email: staffInfo.Email || '',
                mobileNumber: staffInfo.MobileNumber || '',
                birthdate: staffInfo.DateOfBirth || ''
            }))
        } else {
            console.warn('No staff info found for this ID')
        }
        setIsSearching(false)

        setFormData(prev => ({
            ...prev,
            userRole: 0,
            userStatus: 0,
            employeeStatusId: 0
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const formattedBirthdate = formData.birthdate
            ? new Date(formData.birthdate).toISOString().replace(/\.\d{3}Z$/, "Z")
            : new Date().toISOString().replace(/\.\d{3}Z$/, "Z")

        const userPayload = {
            staffID: formData.staffID,
            firstname: formData.firstName,
            middlename: formData.middleName,
            lastname: formData.lastName,
            email: formData.email,
            mobilenumber: formData.mobileNumber, 
            dateofbirth: formattedBirthdate,
            employeeStatusId: formData.employeeStatusId,
            roleId: formData.userRole,
            accountStatusId: formData.userStatus,
        }

        console.log('Submitting user:', userPayload)
        const success = await RegisterUser(userPayload)

        setIsLoading(false)

        if(success){
            setFormData(initialFormData)
        }
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
                    onClick={handleClose}
                    className='w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors'>
                        <XMarkIcon className='w-4 h-4 text-gray-600' />
                </button>
                </div>

                <form onSubmit={handleSubmit} className='p-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                            <div>
                                <label htmlFor='staffID' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Staff ID *
                                </label>
                                <div className='flex gap-2'>
                                    <input
                                        type='text'
                                        id='staffID'
                                        name='staffID'
                                        value={formData.staffID}
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
                                                <MagnifyingGlassIcon className='w-4 h-4' />
                                            )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <p className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    First Name *
                                </p>
                                <p className={`w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] transition-all duration-200
                                    ${formData.firstName ? "text-[#112D4E] bg-gray-200" : "text-gray-400 bg-white"}
                                    min-h-[48px] flex items-center`}>
                                        {formData.firstName}
                                </p>
                            </div>

                            <div>
                                <p className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Middle Name
                                </p>
                                <p className={`w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] transition-all duration-200
                                    ${formData.middleName ? 'text-[#112D4E] bg-gray-200' : 'text-gray-400 bg-white'}
                                    min-h-[48px] flex items-center`}>
                                        {formData.middleName}
                                </p>
                            </div>

                            <div>
                                <p className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Last Name *
                                </p>
                                <p className={`w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] transition-all duration-200
                                    ${formData.lastName ? 'text-[#112D4E] bg-gray-200' : 'text-gray-400 bg-white'}
                                    min-h-[48px] flex items-center`}>
                                        {formData.lastName}
                                </p>
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
                                        {roleOptions.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <div>
                                <p className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Email Address *
                                </p>
                                <p className={`w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] transition-all duration-200
                                    ${formData.email ? 'text-[#112D4E] bg-gray-200' : 'text-gray-400 bg-white'}
                                    min-h-[48px] flex items-center`}>
                                        {formData.email}
                                </p>
                            </div>

                            <div>
                                <p className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Mobile Number *
                                </p>
                                <p className={`w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] transition-all duration-200
                                    ${formData.mobileNumber ? 'text-[#112D4E] bg-gray-200' : 'text-gray-400 bg-white'}
                                    min-h-[48px] flex items-center`}>
                                        {formData.mobileNumber}
                                </p>
                            </div>

                            <div>
                                <p className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Birthdate *
                                </p>
                                <p className={`w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] transition-all duration-200
                                    ${formData.birthdate ? 'text-[#112D4E] bg-gray-200' : 'text-gray-400 bg-white'}
                                    min-h-[48px] flex items-center`}>
                                        {formData.birthdate}
                                </p>
                            </div>

                            <div>
                                <label htmlFor='employeeStatusId' className='block text-[#112D4E] font-semibold mb-2 text-sm'>
                                    Employee Status *
                                </label>
                                <select
                                    id='employeeStatusId'
                                    name='employeeStatusId'
                                    value={formData.employeeStatusId}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200'>
                                        <option value=''>Employee Status</option>
                                        {empStatusId.map((empStatus) => (
                                            <option key={empStatus.id} value={empStatus.id}>
                                                {empStatus.name}
                                            </option>
                                        ))}
                                </select>
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
                                        <option value=''>User Status</option>
                                        {accountStatusId.map((accStatus) => (
                                            <option key={accStatus.id} value={accStatus.id}>
                                                {accStatus.name}
                                            </option>
                                        ))}
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
