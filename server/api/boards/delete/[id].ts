import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { Subtask } from "~~/types/app.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);

	let channel: RealtimeChannel;
	let boardId = getRouterParam(event, "id");

	try {
		const { error } = await client.from("board").delete().eq("id", boardId);
	} catch (error: any) {
		return createError({ statusMessage: error.message });
	}
	return {
		status: 204,
		statusText: "Board succesfully deleted"
	};
});
