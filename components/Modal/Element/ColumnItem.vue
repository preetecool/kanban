<template>
  <div class="wrap">
    <input
      type="text"
      :placeholder="placeholder"
      :v-model="itemName"
      @input="$emit('update:itemName', $event.target.value)"
      :value="itemName"
      :class="{ 'red-border': showRedBorder }"
    />
    <div
      class="cross"
      @mouseenter="showRedBorder = true"
      @mouseleave="showRedBorder = false"
    >
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
  placeholder: {
    type: String,
  },
})
const emit = defineEmits(['update:itemName'])
let showRedBorder = ref(false)
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
  color: inherit;
  &:hover {
    transform: scale(1.13);
    color: colors.$red;
    svg {
      fill: colors.$red;
      stroke: colors.$red;
    }
  }
}

.red-border {
  border: 1px solid colors.$red;
}
</style>
