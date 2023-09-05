<template>
    <div @mouseenter="menu = true" @mouseleave="menu = false" class="menu">
        <!-- <IconOld class="edit-task-icon" name="icon-vertical-ellipsis" width="5px" /> -->
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <use xlink:href="#icon-elipse"></use>
        </svg>
        <div v-if="menu" class="edit-delete">
            <ul class="edit-delete__menu bodyL">
                <li
                    class="edit-delete__item"
                    @click="store.toggleModal(view as keyof Modal, id)"
                >
                    <span class="light-text">Edit {{ menuText }}</span>
                </li>
                <li class="edit-delete__item" @click="displayDeleteModal">
                    <span class="light-text danger">Delete {{ menuText }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useMainStore } from "@/store/main";
    import { Modal } from "~~/types/app.types";
    let store = useMainStore();
    const props = defineProps({
        view: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        menuText: {
            type: String,
            required: true,
        },
    });

    let menu = ref(false);
    function displayDeleteModal() {
        if (store.modal.viewTask) {
            store.deleteView = "task";
        } else if (store.modal.editBoard) {
            store.deleteView = "category";
        } else {
            store.deleteView = "board";
        }
        store.toggleModal("deleteView" as keyof Modal, props.id);
    }
</script>

<style lang="scss">
    .menu {
        position: relative;
    }
    .edit-task-icon {
        :hover {
            cursor: pointer;
            transform: scale(1.2);
        }
        width: 40px;
    }

    .edit-delete {
        position: absolute;
        width: 160px;

        top: 10px;
        right: 0;
        background-color: #fff;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        z-index: 1;
        &__menu {
            display: flex;
            flex-direction: column;

            gap: 16px;
            border-radius: 8px;
        }
        &__item {
            border-radius: 8px;
            padding: 0px 16px;
            justify-self: center;
            &:hover {
                cursor: pointer;
                background-color: $lightgrey;
            }
        }
        &__item:first-child {
            padding-top: 16px;
        }
        &__item:last-child {
            padding-bottom: 16px;
        }
    }
</style>
