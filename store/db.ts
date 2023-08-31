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
		async fetchTaskById(id?: string) {
			let store = useMainStore();
			let selectedTask = store.selectedTask;
			this.isLoadingData = true;
			try {
				let task: Task[] = await $fetch(`/api/task/${id}`);

				selectedTask = task;
				console.log(store.selectedTask);
			} catch (err) {
				console.error("Error fetching task by Id", err);
			} finally {
				this.isLoadingData = false;
			}
		},
		async fetchTasksByCategory(categoryId: string) {
			const response = await $fetch(`/api/category/${categoryId}/tasks/`);
			return response;
		},
		async fetchSubtasksForTask(taskId: string) {
			const response = await $fetch(`/api/task/${taskId}/subtasks`);
			return response;
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
		async updateTaskCategory(taskId: string, categoryId: string) {
			await $fetch(`/api/task/update/${taskId}`, {
				method: "PATCH",
				body: {
					category: categoryId
				}
			});
		},
		async updateSubtask(subtaskId: string, isComplete: boolean) {
			let udpatedTask: Subtask = await $fetch(`/api/subtask/update/${subtaskId}/`, {
				method: "PATCH",
				body: {
					completed: isComplete
				}
			});
		}
	}
});
