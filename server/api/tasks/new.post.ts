import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	const body = await readBody(event);
	let channel: RealtimeChannel;
	

	try {
        if(user.id){
            const { data, error } = await client.from("tasks").insert([
				{id: body.id},
                {email: user.value.email},
               { board: body.board},
                {created_at: new Date()},
              {  due_date: body.due_date},
                {description: body.description},
               { title: body.title}
               { subtasks: body.subtasks},
               {user_id: user.value.id}
        ])
			.select("id, created_at, title, creator, categories")
			.single();
        }
		if (error) throw error;
	} catch (error: any) {
        throw error
		// alert(error.message);
	}
});
