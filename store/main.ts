export const useMainStore = defineStore("main", {
    state: () => {
        return {
            modal: false,
            boards: ref([{}]),
            activeBoard: ref(),
        };
    },
    actions: {
        toggleModal() {
            this.modal = !this.modal;
        },
        async setActiveBoard(id: number) {
            console.log(this.boards);
            let route = useRoute();
            this.$patch({
                activeBoard: (this.activeBoard = this.boards.find((board) => board.id === id)),
            });
        },
        // async fetchBoards() {
        //     let boards = await $fetch("/api/boards/get");
        //     watch(boards, async () => {
        //         this.$patch({
        //             boards: boards,
        //         });
        //     });
        // },
    },
});
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
