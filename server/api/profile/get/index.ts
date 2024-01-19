import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)

  try {
    const { data, error } = await client
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
    return {
      status: 200,
      statusText: 'Successfully updated theme setting',
      body: data,
    }
  } catch (error: any) {
    return createError({ statusMessage: error.message })
  }
})
