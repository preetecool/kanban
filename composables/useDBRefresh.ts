import { Database } from '~~/types/database.types'
import type { RealtimeChannel } from '@supabase/supabase-js'

export function useDBRefresh(refreshTable: any, table: string) {
  const supabase = useSupabaseClient<Database>()
  let channel: RealtimeChannel
  let updated
  channel = supabase
    .channel(`public:${table}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: table }, payload => {
      refreshTable(payload)
      if (payload) updated = true
    })
  channel.subscribe()
  if (updated) {
    supabase.removeChannel(channel)
  }
}
