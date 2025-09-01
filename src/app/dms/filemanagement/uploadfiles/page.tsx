"use client"
import { useState } from "react"
import { Upload, File, X } from "lucide-react"

export default function FileUpload() {
	const [file, setFile] = useState<File | null>(null)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0])
		}
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			setFile(e.dataTransfer.files[0])
		}
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				className="w-96 p-6 border-2 border-dashed border-gray-300 rounded-2xl bg-white shadow-sm hover:border-blue-400 transition-colors">
				{!file ? (
					<div className="flex flex-col items-center space-y-4">
						<Upload className="w-10 h-10 text-gray-400" />
						<p className="text-gray-600 text-center">
							Drag & drop your file here, or{" "}
							<label className="text-blue-500 cursor-pointer font-medium">
								browse
								<input
									type="file"
									className="hidden"
									onChange={handleFileChange}
								/>
							</label>
						</p>
					</div>
				) : (
					<div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg">
						<div className="flex items-center gap-2">
							<File className="w-6 h-6 text-gray-600" />
							<span className="text-gray-700 text-sm">{file.name}</span>
						</div>
						<button
							onClick={() => setFile(null)}
							className="text-gray-500 hover:text-red-500">
							<X className="w-5 h-5" />
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
