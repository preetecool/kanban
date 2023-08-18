import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    const client = await serverSupabaseClient<Database>(event);
    let channel: RealtimeChannel;

    const {
        data: firstBoard_id,
        refresh: refreshFirstBoard,
        error,
    } = await client.from("boards").select("id").eq("user_id", user?.id).range(0, 0);
    channel = client
        .channel("public:boards")
        .on("postgres_changes", { event: "*", schema: "public", table: "boards" }, () =>
            refreshFirstBoard()
        );
    channel.subscribe();

    if (error) {
        throw createError({ statusMessage: error.message });
    }

    return firstBoard_id;
});
