interface EditRolePayload {
	roleid: number
	accessname: string
	description: string
	status: boolean
}

interface EditRoleResponse {
	responseCode: number
	message: string
	results: {
		RoleID: number
		Code: string
		Name: string
		Description: string
		IsActive: boolean
		CreatedAt: string
		CreatedByID: number
		ModifiedAt: string
		ModifiedByID: number
		CreatedBy: string | null
		ModifiedBy: string | null
	}
}

export async function EditRole(
	payload: EditRolePayload
): Promise<EditRoleResponse> {
	try {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/access-role/update-role`, {
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
			console.error("Failed to edit role:", errorText)
			throw new Error(`Failed to edit role: ${errorText}`)
		}

		const data: EditRoleResponse = await res.json()
		console.log("Add role successfully", data)
		return data
	} catch (err) {
		console.error("Error adding user", err)
		throw err
	}
}
