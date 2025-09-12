export interface EmployeeStatus {
	EmployeeStatusID: number
	Code: string
	Name: string
	Description: string
	IsActive: boolean
}

export async function EmployeeStatus(): Promise<EmployeeStatus[]> {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/usersaccount/employee-status`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			cache: "no-cache",
		})

		if (!res.ok) throw new Error("failed to fetch user account status")

		const data: EmployeeStatus[] = await res.json()
		return data
	} catch (error) {
		console.error("error fetching user account status", error)
		return []
	}
}
