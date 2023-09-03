import { useMainStore } from "@/store/main";

import { useDB } from "@/store/db";

export default defineNuxtPlugin(() => {
    addRouteMiddleware(
        "global-middleware",
        async (to, from) => {
            const store = useMainStore();
            const db = useDB();

            if (from) {
                store.$reset();
            }

            if (to) {
                await db.setActiveBoard(to.params.id as string);
            }
        },
        { global: true }
    );
});
