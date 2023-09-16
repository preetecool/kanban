import { ref } from 'vue'
import { useDBStore } from '@/store/db'
import { ArgsForDBAction, DbStoreMethods } from '~~/types/app.types'
import { Database } from '~~/types/database.types'

export async function useDB(methodName: DbStoreMethods, arg1, arg2?, arg3?) {
  const supabase = useSupabaseClient<Database>()
  const dbStore = useDBStore()

  try {
    if (typeof dbStore[methodName] !== 'function') {
      throw new Error(`Method ${methodName} does not exist on dbStore`)
    }
    let { data: fetchedData, refresh: refreshTable } = await useAsyncData('data', async () => {
      await dbStore[methodName](arg1, arg2, arg3)
    })
    return {
      data: fetchedData,
      refreshTable,
    }
  } catch (e) {
    throw new Error('Something went wrong with the DB operation.')
  }
}
