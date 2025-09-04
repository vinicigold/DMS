"use client"
import React, { useState } from "react"
import { File, X, CirclePlus } from "lucide-react"
import { useModalStore } from "@/service/modal/useModalStore"
import { useSystemConfigStore } from "@/service/apireference/systemconfig/useSystemConfigStore"

export default function AddSysConfigModal() {
	const { currentModal, closeModal } = useModalStore()
	const { addConfig, loading } = useSystemConfigStore()

	const [form, setForm] = useState({
		appId: "",
		systemName: "",
		ipAddress: "",
		drive: "",
		path: "",
		status: "true",
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setForm((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		await addConfig({
			appId: Number(form.appId),
			systemName: form.systemName,
			ipAddress: form.ipAddress,
			drive: form.drive,
			path: form.path,
			status: form.status === "true",
		})

		closeModal()
	}

	if (currentModal !== "addSysConfig") return null
	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-hidden overscroll-contain">
			<div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto hide-scrollbar">
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-xl flex items-center justify-center">
							<File className="w-5 h-5 text-white" />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#112D4E]">
								New System Configuration
							</h3>
							<p className="text-sm text-gray-500">
								Ceate a new system configuration
							</p>
						</div>
					</div>
					<button
						onClick={closeModal}
						className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
						<X className="w-4 h-4 text-gray-600" />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="p-6">
					<div className="space-y-4">
						<div>
							<label
								htmlFor="appId"
								className="block text-[#112D4E] font-semibold mb-2 text-sm">
								Application ID *
							</label>
							<input
								type="number"
								id="appId"
								value={form.appId}
								onChange={handleChange}
								name="appId"
								required
								className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200 uppercase"
							/>
						</div>
						<div>
							<label
								htmlFor="systemName"
								className="block text-[#112D4E] font-semibold mb-2 text-sm">
								System Name *
							</label>
							<input
								type="text"
								id="systemName"
								name="systemName"
								value={form.systemName}
								onChange={handleChange}
								required
								className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200 uppercase"
							/>
						</div>
						<div>
							<label
								htmlFor="ipAddress"
								className="block text-[#112D4E] font-semibold mb-2 text-sm">
								Ip Address *
							</label>
							<input
								type="text"
								id="ipAddress"
								value={form.ipAddress}
								onChange={handleChange}
								name="ipAddress"
								required
								className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200 uppercase"
							/>
						</div>
						<div>
							<label
								htmlFor="drive"
								className="block text-[#112D4E] font-semibold mb-2 text-sm">
								Drive *
							</label>
							<input
								type="text"
								id="drive"
								value={form.drive}
								onChange={handleChange}
								maxLength={2}
								name="drive"
								required
								className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200 uppercase"
							/>
						</div>
						<div>
							<label
								htmlFor="path"
								className="block text-[#112D4E] font-semibold mb-2 text-sm">
								Path *
							</label>
							<input
								type="text"
								id="path"
								name="path"
								value={form.path}
								onChange={handleChange}
								required
								className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200 uppercase"
							/>
						</div>
						<div>
							<label
								htmlFor="status"
								className="block text-[#112D4E] font-semibold mb-2 text-sm">
								System Configuration Status*
							</label>
							<select
								id="status"
								name="status"
								value={form.status}
								onChange={handleChange}
								className="w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200">
								<option value="true">Active</option>
								<option value="false">Inactive</option>
							</select>
						</div>
					</div>
					<div className="flex gap-4 mt-6">
						<button
							type="submit"
							disabled={loading}
							className="flex-1 bg-gradient-to-r from-[#112D4E] to-[#3F72AF] text-white px-6 py-3 rounded-xl hover:from-[#163b65] hover:to-[#4a7bc8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
							{loading ? (
								<>
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									Creating System Config...
								</>
							) : (
								<>
									<CirclePlus className="w-5 h-5" />
									Create System Configuration
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
