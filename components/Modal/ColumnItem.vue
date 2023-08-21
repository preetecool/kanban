<template>
    <div class="wrap">
        <input
            type="text"
            :placeholder="placeholder"
            :v-model="itemName"
            @input="$emit('update:itemName', $event.target.value)"
        />
        <div class="cross">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        itemName: {
            type: String,
        },
        remove: {
            type: Function,
        },
        placeHolder: {
            type: String,
        },
    });
    const emit = defineEmits(["update:itemName"]);
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
