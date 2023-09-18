import { useDBStore } from '@/store/db'
import { DbStoreMethods } from '~~/types/app.types'

export async function useDB(methodName: DbStoreMethods, ...args: any) {
  const dbStore = useDBStore()
  try {
    if (typeof dbStore[methodName] !== 'function') {
      throw new Error(`Method ${methodName} does not exist on dbStore`)
    }

    let { data: fetchedData, refresh } = await useAsyncData('data', async () => {
      if (args) {
        return dbStore[methodName](...args)
      }
      return dbStore[methodName]
    })
    return {
      data: fetchedData.value,
      refresh,
    }
  } catch (e) {
    throw new Error('Something went wrong with the DB operation.')
  }
}
