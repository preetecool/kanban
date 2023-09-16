import { useMainStore } from '@/store/main'

import { useDBStore } from '@/store/db'

export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    'global-middleware',
    async (to, from) => {
      const store = useMainStore()
      const db = useDBStore()
      if (to) {
        store.$reset()
        if (to.fullPath !== '/' && to.fullPath !== '/confirm') {
          await db.setActiveBoard(to.params.id as string)
        }
      }
    },
    { global: true },
  )
})
