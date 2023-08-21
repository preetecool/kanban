<template>
    <div class="modal" @click="store.toggleModal('closeModal')">
        <div class="modal__content" @click.stop>
            <div class="modal__content__header">
                <slot name="header" />
            </div>

            <div class="modal__content__body">
                <div class="modal__content__body__input">
                    <div class="input-block">
                        <slot name="form-content-title" />
                    </div>
                    <slot name="description" />
                    <div class="input-block">
                        <slot name="form-content-input" />
                        <div v-for="(item, index) in items">
                            <ModalColumnItem v-model:item-name="item.name">
                                <Icon @click="removeColumn(index)" name="icon-cross" class="cross" />
                            </ModalColumnItem>
                        </div>
                        <UIButton label="+ Add New Column" secondary @click="addNewColumn()" />
                    </div>
                </div>
            </div>
            <div class="modal__content__footer">
                <slot name="submit-button" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useMainStore } from "@/store/main";
    import { Database } from "~~/types/database.types";

    const store = useMainStore();

    let items = ref([
        {
            name: "",
        },
    ]);

    async function addNewColumn() {
        items.value.push({
            name: "",
        });

        return items;
    }

    function removeColumn(id: number) {
        items.value.splice(id, 1);
        return items;
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
