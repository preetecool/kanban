import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	let channel: RealtimeChannel;
	let body = await readBody(event);
	let taskId = getRouterParam(event, "id");
	let categoryId = body.category;

	let response;

	try {
		const { data, error } = await client
			.from("task")
			.update({
				category: body.category,
				updated_at: new Date()
			})
			.eq("id", taskId)
			.eq("category", categoryId)
			.select("*, subtask(id, title, completed)");
		// channel = client
		// 	.channel("public:task")
		// 	.on(
		// 		"postgres_changes",
		// 		{ event: "*", schema: "public", table: "task" },
		// 		(payload) => payload
		// 	)
		// 	.subscribe();

		const task = client
			.channel("custom-update-channel")
			.on(
				"postgres_changes",
				{ event: "UPDATE", schema: "public", table: "task" },
				(payload) => {
					console.log("Change received!", payload);
				}
			)
			.subscribe();

		// channel.unsubscribe();

		if (error) throw error;
		response = data;
	} catch (error: any) {
		return createError({ statusMessage: error.message });
	}

	return response;
});
