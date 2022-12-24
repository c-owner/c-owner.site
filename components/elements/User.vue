<script setup lang="ts">
    import { ref } from '@vue/reactivity';
    import { userLogout } from '~/composables/useAuth';
    import { onClickOutside } from '@vueuse/core';
    import { defineProps } from 'vue';

    const hideActions = ref(true);
    const userActions = ref(null);

    defineProps({
        isLoggedIn: Boolean,
        showSideDrawer: Boolean
    });

    onClickOutside(userActions, () => (hideActions.value = true));

    async function logout() {
        const result = await userLogout();
        console.log(result);
    }
</script>

<template>
    <div ref="userActions">
        <div @click="hideActions = !hideActions">
            <i
                class="ph-user-fill cursor-pointer text-2xl w-6 h-6 dark:text-white hover:dark:text-green-400 hover:text-green-400" />
        </div>

        <ul
            :class="[{ hidden: hideActions }]"
            class="dropdown-menu min-w-max absolute bottom right-0 mr-4 bg-white text-base z-100 float-left py-2 list-none test-left rounded-lg shadow-lg mt-1 top- m-0 bg-clip-padding border-none"
            aria-labelledby="dropdownMenuButton1">
            <li v-if="isLoggedIn" @click="logout">
                <button
                    class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                    로그아웃
                </button>
            </li>
            <li @click="$emit('toggleSideDrawer')">
                <button
                    class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                    메뉴
                </button>
            </li>
            <li v-if="!isLoggedIn">
                <NuxtLink
                    class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/register"
                    >회원가입
                </NuxtLink>
            </li>
            <li v-if="!isLoggedIn">
                <NuxtLink
                    class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/login"
                    >로그인
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<style></style>
