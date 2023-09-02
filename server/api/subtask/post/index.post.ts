import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { Subtask } from "~~/types/app.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	const body = await readBody(event);
	let channel: RealtimeChannel;

	try {
		body.subtasks.forEach(async (subtask: Subtask) => {
			const { data, error } = await client
				.from("subtask")
				.insert({
					task: body.task,
					title: subtask.title,
					completed: subtask.completed ? true : false
				})
				.select()
				.single();
			if (error) throw error;

			channel = client
				.channel("public:task")
				.on(
					"postgres_changes",
					{ event: "*", schema: "public", table: "task" },
					(payload) => payload
				)
				.subscribe();

			return data;
		});
	} catch (error: any) {
		return createError({ statusMessage: error.message });
	}
});
