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
					title: subtask,
					completed: false
				})
				.select()
				.single();
			if (error) throw error;
		});
	} catch (error: any) {
		alert(error.message);
	}
});
