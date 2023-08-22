import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    const client = await serverSupabaseClient<Database>(event);
    const body = await readBody(event);
    let channel: RealtimeChannel;
    const params = event?.context?.params?.id;
    try {
        if (user?.id) {
            const taskId = BigInt(Math.floor(Math.random() * 1000000000));
            const { data, error } = await client
                .from("boards")
                .upsert({
                    category_and_tasks: {
                        id: body.id,
                        tasks: {
                            name: body.name,
                            description: body.description,
                            subtasks: body.subTasks,
                            status: body.elected,
                        },
                    },
                })
                .select()
                .single();
            if (error) throw error;
        }
    } catch (error: any) {
        throw new Error(error.message);
        // alert(error.message);
    }
    return body;
});
