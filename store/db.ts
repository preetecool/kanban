import { Task, Subtask, Category, Board } from "~~/types/app.types";
import { useMainStore } from "./main";
export const useDB = defineStore("db", {
	state: () => ({
		test: "test",
		isLoadingData: true
	}),
	actions: {
		registerUser() {
			return "";
		},
		async fetchBoardData(id: Board["id"]) {},
		async fetchTaskById(id: Task["id"]) {
			let store = useMainStore();

			this.isLoadingData = true;
			try {
				let task: Task = await $fetch(`/api/task/${id}/`);
				store.selectedTask = task;
			} catch (err) {
				console.error("Error fetching task by Id", err);
			} finally {
				this.isLoadingData = false;
			}
		},
		async fetchTasksByCategory(id: Category["id"]) {
			const response = await $fetch(`/api/category/${id}/tasks/`);
			return response;
		},
		setSubtasksForTask() {
			let store = useMainStore();

			return store.selectedTask.subtask;
		},
		async createTask(
			taskId: string,
			categoryId: string,
			board: string,
			title: string,
			description: string
		) {
			await $fetch(`/api/task/post/`, {
				method: "POST",
				body: {
					taskId: taskId,
					categoryId: categoryId,
					board: board,
					title: title,
					description: description
				}
			});
		},
		async postSubtask(taskId: string, subtasks: Subtask[]) {
			await $fetch("/api/subtask/post/", {
				method: "POST",
				body: {
					task: taskId,
					subtasks: subtasks
				}
			});
		},

		async updateTask(taskId: string, categoryId: string, subtasks?: Subtask[]) {
			await $fetch(`/api/task/update/${taskId}`, {
				method: "PATCH",
				body: {
					category: categoryId,
					subtasks: subtasks
				}
			});
		},

		async updateSubtask(id: Subtask["id"], isComplete: boolean) {
			let udpatedTask: Subtask = await $fetch(`/api/subtask/update/${id}/`, {
				method: "PATCH",
				body: {
					completed: isComplete
				}
			});
		}
	}
});
