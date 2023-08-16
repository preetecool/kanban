export const useDB = defineStore("db", {
	state: () => ({
		test: "test"
	}),
	actions: {
		registerUser() {
			return "hello world";
		}
	}
});
