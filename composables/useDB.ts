import { ref } from 'vue'
import { useDBStore } from '@/store/db'
import { ArgsForDBAction, DbStoreMethods } from '~~/types/app.types'

export async function useDB(methodName: DbStoreMethods, ...args) {
  const dbStore = useDBStore()

  try {
    if (typeof dbStore[methodName] !== 'function') {
      throw new Error(`Method ${methodName} does not exist on dbStore`)
    }
    console.log([...args])
    let { data: fetchedData, refresh } = await useAsyncData('data', async () => {
      return dbStore[methodName]([...args])
    })

    return {
      data: fetchedData.value,
      refresh,
    }
  } catch (e) {
    throw new Error('Something went wrong with the DB operation.')
  }
}
