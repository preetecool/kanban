<template>
  <div
    class="modal"
    @click="store.toggleModal('closeModal')"
  >
    <div
      class="modal__content"
      @click.stop
    >
      <div class="modal__content__header">
        <slot name="header"></slot>
      </div>

      <div
        v-if="!store.modal.deleteView"
        class="modal__content__body"
      >
        <div class="modal__content__body__input">
          <slot name="subtasks"></slot>
          <div class="input-block">
            <slot name="form-content-title"></slot>
          </div>
          <slot name="description"></slot>
          <div
            v-if="!store.modal.viewTask"
            class="input-block"
          >
            <slot
              name="form-content-input"
              :items="items"
            ></slot>

            <div
              v-for="(item, index) in items"
              :key="index"
            >
              <ModalElementColumnItem v-model:item-name="item.title">
                <IconOld
                  name="icon-cross"
                  @click="removeColumn(index)"
                />
              </ModalElementColumnItem>
            </div>
            <UIButton
              :label="AddButtonLabel"
              secondary
              @click="addNewColumn()"
            />
          </div>
        </div>
      </div>
      <div
        v-if="hasStatus"
        class="modal__content__body status"
      >
        <slot name="status"></slot>
      </div>
      <div class="modal__content__footer">
        <slot name="submit-button"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main'

const store = useMainStore()
const items: {}[] = store.inputItems

async function addNewColumn() {
  items.push({
    title: '',
  })

  return items
}

function removeColumn(id: number) {
  items.splice(id, 1)
  return items
}

const AddButtonLabel = computed(() => {
  if (store.modal.editTask || store.modal.newTask) {
    return 'Add New Subtask'
  } else {
    return 'Add New Column'
  }
})

const hasStatus = computed(() => {
  if (store.modal.editTask || store.modal.viewTask || store.modal.newTask) {
    return true
  }
  return false
})
</script>

<style lang="scss" scoped>
input {
  max-width: 416px;
  background-color: red;
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
  backdrop-filter: blur(2px);
  transition: all 0.3s ease-in-out;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  &__content {
    width: 480px;
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
      display: flex;
      gap: 16px;

      & > *:only-child {
        flex: 1;
      }
    }
  }
}
</style>
