import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)
  let channel: RealtimeChannel

  try {
    const { data, error } = await client
      .from('board')
      .insert({
        id: body.id,
        title: body.title,
        user_id: user?.id,
      })
      .select('id, title')
      .single()
    channel = client
      .channel('public:board')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'board' }, payload =>
        console.log('updated', payload),
      )
    channel.subscribe()

    if (error) throw error
    return data
  } catch (error: any) {
    alert(error.message)
    return createError({ statusMessage: error.message })
  }
})
