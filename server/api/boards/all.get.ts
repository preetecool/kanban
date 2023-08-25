import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    const client = await serverSupabaseClient<Database>(event);
    let channel: RealtimeChannel;
    const {
        data: board,
        refresh: refreshBoards,
        error,
    } = await client.from("boards").select("*").eq("user_id", user?.id);
    channel = client
        .channel("public:boards")
        .on("postgres_changes", { event: "*", schema: "public", table: "boards" }, () =>
            refreshBoards()
        );

    channel.subscribe();

    if (error) {
        return createError({ statusMessage: error.message });
    }

    return board;
});
