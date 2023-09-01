import { Modal, Task, Subtask, Board, CategoriesByBoard } from "~~/types/app.types";
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
            activeBoard: [{}] as Board[],
            items: [
                {
                    title: "",
                    id: 0,
                },
            ],
            selectedTask: {} as Task,

            categoriesByBoard: {} as CategoriesByBoard,
        };
    },
    actions: {
        toggleModal(board: keyof Modal, taskId?: string) {
            let db = useDB();
            if (board === "closeModal") {
                return this.closeModal();
            }
            if (board === "viewTask") {
                db.fetchTaskById(taskId as Task["id"]);
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
    },
});
// if (import.meta.hot) {
// 	import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
// }
