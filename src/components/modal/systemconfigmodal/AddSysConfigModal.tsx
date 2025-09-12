"use client"
import React, { useState } from "react"
import { Server, X, CirclePlus } from "lucide-react"
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
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
		<div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overscroll-contain bg-black/50 p-4 backdrop-blur-sm">
			<div className="hide-scrollbar max-h-[90vh] w-full max-w-lg scale-100 transform overflow-y-auto rounded-3xl bg-white shadow-2xl transition-all duration-300">
				<div className="flex items-center justify-between border-b border-gray-100 p-6">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#112D4E] to-[#3F72AF]">
							<Server className="h-5 w-5 text-white" />
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
						className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200">
						<X className="h-4 w-4 text-gray-600" />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="p-6">
					<div className="space-y-4">
						<div>
							<label
								htmlFor="appId"
								className="mb-2 block text-sm font-semibold text-[#112D4E]">
								Application ID *
							</label>
							<input
								type="number"
								id="appId"
								value={form.appId}
								onChange={handleChange}
								name="appId"
								required
								className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] uppercase transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
							/>
						</div>
						<div>
							<label
								htmlFor="systemName"
								className="mb-2 block text-sm font-semibold text-[#112D4E]">
								System Name *
							</label>
							<input
								type="text"
								id="systemName"
								name="systemName"
								value={form.systemName}
								onChange={handleChange}
								required
								className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] uppercase transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
							/>
						</div>
						<div>
							<label
								htmlFor="ipAddress"
								className="mb-2 block text-sm font-semibold text-[#112D4E]">
								Ip Address *
							</label>
							<input
								type="text"
								id="ipAddress"
								value={form.ipAddress}
								onChange={handleChange}
								name="ipAddress"
								required
								className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] uppercase transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
							/>
						</div>
						<div>
							<label
								htmlFor="drive"
								className="mb-2 block text-sm font-semibold text-[#112D4E]">
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
								className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] uppercase transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
							/>
						</div>
						<div>
							<label
								htmlFor="path"
								className="mb-2 block text-sm font-semibold text-[#112D4E]">
								Path *
							</label>
							<input
								type="text"
								id="path"
								name="path"
								value={form.path}
								onChange={handleChange}
								required
								className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[#112D4E] uppercase transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none"
							/>
						</div>
						<div>
							<label
								htmlFor="status"
								className="mb-2 block text-sm font-semibold text-[#112D4E]">
								System Configuration Status*
							</label>
							<select
								id="status"
								name="status"
								value={form.status}
								onChange={handleChange}
								className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-[#112D4E] transition-all duration-200 focus:ring-2 focus:ring-[#3F72AF] focus:outline-none">
								<option value="true">Active</option>
								<option value="false">Inactive</option>
							</select>
						</div>
					</div>
					<div className="mt-6 flex gap-4">
						<button
							type="submit"
							disabled={loading}
							className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#112D4E] to-[#3F72AF] px-6 py-3 text-white transition-all duration-200 hover:from-[#163b65] hover:to-[#4a7bc8] disabled:cursor-not-allowed disabled:opacity-50">
							{loading ? (
								<>
									<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
									Creating System Config...
								</>
							) : (
								<>
									<CirclePlus className="h-5 w-5" />
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
