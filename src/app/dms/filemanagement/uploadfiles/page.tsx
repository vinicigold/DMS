"use client"
import React, { useState } from "react"

export default function BatchFileUploadForm() {
	const [files, setFiles] = useState<File[]>([])
	const [message, setMessage] = useState("")

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFiles(Array.from(e.target.files))
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (files.length === 0) {
			setMessage("Please select at least one file.")
			return
		}

		const formData = new FormData()
		// Append all files with the key expected by your backend
		files.forEach((file) => formData.append("documents", file))

		const response = await fetch(
			"http://10.200.54.224:4000/dms/file-upload/batch-upload",
			{
				method: "POST",
				body: formData,
			}
		)
		const data = await response.json()
		if (response.ok) {
			setMessage("Files uploaded successfully!")
			setFiles([])
		} else {
			setMessage(`Failed to upload files: ${data.message}`)
		}
		console.log("testing", data)
	}

	return (
		<div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
			<h2 className="text-xl font-semibold mb-4">Upload File</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="file"
					multiple
					onChange={handleFileChange}
					className="border p-2 rounded"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
					Upload
				</button>
			</form>

			{files.length > 0 && (
				<ul className="mt-4 list-disc list-inside">
					{files.map((file, idx) => (
						<li key={idx}>{file.name}</li>
					))}
				</ul>
			)}

			{message && <p className="mt-4 text-center">{message}</p>}
		</div>
	)
}
