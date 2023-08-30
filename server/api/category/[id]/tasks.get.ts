import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	let channel: RealtimeChannel;
	let categoryId = getRouterParam(event, "id");
	const {
		data: tasks,
		refresh: refreshTasks,
		error
	} = await client
		.from("task")
		.select("* , subtask (id, title, completed) ")
		.eq("category", categoryId);
	channel = client
		.channel("public:task")
		.on("postgres_changes", { event: "*", schema: "public", table: "task" }, () =>
			refreshTasks()
		);

	channel.subscribe();

	if (error) {
		return createError({ statusMessage: error.message });
	}

	return tasks;
});
