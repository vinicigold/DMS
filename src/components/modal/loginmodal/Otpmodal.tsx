"use client"
import React, { useState, useRef, useEffect } from "react"
import { showSweetAlert } from "@/utilities/sweetAlert"
import { CircleCheck, RefreshCw, ShieldCheck } from "lucide-react"
import { VerifyOtp } from "@/service/login/VerifyOtp"
import { ResendTwoFA } from "@/service/login/ResendOtp"

interface OtpModalProps {
	readonly isOpen: boolean
	readonly onSubmit: (otp: string) => void
	readonly isForReset?: boolean
	readonly username: string
	readonly email: string
}

export default function OtpModal({
	isOpen,
	onSubmit,
	isForReset = false,
	username,
	email,
}: OtpModalProps) {
	const otpFieldIds = ["otp-1", "otp-2", "otp-3", "otp-4", "otp-5", "otp-6"]
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")
	const [resendCooldown, setResendCooldown] = useState(0)
	const otpRefs = useRef<(HTMLInputElement | null)[]>([])
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	const startResendCountdown = () => {
		// clear any existing interval first
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
		}

		setResendCooldown(10)
		intervalRef.current = setInterval(() => {
			setResendCooldown((prev) => {
				if (prev <= 1) {
					if (intervalRef.current) clearInterval(intervalRef.current)
					return 0
				}
				return prev - 1 // always decrement by 1
			})
		}, 1000)
	}

	useEffect(() => {
		if (isOpen) {
			startResendCountdown()
		} else {
			setResendCooldown(0) // reset when modal closes
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [isOpen])

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

		const data = await VerifyOtp({ username, otp })

		if (data) {
			onSubmit(data.qrCode)
			console.log("before qr:", data.qrCode)
		} else {
			setError("Invalid OTP")
		}

		setIsLoading(false)
	}

	const handleResendOtp = async () => {
		if (resendCooldown > 0) return
		setIsLoading(true)

		const res = await ResendTwoFA({ username })
		if (res?.message) {
			showSweetAlert({
				title: "Resend OTP.",
				text: "Success!",
				icon: "success",
				confirmText: "Continue",
			})
		} else {
			setError("Failed to resend 2FA. Try again.")
		}
		startResendCountdown()
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
							<h3 className="text-xl font-bold text-[#112D4E] ">
								OTP VERIFICATION
							</h3>
							<p className="text-sm text-gray-500">
								{isForReset
									? "Enter the OTP sent to your email to reset your password."
									: "Enter the OTP sent to your email."}
							</p>
						</div>
					</div>
				</div>
				<form onSubmit={handleSubmit} className="p-6">
					<div className="text-center mb-6">
						<p className="text-gray-600 mb-4">
							We sent enter 6-digit code to your email.
						</p>

						<p className="text-gray-600 mb-4">{email}</p>
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
								onClick={handleResendOtp}
								disabled={resendCooldown > 0 || isLoading}
								className="text-[#3F72AF] hover:text[#112D4E] font-medium text-sm hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                            flex items-center justify-center gap-1 mx-auto">
								<RefreshCw className="w-4 h-4" />
								{resendCooldown > 0
									? `Resend OTP (${resendCooldown}s)`
									: "Resend OTP"}
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}
