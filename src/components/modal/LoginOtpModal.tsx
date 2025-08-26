"use client"
import React, { useState, useRef } from "react"
import { CircleCheck, RefreshCw, ShieldCheck, X } from "lucide-react"
import { LoginTwoFA } from "@/service/login/LoginTwoFA"
import { ResetTwoFA } from "@/service/login/ResetTwoFA"

interface LoginOtpModalProps {
	readonly isOpen: boolean
	readonly onClose: () => void
	readonly onSubmit: (otp: string) => void
	readonly username: string
}

export default function LoginOtpModal({
	isOpen,
	onClose,
	onSubmit,
	username,
}: LoginOtpModalProps) {
	const otpFieldIds = ["otp-1", "otp-2", "otp-3", "otp-4", "otp-5", "otp-6"]
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")
	const [resetCooldown, setResetCooldown] = useState(0)
	const otpRefs = useRef<(HTMLInputElement | null)[]>([])

	const startresetCountdown = () => {
		setResetCooldown(30)
		const interval = setInterval(() => {
			setResetCooldown((prev) => {
				if (prev <= 1) {
					clearInterval(interval)
					return 0
				}
				return prev - 1
			})
		}, 1000)
	}

	const allowNum = (e: React.FormEvent<HTMLInputElement>) => {
		e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")
	}

	const handleOtpChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.target.value.length && index < otpFieldIds.length - 1) {
			otpRefs.current[index + 1]?.focus()
		}
	}

	const handleOtpDel = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === "Backspace") {
			if (e.currentTarget.value === "") {
				if (index > 0) {
					otpRefs.current[index - 1]?.focus()
				}
			} else {
				e.currentTarget.value = ""
			}
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const otp = otpRefs.current.map((ref) => ref?.value || "").join("")
		setIsLoading(true)
		setError("")

		const data = await LoginTwoFA({ username, otp })

		if (data) {
			onSubmit(otp)
			console.log(data)
		} else {
			setError("Invalid OTP")
		}

		setIsLoading(false)
	}

	const handleResetOtp = async () => {
		setIsLoading(true)
		const res = await ResetTwoFA({ username })
		if (res?.message) {
			alert(res.message)
			onClose()
		} else {
			setError("Failed to reset 2FA. Try again.")
		}
		startresetCountdown()
		setIsLoading(false)
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3f72AF] rounded-xl flex items-center justify-center">
							<ShieldCheck className="w-5 h-5 text-white" />
						</div>
						<div>
							<h3 className="text-med font-bold text-[#112D4E] ">
								TWO FACTOR AUTHENTICATION
							</h3>
							<p className="text-sm text-gray-500">Please enter 6-digit code</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
						<X className="w-4 h-4 text-gray-600 hover:text-gray-800 transition-colors" />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="p-6">
					<div className="text-center mb-6">
						<p className="text-gray-600 mb-4">
							Enter two factor Authenticator code
						</p>
					</div>
					<div className="flex gap-3 justify-center mb-6">
						{otpFieldIds.map((id, index) => (
							<input
								key={id}
								type="text"
								maxLength={1}
								ref={(el) => {
									otpRefs.current[index] = el
								}}
								onInput={allowNum}
								onChange={(e) => handleOtpChange(e, index)}
								onKeyDown={(e) => handleOtpDel(e, index)}
								className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-200
                            ${
															id
																? "border-[#3F72AF] bg-[##3F72AF]/5"
																: "border-gray-200 hover:border-gray-300"
														}focus:outline-none focus:border-[#3F72AF] focus:ring-4 focus:ring-[#3F72AF]/10`}
								disabled={isLoading}
								required
							/>
						))}
					</div>
					{error && (
						<div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
							<p className="text-red-600 text-sm text-center">{error}</p>
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
								<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
								Verifying...
							</>
						) : (
							<>
								<CircleCheck className="w-5 h-5" />
								Verify OTP
							</>
						)}
					</button>
					<div className="text-center">
						<p>
							<button
								type="button"
								onClick={handleResetOtp}
								disabled={resetCooldown > 0 || isLoading}
								className="text-[#3F72AF] hover:text[#112D4E] font-medium text-sm hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                            flex items-center justify-center gap-1 mx-auto">
								<RefreshCw className="w-4 h-4" />
								{resetCooldown > 0
									? `Reset 2FA (${resetCooldown}s)`
									: "Reset 2FA"}
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}
