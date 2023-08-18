<template>
    <div class="modal" @click="store.toggleModal()">
        <div class="modal__content" @click.stop>
            <div class="modal__content__header">
                <span class="headingL">Create a new board</span>
                <span class="bodyM-thin light-text">Organize your tasks by creating columns!</span>
            </div>
            <div class="modal__content__body">
                <div class="modal__content__body__input">
                    <div class="input-block">
                        <span class="bodyM light-text">Name</span>
                        <input
                            type="text"
                            placeholder="Enter a name for your board"
                            v-model="boardName"
                        />
                    </div>
                    <div class="input-block">
                        <span class="bodyM light-text">Column</span>

                        <div v-for="(column, index) in columns">
                            <ModalColumnItem v-model:column-name="column.name">
                                <Icon @click="removeColumn(index)" name="icon-cross" class="cross" />
                            </ModalColumnItem>
                        </div>
                        <UIButton label="+ Add New Column" secondary @click="addNewColumn()" />
                    </div>
                </div>
            </div>
            <div class="modal__content__footer">
                <UIButton label="Create Board" @click="sendData()"></UIButton>
            </div>
        </div>
    </div>
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
    console.log(columns.value);
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
                    categories: JSON.stringify(columns.value),
                })
                .select("creator, id, created_at, title, categories")
                .single();
            if (error) throw error;
        } catch (error: any) {
            alert(error.message);
        } finally {
            store.toggleModal();
        }
    }
</script>

<style lang="scss" scoped>
    .bgModal {
        z-index: 99;
    }
    input {
        max-width: 416px;
        width: 416px;
    }
    .input-block {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
        transition: all 0.3s ease-in-out;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        &__content {
            width: 480px;
            background-color: $white;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            &__header {
                padding: 32px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            &__body {
                padding: 32px;
                display: flex;
                flex-direction: column;
                gap: 8px;
                &__input {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
            }
            &__footer {
                padding: 32px;
            }
        }
    }
</style>
```
