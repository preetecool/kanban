import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    const client = await serverSupabaseClient<Database>(event);
    let channel: RealtimeChannel;
    let body = await readBody(event);
    let categoryId = getRouterParam(event, "id");

    let response;

    try {
        const { data, error } = await client
            .from("category")
            .update({
                title: body.title,
                updated_at: new Date(),
            })
            .eq("id", categoryId)
            .select("id, title");
        if (error) throw error;
        response = data;
    } catch (error: any) {
        return createError({ statusMessage: error.message });
    }

    return response;
});
