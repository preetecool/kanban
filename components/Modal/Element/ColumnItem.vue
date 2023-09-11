<template>
  <div class="wrap">
    <input
      type="text"
      :placeholder="placeholder"
      :v-model="itemName"
      :value="itemName"
      :class="{ 'red-border': showRedBorder }"
      @input="$emit('update:itemName', $event.target.value)"
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
const showRedBorder = ref(false)
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
  color: #828fa3;
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
