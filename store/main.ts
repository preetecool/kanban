import { Modal } from "~~/types/app.types";
import { useDB } from "./db";
export const useMainStore = defineStore("main", {
	state: () => {
		return {
			modal: {
				newBoard: false,
				editBoard: false,
				newTask: false,
				editTask: false,
				closeModal: false
			},
			activeBoard: [{}],
			items: [
				{
					title: "",
					id: 0
				}
			]
		};
	},
	actions: {
		toggleModal(board: keyof Modal, taskId?: string) {
			if (board === "closeModal") {
				return this.closeModal();
			}
			if (board === "editTask") {
				useDB().getTaskById(taskId);
			}
			this.modal[board] = !this.modal[board];
		},
		closeModal() {
			for (let key in this.modal) {
				if (this.modal[key as keyof Modal] === true) {
					this.modal[key as keyof Modal] = false;
					break;
				}
			}
			this.modal["closeModal"] = false;
		}
	}
});
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
