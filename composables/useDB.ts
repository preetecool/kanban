import { ref } from 'vue'
import { useDBStore } from '@/store/db'
import { ArgsForDBAction, DbStoreMethods } from '~~/types/app.types'

export async function useDB(
  methodName: DbStoreMethods,
  arg1?: ArgsForDBAction,
  arg2?: ArgsForDBAction,
  arg3?: ArgsForDBAction,
) {
  const dbStore = useDBStore()

  try {
    if (typeof dbStore[methodName] !== 'function') {
      throw new Error(`Method ${methodName} does not exist on dbStore`)
    }

    let { data: fetchedData, refresh } = await useAsyncData('data', async () => {
      return dbStore[methodName](arg1, arg2, arg3)
    })

    return {
      data: fetchedData.value,
      refresh,
    }
  } catch (e) {
    throw new Error('Something went wrong with the DB operation.')
  }
}
