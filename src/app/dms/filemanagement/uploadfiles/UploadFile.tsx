"use client"
import React, { useRef } from "react"
import { CloudUpload, X, File } from "lucide-react"
import { useUploadStore } from "@/service/filemanagement/uploadfile/useUploadStore"

export default function UploadFile() {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const { files, addFiles, removeFile, resetFiles, uploadFile } =
		useUploadStore()

	return (
		<div className="space-y-6">
			<div className="bg-white text-[#112D4E] p-3 rounded-lg shadow-md">
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<h3 className="text-lg font-bold mb-4">Upload Files</h3>
						<label
							htmlFor="fileInput"
							onDragOver={(e) => e.preventDefault()}
							onDrop={(e) => {
								e.preventDefault()
								if (e.dataTransfer.files.length > 0) {
									addFiles(e.dataTransfer.files)
									e.dataTransfer.clearData()
								}
							}}
							className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 transition-colors">
							<CloudUpload className="w-8 h-8 text-blue-400 mb-2" />
							<p className="text-gray-500">Drag files to upload or</p>
							<span className="mt-2 px-4 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
								Browse File
							</span>
							<input
								id="fileInput"
								type="file"
								multiple
								ref={fileInputRef}
								onChange={(e) => e.target.files && addFiles(e.target.files)}
								className="hidden"
							/>
						</label>
						<div className="flex gap-3 mt-4">
							<button
								type="button"
								className="flex-1 py-2 px-4 bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white font-semibold rounded-lg shadow-md hover:from-[#163b65] hover:to-[#4a7bc8] transition-all"
								onClick={() =>
									files.forEach((f) => f.status === "pending" && uploadFile(f))
								}>
								Start Upload
							</button>
							<button
								type="button"
								className="flex-1 py-2 px-4 bg-gray-200 text-[#112D4E] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all"
								onClick={resetFiles}>
								Reset
							</button>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div className="flex flex-col text-gray-700 text-medium">
							<p className="mb-2 font-semibold text-center">
								Upload File Instruction.
							</p>
							<ol className="list-decimal list-inside text-sm space-y-1">
								<li>Click browse file</li>
								<li>Select file and click open or;</li>
								<li>Drag and drop files</li>
								<li>Click Start upload to initiate upload</li>
								<li>Click reset to clear list of file</li>
							</ol>
						</div>
						<div className="flex flex-col text-gray-700 text-medium">
							<p className="mb-2 font-semibold text-center">File Validation.</p>
							<ul className="list-disc list-inside text-sm space-y-1">
								<li>PDF (pdf)</li>
								<li>Images (jpg, jpeg, png)</li>
								<li>Filename format: 12_088_MAG01_1234567890</li>
								<li>Max file size: 256MB</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white text-[#112D4E] p-6 rounded-lg shadow-md">
				<h3 className="text-lg font-bold mb-4">List of Files</h3>
				<div className="max-h-60 overflow-y-auto">
					{files.length === 0 ? (
						<p className="text-gray-400 text-sm text-center">No files yet</p>
					) : (
						<div className="space-y-3">
							{files.map((file) => (
								<div
									key={`${file.file.name}-${file.file.size}`}
									className="flex items-center justify-between space-x-3">
									<div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 shadow-sm bg-white min-h-[64px] w-[500px]">
										<div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
											<File className="w-5 h-5 text-gray-600" />
										</div>
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<p
													className={`text-sm font-medium truncate ${
														file.status === "success"
															? "text-green-600"
															: file.status === "error"
															? "text-red-600"
															: "text-gray-700"
													}`}>
													{file.file.name}
												</p>
												<span className="text-xs text-gray-500">
													{(file.file.size / 1024 / 1024).toFixed(2)} MB
												</span>
											</div>

											{/* Progress Bar */}
											<div className="w-full h-2 mt-2 rounded-full bg-gray-200 overflow-hidden">
												<div
													className={`h-full rounded-full transition-all duration-300 ${
														file.valid ? "bg-green-500" : "bg-red-500"
													}`}
													style={{ width: `${file.progress}%` }}
												/>
											</div>
										</div>

										{/* Status Badge */}
										<div>
											{file.progress < 100 ? (
												<span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 animate-pulse">
													Waiting
												</span>
											) : file.valid ? (
												<span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
													Done
												</span>
											) : (
												<span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
													{file.reason}
												</span>
											)}
										</div>
									</div>

									<div className="flex items-center gap-2">
										{file.status === "pending" && (
											<button
												onClick={() => uploadFile(file)}
												className="text-blue-600 hover:underline text-sm">
												Upload
											</button>
										)}
										<button
											onClick={() => removeFile(file)}
											className="text-gray-400 hover:text-gray-600">
											<X className="w-4 h-4" />
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
