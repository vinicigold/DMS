"use client"
import React, { useState } from "react"
import {
	LockClosedIcon,
	XMarkIcon,
	EyeIcon,
	EyeSlashIcon,
	ExclamationTriangleIcon,
	CheckCircleIcon,
} from "@heroicons/react/24/solid"

interface NewPassModalProps {
	readonly isOpen: boolean
	readonly onClose: () => void
	readonly onSubmit: (password: string) => void
}

export default function NewPassModal({
	isOpen,
	onClose,
	onSubmit,
}: NewPassModalProps) {
	const [password, setPassword] = useState({
		newPassword: "",
		confirmPassword: "",
	})
	const [showPassword, setShowPassword] = useState({
		newPassword: false,
		confirmPassword: false,
	})
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState<string[]>([])

	const validatePassword = (password: string) => {
		const errors = []
		if (password.length < 8) errors.push("At least 8 characters")
		if (!/[A-Z]/.test(password)) errors.push("One uppercase letter")
		if (!/[a-z]/.test(password)) errors.push("One lowercase letter")
		if (!/\d/.test(password)) errors.push("One number")
		if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
			errors.push("One special character")
		return errors
	}

	const handleNewPassChange = (field: string, value: string) => {
		setPassword((prev) => ({ ...prev, [field]: value }))
		if (field === "newPassword") {
			setErrors(validatePassword(value))
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (password.newPassword !== password.confirmPassword) {
			setErrors(["Passwords do not match."])
			return
		}

		if (errors.length > 0) {
			setIsLoading(true)
		}

		await new Promise((resolve) => setTimeout(resolve, 1500))

		onSubmit(password.newPassword)
		setIsLoading(false)
	}

	const togglePasswordVisibility = (
		field: "newPassword" | "confirmPassword"
	) => {
		setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
	}

	if (!isOpen) return null

	const passwordStrength =
		password.newPassword.length > 0 ? Math.max(0, 5 - errors.length) : 0
	const strengthColors = [
		"bg-red-500",
		"bg-orange-500",
		"bg-yellow-500",
		"bg-blue-500",
		"bg-green-500",
	]
	const textStrengthColors = [
		"text-red-600",
		"text-yellow-600",
		"text-green-600",
	]
	const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-3xl shadow-3xl w-full max-w-sm transform transition-all duration-300 scale-100">
				<div className="flex item-center justify-between p-6 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-xl flex items-center justify-center">
							<LockClosedIcon className="w-5 h-5 text-white" />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#112D4E]">New Password</h3>
							<p className="text-sm text-gray-500">Create a strong password</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
						<XMarkIcon className="w-4 h-4 text-gray-600 hover:text-gray-800 transition-colors" />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="p-6">
					<div className="mb-4">
						<label
							htmlFor="newPassword"
							className="block text-[#112D4E] font-semibold mb-3 text-sm">
							New Password
						</label>
						<div className="relative">
							<LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type={showPassword.newPassword ? "text" : "password"}
								id="newPassword"
								value={password.newPassword}
								onChange={(e) =>
									handleNewPassChange("newPassword", e.target.value)
								}
								placeholder="Enter new password"
								required
								className="w-full pl-12 pr-4 py-4 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E]
                  bg-white transition-all duration-200 hover:border-[#cbd5e1]"
								disabled={isLoading}
							/>
							<button
								type="button"
								onClick={() => togglePasswordVisibility("newPassword")}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#3F72AF] transition-colors">
								{showPassword.newPassword ? (
									<EyeSlashIcon className="w-5 h-5" />
								) : (
									<EyeIcon className="w-5 h-5" />
								)}
							</button>
						</div>
						{password.newPassword && (
							<div className="mt-3">
								<div className="flex gap-1 mb-2">
									{strengthLabels.map((level, i) => (
										<div
											key={level}
											className={`h-2 flex-1 rounded-full transition-colors
                      ${
												i < passwordStrength
													? strengthColors[passwordStrength - 1]
													: "bg-gray-200"
											}`}
										/>
									))}
								</div>
								<p
									className={`text-xs font-medium ${
										passwordStrength > 0
											? textStrengthColors[passwordStrength - 1]
											: "text-red-600"
									}`}>
									{passwordStrength > 0
										? strengthLabels[passwordStrength - 1]
										: "Very Weak"}
								</p>
							</div>
						)}
					</div>
					<div className="mb-6">
						<label
							htmlFor="confirmPassword"
							className="block text-[#112D4E] font-semibold mb-3 text-sm">
							Confirm Password
						</label>
						<div className="relative">
							<LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type={showPassword.confirmPassword ? "text" : "password"}
								id="confirmPassword"
								value={password.confirmPassword}
								onChange={(e) =>
									handleNewPassChange("confirmPassword", e.target.value)
								}
								placeholder="Confirm new password"
								required
								className={`w-full pl-12 pr-4 py-4 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E]
                  bg-white transition-all duration-200 hover:border-[#cbd5e1]
                ${
									password.confirmPassword &&
									password.newPassword !== password.confirmPassword
										? "border-red-300 focus:border-red-500 focus:ring-red-500/100"
										: "border-gray-200 focus:border-[#3F72AF] focus:ring[#3F72AF]/10 hover:border-gray-300"
								}`}
								disabled={isLoading}
							/>
							<button
								type="button"
								onClick={() => togglePasswordVisibility("confirmPassword")}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#3F72AF] transition-colors">
								{showPassword.confirmPassword ? (
									<EyeSlashIcon className="w-5 h-5" />
								) : (
									<EyeIcon className="w-5 h-5" />
								)}
							</button>
						</div>
						{password.confirmPassword &&
							password.newPassword !== password.confirmPassword && (
								<p className='"text-red-500 text-sm mt-2 flex items-center gap-1'>
									<ExclamationTriangleIcon className="w-4 h-4" />
									Passwords do not match
								</p>
							)}
					</div>
					{password.newPassword && errors.length > 0 && (
						<div className="mb-6 p-4 bg-gray-50 rounded-xl">
							<p className="text-sm font-medium text-gray-700 mb-2">
								Password must contain:
							</p>
							<ul className="space-y-1">
								{[
									"At least 8 characters",
									"One uppercase letter",
									"One lowercase letter",
									"One number",
									"One special character",
								].map((req) => (
									<li
										key={req}
										className={`text-sx flex items-center gap-2 
                    ${
											!errors.includes(req) ? "text-green-600" : "text-gray-500"
										}`}>
										<CheckCircleIcon
											className={`w-3 h-3 ${
												!errors.includes(req)
													? "text-green-600"
													: "text-gray-400"
											}`}
										/>
										{req}
									</li>
								))}
							</ul>
						</div>
					)}
					<button
						type="submit"
						disabled={
							isLoading ||
							errors.length > 0 ||
							password.newPassword !== password.confirmPassword ||
							!password.newPassword
						}
						className="w-full bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white font-semibold py-4 rounded-xl  hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200
            shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
						{isLoading ? (
							<>
								<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
								Updating Password...
							</>
						) : (
							<>
								<CheckCircleIcon className="w-5 h-5" />
								Update Password
							</>
						)}
					</button>
				</form>
			</div>
		</div>
	)
}
