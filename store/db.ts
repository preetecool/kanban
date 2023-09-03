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
		async setActiveBoard(params: string) {
			const store = useMainStore();
			this.isLoadingData = true;
			try {
				let data = await $fetch(`/api/boards/get/${params}`);
				store.activeBoard = data;
			} catch (error) {
				console.error("Error fetching board by Id", error);
			} finally {
				this.isLoadingData = true;
			}
		},
		async fetchAllBoards() {
			this.isLoadingData = true;
			try {
				let data = await $fetch("/api/boards/get/all");
			} catch (err) {
				console.error("Error fetching all boards", err);
			} finally {
				this.isLoadingData = false;
			}
		},
		async fetchTaskById(id: Task["id"]) {
			let store = useMainStore();

			this.isLoadingData = true;
			try {
				let task = await $fetch(`/api/task/${id}/`);
				store.selectedTask = task as Task;
			} catch (err) {
				console.error("Error fetching task by Id", err);
			} finally {
				this.isLoadingData = false;
			}
		},
		async fetchCategoriesByBoard(boardId: string) {
			this.isLoadingData = true;
			try {
				let data = await $fetch(`/api/category/${boardId}`);
				return data as Category[];
			} catch (error) {
				return console.error("Error fetching categories by board", error);
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
			let data = await $fetch(`/api/task/post/`, {
				method: "POST",
				body: {
					taskId: taskId,
					categoryId: categoryId,
					board: board,
					title: title,
					description: description
				}
			});
			return data;
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

		async updateTask(
			taskId: string,
			categoryId: string,
			title?: string,
			description?: string
		) {
			await $fetch(`/api/task/update/${taskId}`, {
				method: "PATCH",
				body: {
					category: categoryId,
					title: title,
					description: description
				}
			});
		},
		async updateSubtask(id: Subtask["id"], isComplete: boolean, title?: string) {
			let udpatedTask = await $fetch(`/api/subtask/update/${id}/`, {
				method: "PATCH",
				body: {
					completed: isComplete
				}
			});
		},
		async deleteSubtask(id: Subtask["id"]) {
			await $fetch(`/api/subtask/delete/${id}`);
		}
	}
});
