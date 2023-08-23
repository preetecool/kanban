import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	const body = await readBody(event);
	let channel: RealtimeChannel;

	try {
		const { data, error } = await client
			.from("boards")
			.insert({
				id: body.id,
				creator: body.creator,
				created_at: body.created_at,
				title: body.title,
				user_id: body.user_id,
				categories_and_tasks: body.categories_and_tasks
			})
			.select("creator, id, created_at, title, categories_and_tasks")
			.single();
		if (error) throw error;
	} catch (error: any) {
		alert(error.message);
	}
});
