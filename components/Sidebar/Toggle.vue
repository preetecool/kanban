<template>
  <div class="sidebar-settings">
    <div class="theme-toggle">
      <div>
        <svg
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use xlink:href="#icon-light-theme" />
        </svg>
      </div>
      <div
        class="toggle"
        @click="toggleTheme()"
      >
        <div
          class="elipse"
          :class="{ elipse__isRight: !isLight }"
        ></div>
      </div>
      <div>
        <svg
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use xlink:href="#icon-dark-theme" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
const store = useMainStore()
const isLight = ref(true)
function toggleTheme() {
  if (isLight.value) {
    localStorage.setItem('theme', 'dark')
    isLight.value = false
    store.theme = 'dark'
  } else {
    localStorage.setItem('theme', 'light')
    isLight.value = true
    store.theme = 'light'
  }
}
onMounted(() => {
  if (localStorage.getItem('theme') === 'light') {
    isLight.value = true
  } else {
    isLight.value = false
  }
})
</script>
<style scoped lang="scss">
.sidebar-settings {
  margin-top: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media screen and (max-width: 768px) {
    padding: 2rem 1rem;
  }
}
.theme-toggle {
  height: 3rem;
  background-color: colors.$lightgrey;
  border-radius: 6px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.toggle {
  background-color: colors.$purple;
  width: 40px;
  height: 20px;
  border-radius: 12px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 3px;
  cursor: pointer;
  &:hover {
    background-color: colors.$purplehoverdark;
  }
}
.elipse {
  height: 14px;
  width: 14px;
  position: absolute;
  background-color: colors.$white;
  border-radius: 50%;
  transition: transform 0.3s ease-out;
  transform: translateX(0);
  &:hover {
    background-color: colors.$lightgrey;
  }
  &__isRight {
    transform: translateX(20px);
  }
}
.wrap {
  width: 100%;
  display: flex;
}
</style>
