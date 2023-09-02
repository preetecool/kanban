import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	const body = await readBody(event);

	try {
		const { data, error } = await client
			.from("boards")
			.insert({
				id: body.id,
				title: body.title,
				user_id: user?.id
			})
			.select("id, title")
			.single();

		// const { data: categories } = await client.from("categories").insert({
		// 	id: BigInt(Math.floor(Math.random() * 1000000000)).toString(),
		// 	user_id: user?.id,
		// 	board: body.id,
		// 	titles: body.categories
		// });
		if (error) throw error;
		return data;
	} catch (error: any) {
		alert(error.message);
		return createError({ statusMessage: error.message });
	}
});
