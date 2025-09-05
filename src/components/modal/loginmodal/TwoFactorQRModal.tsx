"use client"
import type React from "react"
import { showSweetAlert } from "@/utilities/sweetAlert"
import { useState, useRef } from "react"
import { CircleCheck, QrCode } from "lucide-react"
import Image from "next/image"
import { VerifyRegisterOtp } from "@/service/login/VerifyRegisterOtp"

interface OtpQRModalProps {
	readonly isOpen: boolean
	readonly onSubmit: (otp: string) => void
	readonly qrCode: string | null
	readonly username: string
}

export default function TwoFactorQRModal({
	isOpen,
	onSubmit,
	qrCode,
	username,
}: OtpQRModalProps) {
	const otpFieldIds = ["otp-1", "otp-2", "otp-3", "otp-4", "otp-5", "otp-6"]
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")
	const otpRefs = useRef<(HTMLInputElement | null)[]>([])

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

		const data = await VerifyRegisterOtp({ username, otp })
		if (data) {
			showSweetAlert({
				title: "Success!",
				text: "2FA registered.",
				icon: "success",
				confirmText: "Continue",
			}).then(() => {
				onSubmit(data.message)
			})
			console.log("Register QR", data)
		} else {
			setError("Invalid OTP")
		}
		setIsLoading(false)
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3f72AF] rounded-xl flex items-center justify-center">
							<QrCode className="w-5 h-5 text-white" />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#112D4E] ">
								TWO FACTOR REGISTRATION
							</h3>
							<p className="text-sm text-gray-500">Open Authenticator App</p>
						</div>
					</div>
				</div>
				<form onSubmit={handleSubmit} className="p-6">
					<div className="text-center mb-6">
						<div className="relative w-48 h-48 mx-auto mb-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
							{qrCode ? (
								<Image
									src={qrCode}
									alt="QR Code"
									fill
									className="object-contain w-full h-full"
								/>
							) : (
								<span className="text-gray-400 text-sm">Loading QR...</span>
							)}
						</div>
						<p className="text-gray-600 mb-4">Scan QR and enter the code</p>
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
				</form>
			</div>
		</div>
	)
}
