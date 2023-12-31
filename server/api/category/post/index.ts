import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)
  const boardId = body.board
  // const categories = body.categories

  try {
    if (!boardId) {
      return createError({ statusMessage: 'boardId is missing from the request body' })
    }

    const { data, error } = await client.from('category').insert(body.categories).select('board, title, id')

    if (error) throw error
    return {
      status: 200,
      statusText: 'Categorie(s) Created',
      body: data,
    }
  } catch (error: any) {
    return createError({ statusMessage: error.message })
  }
})
