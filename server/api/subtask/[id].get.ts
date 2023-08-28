import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	let channel: RealtimeChannel;
	let taskId = getRouterParam(event, "id");

	const {
		data: tasks,
		refresh: refreshTasks,
		error
	} = await client.from("subtask").select("*").eq("task", taskId);
	channel = client
		.channel("public:subtask")
		.on("postgres_changes", { event: "*", schema: "public", table: "subtask" }, () =>
			refreshTasks()
		);

	channel.subscribe();

	if (error) {
		return createError({ statusMessage: error.message });
	}

	return tasks;
});
