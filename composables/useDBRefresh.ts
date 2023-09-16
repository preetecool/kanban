import { Database } from '~~/types/database.types'
import type { RealtimeChannel } from '@supabase/supabase-js'

export async function useDBRefresh(refreshTable: any, table: string) {
  const supabase = useSupabaseClient<Database>()
  let channel: RealtimeChannel

  channel = supabase
    .channel(`public:${table}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: `${table}` }, payload => {
      console.log('Changes Received', payload)
      refreshTable(payload)
    })
    .subscribe()
  onUnmounted(() => {
    channel.unsubscribe
  })
}
