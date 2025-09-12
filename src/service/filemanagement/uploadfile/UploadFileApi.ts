interface UploadResult {
	file: string
	size: number
	valid: boolean
	reason?: string
}

interface UploadResponse {
	responseCode: number
	message: string
	results: UploadResult[]
}

export async function UploadFileApi(
	file: File[],
	doctypeId: string
): Promise<UploadResponse> {
	const formData = new FormData()
	file.forEach((file) => formData.append("files", file))
	formData.append("doctypeid", doctypeId)

	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/api/web-upload`, {
			method: "POST",
			body: formData,
			credentials: "include",
		})

		if (!res.ok) {
			throw new Error(`Upload failed with status ${res.status}`)
		}

		const data = await res.json()

		return {
			responseCode: data.responseCode,
			message: data.message,
			results: data.results ?? [],
		}
	} catch (error) {
		console.error("Upload error:", error)
		return {
			responseCode: 500,
			message: "Upload failed",
			results: [],
		}
	}
}
