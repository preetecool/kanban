export const useMainStore = defineStore("main", {
    state: () => {
        return {
            modal: false,
            activeBoard: {},
        };
    },
    actions: {
        toggleModal() {
            this.modal = !this.modal;
        },
    },
});
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
