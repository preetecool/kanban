import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)

  const boardId = getRouterParam(event, 'id')

  try {
    const { error } = await client.from('board').delete().eq('id', boardId)
    if (error) {
      throw new Error('Something went wrong deleting the board')
    }
  } catch (error: any) {
    return createError({ statusMessage: error.message })
  }
  return {
    status: 204,
    statusText: 'Board succesfully deleted',
  }
})
