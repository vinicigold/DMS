export interface AccessObject {
	accessObjectId: number
	parentId: number | null
	parentName: string
	objectType: string
	objectName: string
	objectDescription: string
	status: boolean
}

export interface AccessObjectResponse {
	responseCode: number
	message: string
	results: {
		page: number
		limit: number
		total: number
		totalpages: number
		data: AccessObject[]
	}
}

export interface ParentObject {
	accessObjectId: number
	parentName: string
}

export interface ParentObjectResponse {
	responseCode: number
	message: string
	results: ParentObject[]
}

export interface AddAccessObjectPayload {
	parentId: number | null
	parentName: string
	objectType: string
	objectName: string
	objectDescription: string
	status: boolean
}

export interface AddAccessObjectReponse {
	responseCode: number
	message: string
	results: AccessObject
}

export interface EditAccessObjectPayload {
	accessObjectId: number
	parentId: number | null
	parentName: string
	objectType: string
	objectName: string
	objectDescription: string
	status: boolean
}

export interface EditAccessObjectResponse {
	responseCode: number
	message: string
	results: AccessObject
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export async function fetchAccessObjects(
	page: number,
	limit: number,
): Promise<AccessObjectResponse> {
	const res = await fetch(
		`${API_BASE}/dms/api/access-object/all-access-objects?page=${page}&limit=${limit}`,
		{
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		},
	)
	if (!res.ok) {
		throw new Error("Failed to fetch access objects")
	}

	return res.json()
}

export async function fetchParentObjects(): Promise<ParentObjectResponse> {
	const res = await fetch(`${API_BASE}/dms/api/access-object/parents`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	})
	if (!res.ok) {
		throw new Error("Failed to fetch parent objects")
	}

	return res.json()
}

export async function addAccessObject(
	payload: AddAccessObjectPayload,
): Promise<AddAccessObjectReponse> {
	const res = await fetch(`${API_BASE}/dms/api/access-object/add`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		credentials: "include",
	})
	if (!res.ok) {
		throw new Error("Failed to add object")
	}

	return res.json()
}

export async function editAccessObject(
	payload: EditAccessObjectPayload,
): Promise<EditAccessObjectResponse> {
	const res = await fetch(`${API_BASE}/dms/api/access-object/update-ao`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		credentials: "include",
	})
	if (!res.ok) {
		throw new Error("Failed to update access object")
	}

	return res.json()
}
