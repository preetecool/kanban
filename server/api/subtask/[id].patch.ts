import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	let channel: RealtimeChannel;
	let body = readBody(event);
	let subtaskId = getRouterParam(event, "taskId");
	let response;

	try {
		const { data, error } = await client
			.from("subtask")
			.update({
				completed: body.completed,
				updated_at: new Date()
			})
			.eq("id", body.subtaskId)
			.select();
		if (error) throw error;
	} catch (error: any) {
		alert(error.message);
	}

	return response;
});
