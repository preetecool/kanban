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
			.from("task")
			.insert({
				category: body.categoryId,
				board: body.board,

				title: body.id,
				description: body.description,
				completed: false
			})
			.select("id, category, title, board, description, completed")
			.single();
		if (error) throw error;
	} catch (error: any) {
		alert(error.message);
	}
});
