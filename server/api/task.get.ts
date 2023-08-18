import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseClient(event);

	const body = await readBody(event);
	return body;
	// return (await supabase)
	// 	.from("boards")
	// 	.insert([{ name: body.boardName, categories: body.columns }])
	// 	.select();
});
