"use client"
import React, { useState } from "react"

interface StaffInfoPayload {
	firstname: string
	middlename?: string
	lastname: string
	email: string
	mobilenumber: string
	dateofbirth: string
}

const initialFormData = {
	staffID: "",
	firstName: "",
	middleName: "",
	lastName: "",
	email: "",
	mobileNumber: "",
	birthdate: "",
	employeeStatusId: "",
	userRole: "",
	userStatus: "",
}

export default function TestDash() {
	const [formData, setFormData] = useState(initialFormData)
	const [isLoading, setIsLoading] = useState(false)
	const [isSearching, setIsSearching] = useState(false)
	const [staffInfo, setStaffInfo] = useState<StaffInfoPayload | null>(null)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSearching(true)

		console.log("Searching for staff ID:", formData.staffID)

		try {
			const res = await fetch("/api/dms/useraccount/getuserinfo", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ staffId: formData.staffID }),
				credentials: "include",
			})

			if (!res.ok) {
				console.error("Failed to fetch staff info")
				return
			}

			const data: StaffInfoPayload = await res.json()
			setStaffInfo(data)

			// Autofill form
			setFormData((prev) => ({
				...prev,
				firstName: data.firstname,
				middleName: data.middlename || "",
				lastName: data.lastname,
				email: data.email,
				mobileNumber: data.mobilenumber,
				birthdate: data.dateofbirth,
			}))

			console.log("Search Successful", data)
		} catch (err) {
			console.error("Error fetching staff info", err)
		} finally {
			setIsSearching(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
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

			console.log("Submitting user:", userPayload)

			const res = await fetch("/api/dms/useraccount/registeruser", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userPayload),
				credentials: "include",
			})

			if (!res.ok) {
				console.error("Failed to register user")
				return
			}

			console.log("User registered successfully")
			setFormData(initialFormData)
		} catch (err) {
			console.error("Error registering user", err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="p-6">
				{/* Staff ID & Search */}
				<div>
					<label>Staff ID *</label>
					<div className="flex gap-2">
						<input
							type="text"
							name="staffID"
							value={formData.staffID}
							onChange={handleChange}
							required
						/>
						<button type="button" onClick={handleSearch} disabled={isSearching}>
							Search
						</button>
					</div>
				</div>

				{/* Autofilled Fields */}
				<div>
					<p>First Name: {formData.firstName}</p>
					<p>Middle Name: {formData.middleName}</p>
					<p>Last Name: {formData.lastName}</p>
					<p>Email: {formData.email}</p>
					<p>Mobile Number: {formData.mobileNumber}</p>
					<p>Birthdate: {formData.birthdate}</p>
				</div>

				{/* Submit */}
				<div>
					<button type="submit" disabled={isLoading}>
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}
