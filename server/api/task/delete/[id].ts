import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { Task } from "~~/types/app.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	let channel: RealtimeChannel;
	let taskId = getRouterParam(event, "id");
	console.log("attempting to delete...");
	try {
		const { error } = await client.from("task").delete().eq("id", taskId).select("*");
		if (error) {
			console.error("Failed to delete task.", error);
		}
	} catch (error: any) {
		return createError({ statusMessage: error.message });
	}
	return {
		status: 204,
		statusText: "Task Succesfully deleted"
	};
});
