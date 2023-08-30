import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	let channel: RealtimeChannel;
	let params = event?.context?.params?.id;

	const {
		data: categories,

		error
	} = await client
		.from("category")
		.select("*, task(id, description, completed, title, category)")
		.eq("board", params)
		.order("created_at");
	channel = client
		.channel("public:category")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "category" },
			(payload) => "updated"
		);

	channel.subscribe();

	if (error) {
		return createError({ statusMessage: error.message });
	}

	return categories;
});
