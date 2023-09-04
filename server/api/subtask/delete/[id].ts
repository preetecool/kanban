import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { Subtask } from "~~/types/app.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);

	// let channel: RealtimeChannel;
	let subtaskId = getRouterParam(event, "id");

	try {
		const { error } = await client.from("subtask").delete().eq("id", subtaskId);
	} catch (error: any) {
		return createError({ statusMessage: error.message });
	}
	return {
		status: 204,
		statusText: "Subtask Succesfully deleted"
	};
});
