import Swal from "sweetalert2"

interface SweetAlertOptions {
	title?: string
	text?: string
	icon?: "success" | "error" | "warning" | "info" | "question"
	confirmText?: string
}

export const showSweetAlert = ({
	title = "Success!",
	text = "",
	icon = "success",
	confirmText = "OK",
}: SweetAlertOptions) => {
	return Swal.fire({
		title,
		text,
		icon,
		showConfirmButton: true,
		confirmButtonText: confirmText,
		customClass: {
			popup: "swal2-popup-custom",
			confirmButton: "swal2-confirm-custom",
		},
		didOpen: () => {
			const popup = document.querySelector<HTMLDivElement>(
				".swal2-popup-custom"
			)
			if (popup) {
				popup.style.borderRadius = "2rem"
				popup.style.padding = "2rem"
				popup.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)"
				popup.style.background = "#ffffff"
			}

			const btn = document.querySelector<HTMLButtonElement>(
				".swal2-confirm-custom"
			)
			if (btn) {
				btn.style.background = "linear-gradient(to right, #112D4E, #3F72AF)"
				btn.style.color = "white"
				btn.style.borderRadius = "1rem"
				btn.style.padding = "0.75rem 1.5rem"
				btn.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)"
			}
		},
	})
}
