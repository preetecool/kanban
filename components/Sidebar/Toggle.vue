<template>
    <div class="sidebar-settings">
        <div class="theme-toggle">
            <!-- <div class="wrap"> -->
            <div>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <use xlink:href="#icon-light-theme"></use>
                </svg>
            </div>
            <div class="toggle" @click="toggleTheme()">
                <div class="elipse" :class="{ elipse__isRight: !isLight }"></div>
            </div>
            <div>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <use xlink:href="#icon-dark-theme"></use>
                </svg>
            </div>
            <!-- </div> -->
        </div>
        <div class="sidebar-toggle">
            <Icon icon="hide-sidebar" />
            <span class="light-text headingM">Hide Sidebar</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useMainStore } from "@/store/main";
    const store = useMainStore();
    let isLight = ref(true);
    function toggleTheme() {
        if (isLight.value === true) {
            localStorage.setItem("theme", "dark");
        } else if (isLight.value === false) {
            localStorage.setItem("theme", "light");
        }
        isLight.value = !isLight.value;
    }
    onMounted(() => {
        if (localStorage.getItem("theme") === "light") {
            isLight.value = true;
        } else {
            isLight.value = false;
        }
    });
</script>
<style scoped lang="scss">
    .sidebar-settings {
        margin-top: auto;
        padding: 0 2rem 2rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 22px;
    }
    .theme-toggle {
        height: 3rem;
        background-color: $lightgrey;
        border-radius: 6px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    .toggle {
        background-color: $purple;
        width: 40px;
        height: 20px;
        border-radius: 12px;
        position: relative;
        display: flex;
        align-items: center;
        padding: 3px;
        cursor: pointer;
        &:hover {
            background-color: $purplehoverdark;
        }
    }
    .elipse {
        height: 14px;
        width: 14px;
        position: absolute;
        background-color: $white;
        border-radius: 50%;
        transition: transform 0.3s ease-out;
        transform: translateX(0);
        &:hover {
            background-color: $lightgrey;
        }
        &__isRight {
            // left: 23px;
            transform: translateX(20px);
            // transition: all 5s ease-out;
        }
    }
    .wrap {
        width: 100%;
        display: flex;
    }

    .sidebar-toggle {
        display: flex;
        gap: 15px;
        align-items: center;
        cursor: pointer;
        padding-left: 4px;
        svg {
            &:hover {
                fill: $purplehover;
            }
        }
    }
</style>
