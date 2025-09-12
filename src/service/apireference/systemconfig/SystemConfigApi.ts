export interface SystemConfig {
	systemconfigid: number
	appId: number
	systemName: string
	ipAddress: string
	drive: string
	path: string
	status: boolean
}

export interface SystemConfigResponse {
	responseCode: number
	message: string
	results: {
		page: number
		limit: number
		total: number
		totalpages: number
		data: SystemConfig[]
	}
}

export interface AddSystemConfigPayload {
	appId: number
	systemName: string
	ipAddress: string
	drive: string
	path: string
	status: boolean
}

export interface AddSystemConfigResponse {
	responseCode: number
	message: string
	results: SystemConfig
}

export interface EditSystemConfigPayload {
	systemconfigid: number
	appId: number
	systemName: string
	ipAddress: string
	drive: string
	path: string
	status: boolean
}

export interface EditSystemConfigResponse {
	responseCode: number
	message: string
	results: SystemConfig
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export async function fetchSystemConfigs(
	page: number,
	limit: number,
): Promise<SystemConfigResponse> {
	const res = await fetch(
		`${API_BASE}/dms/systemconfig/listall-sysconfig?page=${page}&limit=${limit}`,
		{
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch system configs")
	}

	return res.json()
}

export async function addSystemConfig(
	payload: AddSystemConfigPayload,
): Promise<AddSystemConfigResponse> {
	const res = await fetch(`${API_BASE}/dms/systemconfig/create-sysconfig`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		credentials: "include",
	})

	if (!res.ok) {
		throw new Error("Failed to add system config")
	}

	return res.json()
}

export async function editSystemConfig(
	payload: EditSystemConfigPayload,
): Promise<EditSystemConfigResponse> {
	const res = await fetch(`${API_BASE}/dms/systemconfig/update-sysconfig`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		credentials: "include",
	})

	if (!res.ok) {
		throw new Error("Failed to update system config")
	}

	return res.json()
}
