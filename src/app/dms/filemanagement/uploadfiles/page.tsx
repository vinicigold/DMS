import UploadFile from "./UploadFile"

export default function Document() {
	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<div className="mb-6">
				<h1 className="text-xl font-bold text-[#112D4E] underline">
					INAI File Management
				</h1>
				<p className="text-sm text-gray-600">Upload File</p>
			</div>
			<UploadFile />
		</div>
	)
}
