import { Database } from '~~/types/database.types'
import type { RealtimeChannel } from '@supabase/supabase-js'

export async function useDBRefresh(refreshTable, table: string) {
  const supabase = useSupabaseClient<Database>()
  console.log('entering refresh function')
  let channel: RealtimeChannel = supabase
    .channel(`public:${table}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: `${table}` }, payload => {
      console.log('Changes Received', payload)
      try {
        refreshTable()
      } catch (e) {
        throw new Error('unable to refresh table.')
      }
    })
    .subscribe()
  channel.unsubscribe
}
