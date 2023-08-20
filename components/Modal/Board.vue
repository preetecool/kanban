<template>
    <Modal modalType="newBoard">
        <template #header>
            <span class="headingL">Create a new board</span>
            <span class="bodyM-thin light-text">Organize your tasks by creating columns!</span>
        </template>

        <template #form-content-title>
            <span class="bodyM light-text">Name</span>
            <input type="text" placeholder="Enter a name for your board" v-model="boardName" />
        </template>

        <template #form-content-input>
            <span class="bodyM light-text">Column</span>
        </template>

        <template #submit-button>
            <UIButton label="Create Board" @click="sendData()"></UIButton>
        </template>
    </Modal>
</template>

<script lang="ts" setup>
    import { useMainStore } from "@/store/main";
    import { Database } from "~~/types/database.types";
    const store = useMainStore();
    const boardName = ref("");
    const user = useSupabaseUser();
    const supabase = useSupabaseClient<Database>();

    let columns = ref([
        {
            name: "",
        },
    ]);

    async function addNewColumn() {
        columns.value.push({
            name: "",
        });

        return columns;
    }

    function removeColumn(id: number) {
        columns.value.splice(id, 1);
        return columns;
    }

    async function sendData() {
        const boardId = BigInt(Math.floor(Math.random() * 1000000000)).toString();

        try {
            const { data, error } = await supabase
                .from("boards")
                .insert({
                    id: boardId,
                    creator: user.value.email,
                    created_at: new Date(),
                    title: boardName.value,
                    user_id: user.value.id,
                    categories: columns.value,
                })
                .select("creator, id, created_at, title, categories")
                .single();
            if (error) throw error;
        } catch (error: any) {
            alert(error.message);
        } finally {
            store.toggleModal("newBoard");
        }
    }
</script>

<style lang="scss" scoped></style>
