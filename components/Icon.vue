<template>
    <svg class="icon">
        /
        <image :xlink:href="`/img/${name}.svg`" width="16px" height="16px" />
    </svg>
</template>

<script setup lang="ts">
    const props = defineProps({
        name: {
            type: String,
            required: true,
        },
    });
</script>
<style lang="scss" scoped>
    .icon {
        width: 16px;
        height: 16px;
    }
</style>
