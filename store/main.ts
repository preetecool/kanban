import { Modal } from "~~/types/app.types";
export const useMainStore = defineStore("main", {
    state: () => {
        return {
            modal: {
                newBoard: false,
                editBoard: false,
                newTask: false,
                editTask: false,
                closeModal: false,
            },
            activeBoard: [{}],
        };
    },
    actions: {
        toggleModal(board: keyof Modal) {
            if (board === "closeModal") {
                return this.closeModal();
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
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
