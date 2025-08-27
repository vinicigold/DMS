interface AddRolePayload {
	code: string
	name: string
	description: string
	isactive: boolean
}

export async function AddRole(payload: AddRolePayload): Promise<boolean> {
	try {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/access-role/add-role`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}`,
			},
			body: JSON.stringify(payload),
			credentials: "include",
		})

		if (!res.ok) {
			const errorText = await res.text()
			console.error("Failed to add role:", errorText)
			return false
		}

		const data = await res.json()
		console.log("Add role successfully", data)
		return true
	} catch (err) {
		console.error("Error adding user", err)
		return false
	}
}
