<template>
    <Modal v-if="store.modal === true" />
    <div class="main-grid">
        <Sidebar class="sidebar" />
        <Header class="header" />
        <div class="body">
            <div class="body__new-column">
                <span class="headingL">This board is empty. Create a new column to get started</span>
                <UIButton label="+ Add New Column"></UIButton>
            </div>
        </div>
    </div>
    <div>
        <slot />
    </div>
</template>

<script setup lang="ts">
    import { useMainStore } from "@/store/main";

    const store = useMainStore();
</script>

<style lang="scss" scoped>
    span {
        color: $medgrey;
    }
    .main-grid {
        background-color: $lightgrey;
        position: relative;
        display: grid;
        grid-template-columns: 20% 80%;
        grid-template-rows: 12.5% 87.5%;
        grid-template-areas:
            "sidebar header"
            "sidebar content";
    }

    .body {
        display: flex;

        grid-area: content;
        justify-content: center;
        align-content: center;
        &__new-column {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 32px;
        }
    }
</style>
