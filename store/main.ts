export const useMainStore = defineStore("main", {
	state: () => ({
		modal: false
	}),
	actions: {
		toggleModal() {
			this.modal = !this.modal;
		},
		updateSupabase() {
			return console.log("yo");
		}
	}
});
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
