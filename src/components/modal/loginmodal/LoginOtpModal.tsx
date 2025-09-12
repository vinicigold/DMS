"use client"
import React, { useState, useRef } from "react"
import { showSweetAlert } from "@/utilities/sweetAlert"
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
		index: number,
	) => {
		if (e.target.value.length && index < otpFieldIds.length - 1) {
			otpRefs.current[index + 1]?.focus()
		}
	}

	const handleOtpDel = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number,
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
			showSweetAlert({
				title: "2FA verified!",
				text: "Success!.",
				icon: "success",
				confirmText: "Continue",
			}).then(() => {
				onSubmit(otp)
			})
			console.log("HELLO TESTING", data)
		} else {
			setError("Invalid OTP")
		}

		setIsLoading(false)
	}

	const handleResetOtp = async () => {
		setIsLoading(true)
		const res = await ResetTwoFA({ username })
		if (res?.message) {
			showSweetAlert({
				title: "Reset 2FA.",
				text: "Success!",
				icon: "success",
				confirmText: "Continue",
			}).then(() => {
				onClose()
			})
		} else {
			setError("Failed to reset 2FA. Try again.")
		}
		startresetCountdown()
		setIsLoading(false)
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="w-full max-w-md scale-100 transform rounded-3xl bg-white shadow-2xl transition-all duration-300">
				<div className="flex items-center justify-between border-b border-gray-100 p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#112D4E] to-[#3f72AF]">
							<ShieldCheck className="h-5 w-5 text-white" />
						</div>
						<div>
							<h3 className="text-med font-bold text-[#112D4E]">
								TWO FACTOR AUTHENTICATION
							</h3>
							<p className="text-sm text-gray-500">Please enter 6-digit code</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200">
						<X className="h-4 w-4 text-gray-600 transition-colors hover:text-gray-800" />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="p-6">
					<div className="mb-6 text-center">
						<p className="mb-4 text-gray-600">
							Enter two factor Authenticator code
						</p>
					</div>
					<div className="mb-6 flex justify-center gap-3">
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
								className={`h-12 w-12 rounded-xl border-2 text-center text-xl font-bold transition-all duration-200 ${
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
						<div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3">
							<p className="text-center text-sm text-red-600">{error}</p>
						</div>
					)}
					<button
						type="submit"
						disabled={isLoading}
						className="mb-4 flex w-full transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#112D4E] to-[#3F72AF] py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-[#163B65] hover:to-[#4A7BC8] hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50">
						{isLoading ? (
							<>
								<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
								Verifying...
							</>
						) : (
							<>
								<CircleCheck className="h-5 w-5" />
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
								className="hover:text[#112D4E] mx-auto flex items-center justify-center gap-1 text-sm font-medium text-[#3F72AF] transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-50">
								<RefreshCw className="h-4 w-4" />
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
