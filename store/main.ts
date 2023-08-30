import { Modal, Task, Subtask } from "~~/types/app.types";
import { useDB } from "./db";
export const useMainStore = defineStore("main", {
    state: () => {
        return {
            modal: {
                newBoard: false,
                editBoard: false,
                newTask: false,
                editTask: false,
                viewTask: false,
                closeModal: false,
            },
            activeBoard: [{}],
            items: [
                {
                    title: "",
                    id: 0,
                },
            ],
            selectedTask: [{}],
            isLoadingData: true,
            tasksByBoard: [{}],
            categoriesByBoard: {},
        };
    },
    actions: {
        toggleModal(board: keyof Modal, taskId?: string) {
            if (board === "closeModal") {
                return this.closeModal();
            }
            if (board === "viewTask") {
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
        },
        async getAllSubtasks(id: number) {
            let task = this.selectedTask;

            let taskId: string | undefined;
            let subtasks: Subtask[];
            if (task) {
                taskId = task[0].id;
            }
            if (taskId != undefined) {
                try {
                    subtasks = await $fetch(`/api/task/${task[0].id}/subtasks`);
                } catch (e) {
                    console.log("Error fetching subtasks", e);
                }
            }
        },
    },
});
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
