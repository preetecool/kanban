import { Task } from "~~/types/app.types";
export const useDB = defineStore("db", {
	state: () => ({
		test: "test",
		selectedTask: [{}]
	}),
	actions: {
		registerUser() {
			return "";
		},
		async getTaskById(id?: string) {
			let task: Task[] = await $fetch(`/api/tasks/${id}`);
			this.selectedTask = task;
		}
	}
});
