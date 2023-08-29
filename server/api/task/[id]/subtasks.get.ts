import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	let channel: RealtimeChannel;
	let taskId = getRouterParam(event, "id");

	let response;
	try {
		const { data: tasks, error } = await client
			.from("subtask")
			.select("*")
			.eq("task", taskId);
		channel = client
			.channel("public:subtask")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "subtask" },
				(payload) => {
					console.log("changes made", payload);
				}
			);
		channel.subscribe();

		if (tasks) {
			response = tasks;
		}
		if (error) {
			return createError({ statusMessage: error.message });
		}
	} catch (e: any) {
		return createError({ statusMessage: e.message });
	}

	return response;
});
