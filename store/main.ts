export const useMainStore = defineStore("main", {
	state: () => {
		return {
			modal: false,
			// boards: ref([{}]),
			activeBoard: []
		};
	},
	actions: {
		toggleModal() {
			this.modal = !this.modal;
		}
	}
});
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
