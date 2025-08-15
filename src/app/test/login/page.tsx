"use client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface LoginPayload {
	UserName: string
	UserPassword: string
}

export default function TestLog() {
	const router = useRouter()

	const [signIn, setSignIn] = useState<LoginPayload>({
		UserName: "",
		UserPassword: "",
	})
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setSignIn((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		console.log(signIn)

		try {
			const res = await fetch("http://10.200.54.224:4000/dms/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(signIn),
				credentials: "include", // important for cookies
			})

			if (!res.ok) {
				console.error("Failed to login")
				return
			}

			console.log(signIn)

			console.log("Login Successful")
			router.push("/test/dash")
		} catch (err) {
			console.error("Error logging in", err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label
					htmlFor="username"
					className="block text-[#112D4E] font-semibold mb-2 text-sm">
					Username
				</label>
				<div className="relative">
					<input
						type="text"
						id="UserName"
						name="UserName"
						value={signIn.UserName}
						onChange={handleChange}
						placeholder="Enter your username"
						required
						className="w-full pl-12 pr-4 py-4 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E]
                  bg-white transition-all duration-200 hover:border-[#cbd5e1]"
					/>
				</div>
				<label
					htmlFor="password"
					className="block text-[#112D4E] font-semibold mb-2 text-sm">
					Password
				</label>
				<div className="relative">
					<input
						type="password"
						id="UserPassword"
						name="UserPassword"
						value={signIn.UserPassword}
						onChange={handleChange}
						placeholder="Enter your password"
						required
						className="w-full pl-12 pr-4 py-4 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E]
                  bg-white transition-all duration-200 hover:border-[#cbd5e1]"
					/>
				</div>
				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white font-semibold py-4 rounded-xl hover:from-[#163b65] hover:to-[#4a7bc8] transition-all 
                        duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
					{isLoading ? "Logging in..." : "Submit"}
				</button>
			</form>
		</div>
	)
}
