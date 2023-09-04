import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	let channel: RealtimeChannel;
	const {
		data: boards,

		error
	} = await client.from("board").select("*").eq("user_id", user?.id);
	channel = client
		.channel("public:board")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "board" },
			(payload) => payload
		);

	channel.subscribe();

	if (error) {
		return createError({ statusMessage: error.message });
	}

	return boards;
});
