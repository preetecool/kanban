export const useMainStore = defineStore("main", {
	state: () => ({
		modal: false
	}),
	actions: {
		updateSupabase() {
			return "hello world";
		}
	}
});
