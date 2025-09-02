"use client"
import React, { useState } from "react"
import { X, UserRoundCog } from "lucide-react"

interface EditUserModalProps {
	readonly isOpen: boolean
	readonly onClose: () => void
	readonly userData: User | null
}

interface User {
	staffID: string
	firstName: string
	middleName: string
	lastName: string
	userRole: 0
	userStatus: 0
	email: string
	mobileNumber: string
	birthdate: string
	employeeStatusId: 0
}

export default function EditUserModal({ isOpen, onClose }: EditUserModalProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleClose = () => {
		onClose()
	}
	if (!isOpen) return null
	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto scrollbar-hide">
			<div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100">
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-xl flex items-center justify-center">
							<UserRoundCog className="w-5 h-5 text-white" />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#112D4E]">EditUser</h3>
							<p className="text-sm text-gray-500">Edit user account</p>
						</div>
					</div>
					<button
						onClick={handleClose}
						className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
						<X className="w-4 h-4 text-gray-600" />
					</button>
				</div>
				<form className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div>
								<label
									htmlFor="staffID"
									className="block text-[#112D4E] font-semibold mb-2 text-sm">
									Staff ID *
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										id="staffID"
										name="staffID"
										required
										className="flex-1 px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200"
										placeholder="Enter staff ID"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="firstname"
									className="block text-[#112D4E] font-semibold mb-2 text-sm">
									Firstname *
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										id="firstname"
										name="firstname"
										required
										className="flex-1 px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200"
										placeholder="Enter staff ID"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="middlename"
									className="block text-[#112D4E] font-semibold mb-2 text-sm">
									Middlename *
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										id="middlename"
										name="middlename"
										required
										className="flex-1 px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200"
										placeholder="Enter staff ID"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="lastname"
									className="block text-[#112D4E] font-semibold mb-2 text-sm">
									Lastname *
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										id="lastname"
										name="lastname"
										required
										className="flex-1 px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200"
										placeholder="Enter staff ID"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="status"
									className="block text-[#112D4E] font-semibold mb-2 text-sm">
									Status *
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										id="status"
										name="status"
										required
										className="flex-1 px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200"
										placeholder="Enter staff ID"
									/>
								</div>
							</div>
						</div>
						<div className="space-y-4">
							<div>
								<label
									htmlFor="username"
									className="block text-[#112D4E] font-semibold mb-2 text-sm">
									Username *
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										id="username"
										name="username"
										required
										className="flex-1 px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200"
										placeholder="Enter staff ID"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="institution"
									className="block text-[#112D4E] font-semibold mb-2 text-sm">
									Institution *
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										id="institution"
										name="institution"
										required
										className="flex-1 px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200"
										placeholder="Enter staff ID"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-[#112D4E] font-semibold mb-2 text-sm">
									Email *
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										id="email"
										name="email"
										required
										className="flex-1 px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200"
										placeholder="Enter staff ID"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="mobile"
									className="block text-[#112D4E] font-semibold mb-2 text-sm">
									Mobile *
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										id="mobile"
										name="mobile"
										required
										className="flex-1 px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200"
										placeholder="Enter staff ID"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="role"
									className="block text-[#112D4E] font-semibold mb-2 text-sm">
									Role *
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										id="role"
										name="role"
										required
										className="flex-1 px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200"
										placeholder="Enter staff ID"
									/>
								</div>
							</div>
						</div>
					</div>
					{error && (
						<div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 mt-6">
							<p className="font-medium text-sm text-center text-red-600">
								{error}
							</p>
						</div>
					)}
					<div className="flex gap-4 mt-6">
						<button
							type="submit"
							disabled={isLoading}
							className="flex-1 bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-6 py-3 rounded-xl hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
							{isLoading ? (
								<>
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									Updating User...
								</>
							) : (
								<>
									<UserRoundCog className="w-5 h-5" />
									Update User
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
