import { Modal, Task } from "~~/types/app.types";
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
			],
			selectedTask: [{}],
			isLoadingData: true
		};
	},
	actions: {
		toggleModal(board: keyof Modal, taskId?: string) {
			if (board === "closeModal") {
				return this.closeModal();
			}
			if (board === "editTask") {
				this.getTaskById(taskId);
				// console.log(taskId);
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
		},
		async getTaskById(id?: string) {
			this.isLoadingData = true;
			try {
				let task: Task[] = await $fetch(`/api/task/${id}`);

				this.selectedTask = task;
			} catch (err) {
				console.error("Error fetching task by Id", err);
			} finally {
				this.isLoadingData = false;
			}
		}
	}
});
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
