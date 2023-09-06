import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)
  const boardId = body.board

  try {
    const categories = body.titles.map((title: string) => ({
      board: boardId,
      title: title,
    }))
    const { data, error } = await client.from('category').insert(categories).select('board, title')
    if (!boardId) {
      return createError({ statusMessage: 'boardId is missing from the request body' })
    }
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
