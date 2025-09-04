"use client"
import React from "react"
import { X, UserRoundCog, Save } from "lucide-react"
import { useModalStore } from "@/service/modal/useModalStore"
import { useSystemConfigStore } from "@/service/apireference/systemconfig/useSystemConfigStore"

export default function EditSysConfigModal() {
	const { editConfig } = useSystemConfigStore()
	const { currentModal, closeModal } = useModalStore()
	if (currentModal !== "editSysConfig") return null
	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-hidden overscroll-contain">
			<div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto hide-scrollbar">
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-xl flex items-center justify-center">
							<UserRoundCog className="w-5 h-5 text-white" />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#112D4E]">
								Edit System Configuration
							</h3>
							<p className="text-sm text-gray-500">
								Edit a system configuration
							</p>
						</div>
					</div>
					<button
						onClick={closeModal}
						className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
						<X className="w-4 h-4 text-gray-600" />
					</button>
				</div>
				<form className="p-6">
					<div className="space-y-4">
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
									name="appId"
									defaultValue={modalData.appId}
									readOnly
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
									className="w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3F72AF] text-[#112D4E] bg-white transition-all duration-200">
									<option value="true">Active</option>
									<option value="false">Inactive</option>
								</select>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
