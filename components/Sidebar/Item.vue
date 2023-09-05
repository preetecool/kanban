<template>
    <NuxtLink :to="`/board/${id}`" class="link pl-2r" exactActiveClass="link__active">
        <div>
            <div class="item-wrap">
                <Icon icon="board" />
                <span class="headingM">{{ name }}</span>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
    const props = defineProps({
        name: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    });
</script>
<style scoped lang="scss">
    .link {
        display: flex;
        width: 90%;
        height: 3rem;
        box-sizing: border-box;
        color: $medgrey;
        text-decoration: none;

        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;
        align-items: center;
        &__active {
            color: white;
            background-color: $purple;
            &:hover {
                background-color: $purplehover;
            }
            svg {
                fill: $white;
            }
        }
        span {
            &:hover {
                color: $purple;
            }
        }
    }
    .item-wrap {
        display: flex;
        gap: 16px;
        align-items: center;
    }
</style>
