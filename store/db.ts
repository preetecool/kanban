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
			await $fetch(`/api/task/new`, {
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
		async createSubtask(taskId: string, subTasks: string[]) {
			await $fetch("/api/subtask/new", {
				method: "POST",
				body: {
					task: taskId,
					subtasks: subTasks
				}
			});
		},
		async updateTask(taskId: string, categoryId: string) {
			await $fetch(`/api/task/update/${taskId}`, {
				method: "PATCH",
				body: {
					category: categoryId
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
