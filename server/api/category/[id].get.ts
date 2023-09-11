import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)
  const params = event?.context?.params?.id

  const {
    data: categories,

    error,
  } = await client
    .from('category')
    .select('*, task(id, description, completed, title, category)')
    .eq('board', params)
    .order('created_at')

  if (error) {
    return createError({ statusMessage: error.message })
  }

  return categories
})
