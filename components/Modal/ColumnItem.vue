<template>
    <div class="wrap">
        <input
            type="text"
            placeholder="What is your column called?"
            :v-model="columnName"
            @input="$emit('update:columnName', $event.target.value)"
        />
        <div class="cross">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        columnName: {
            type: String,
        },
        remove: {
            type: Function,
        },
    });
    const emit = defineEmits(["update:columnName"]);
</script>
<style lang="scss" scoped>
    .wrap {
        display: flex;
        align-items: center;
        gap: 16px;
        justify-content: space-between;
        max-width: 416px;
    }
    .cross {
        cursor: pointer;
        &:hover {
            transform: scale(1.13);
        }
    }
</style>
