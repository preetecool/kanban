import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";
import { useMainStore } from "../../../store/main";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    const client = await serverSupabaseClient<Database>(event);
    let channel: RealtimeChannel;

    // let params = Number(event?.context?.params?.board);

    const {
        data: boards,
        refresh: refreshBoards,
        error,
    } = await client.from("boards").select("*").eq("user_id", user?.id);
    channel = client
        .channel("public:boards")
        .on("postgres_changes", { event: "*", schema: "public", table: "boards" }, () =>
            refreshBoards()
        );
    // store.userBoards = boards;
    channel.subscribe();

    if (error) {
        throw createError({ statusMessage: error.message });
    }

    return boards;
});
