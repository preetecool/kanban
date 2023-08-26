import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	const body = await readBody(event);

	try {
		body.titles.forEach(async (title: string) => {
			const { data, error } = await client
				.from("category")
				.insert({
					board: body.board,
					title: title
				})
				.select("title, board")
				.single();
			if (error) throw error;
		});
	} catch (error: any) {
		return createError({ statusMessage: error.message });
	}
	return {
		statusCode: 200
	};
});
