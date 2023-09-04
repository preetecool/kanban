import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { Task } from "~~/types/app.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    const client = await serverSupabaseClient<Database>(event);
    // let channel: RealtimeChannel;
    let taskId = getRouterParam(event, "id");

    try {
        console.log("attempting to delete...");
        const { error } = await client.from("task").delete().eq("id", taskId);
        if (error) {
            console.error("There was an error deleting this task", error);
        }
    } catch (error: any) {
        return createError({ statusMessage: error.message });
    }
    return "Task Successfully Deleted";
});
