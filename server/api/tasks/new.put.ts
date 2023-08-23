import { createError } from "h3";
import { Database } from "~~/types/database.types";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient<Database>(event);
	const body = await readBody(event);
	let channel: RealtimeChannel;
	const params = event?.context?.params?.id;
	console.log(params);
	try {
		if (user?.id) {
			// const taskId = BigInt(Math.floor(Math.random() * 1000000000));
			const { data, error } = await client
				.from("boards")
				.update({
					categories_and_tasks: {
						tasks: {
							name: body.name,
							description: body.description,
							subtasks: body.subTasks,
							status: body.status
						}
					}
				})
				.eq("id", body.params)
				.select()
				.single();
			if (error) throw error;
		}
	} catch (error: any) {
		// alert(error.message);
		throw new Error(error.message);
	}
	return body;
});
