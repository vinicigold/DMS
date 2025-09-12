interface AddRolePayload {
	code: string
	name: string
	description: string
	isactive: boolean
}

interface AddRoleResponse {
	roleid: number
	code: string
	accessname: string
	description: string
	status: boolean
	message: string
}

export async function AddRole(
	payload: AddRolePayload
): Promise<AddRoleResponse> {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/access-role/add-role`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
			credentials: "include",
		})

		if (!res.ok) {
			const errorText = await res.text()
			console.error("Failed to add role:", errorText)
			throw new Error(`Failed to edit role: ${errorText}`)
		}

		const data: AddRoleResponse = await res.json()
		return data
	} catch (err) {
		console.error("Error adding user", err)
		throw err
	}
}
