import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseClient } from '#supabase/server'
export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)
  let body = await readBody(event)
  let categoryId = getRouterParam(event, 'id')

  try {
    const { data, error } = await client
      .from('category')
      .update({
        title: body.title,
        updated_at: new Date(),
      })
      .eq('id', categoryId)
      .select('id, title')
    if (error) throw error
    return {
      status: 200,
      statusText: 'Successfully updated category',
      body: data,
    }
  } catch (error: any) {
    return createError({ statusMessage: error.message })
  }
})
