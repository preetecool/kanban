import { Database } from '~~/types/database.types'
import type { RealtimeChannel } from '@supabase/supabase-js'

export async function useDBRefresh(table: string) {
  const supabase = useSupabaseClient<Database>()
  console.log('entering refresh function')
  let channel: RealtimeChannel = supabase
    .channel(`public:${table}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: `${table}` }, payload => {
      console.log('Changes Received', payload)
    })
    .subscribe()
  channel.unsubscribe
}
