interface RegisterUserPayload {
	staffID: string
	firstname: string
	middlename: string
	lastname: string
	email: string
	mobilenumber: string
	dateofbirth: string
	employeeStatusId: number
	roleId: number
	accountStatusId: number
}

export async function RegisterUser(
	register: RegisterUserPayload
): Promise<boolean> {
	try {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/usersaccount/add-user`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}`,
			},
			body: JSON.stringify(register),
			credentials: "include",
		})

		if (!res.ok) {
			console.error("Failed to register user")
			return false
		}

		console.log("User registered successfully")
		return true
	} catch (err) {
		console.error("Error registering user", err)
		return false
	}
}
