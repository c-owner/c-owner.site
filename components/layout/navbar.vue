<script setup lang="ts">
    import { useRouter, useState } from '#app';
    import { ref, watch } from 'vue';
    import { userLogout } from '~/composables/useAuth';
    import { onClickOutside } from '@vueuse/core';

    const styleCode: string =
        'color: #FFF;background-color: darkslategrey;width=250px;height:150px;font-size:34px;';
    console.log('%c Todo ', styleCode);

    const showSideDrawer = ref(false);

    const router = useRouter();

    const user = useState('user');
    const initalCheck = await useLoggedIn();
    const isLoggedIn = ref(initalCheck);

    router.afterEach(() => {
        showSideDrawer.value = false;
    });

    const colorMode = useColorMode();
    const setColorTheme = (newTheme: Theme) => {
        colorMode.preference = newTheme;
    };

    async function checkIfLoggedIn() {
        const check = await useLoggedIn();
        isLoggedIn.value = check;
    }

    /* TODO :: Logout toast message show.. */
    let result = null;
    async function logout() {
        result = await userLogout();
        console.log(result);

        if (result.hasOwnProperty('message')) {
        }
    }

    watch(
        user,
        async () => {
            await checkIfLoggedIn();
        },
        { deep: true }
    );

    function toggleSideDrawer() {
        showSideDrawer.value = !showSideDrawer.value;
    }

    /* Sidebar close */
    const userDrawer = ref(null);
    onClickOutside(userDrawer, () => (showSideDrawer.value = false));
</script>

<template>
    <div class="navbar relative dark:bg-slate-600 box-shadow-3">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 border-b-2 border-gray-100 dark:border-gray-700">
            <div class="flex justify-between">
                <div class="flex justify-between min-w-full md:min-w-0">
                    <div class="md:hidden mt-4">
                        <button
                            @click="showSideDrawer = true"
                            type="button"
                            class="rounded-md p-2 inline-flex text-gray-400 hover:text-gray-500 dark:text-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded="false">
                            <span class="sr-only dark:bg-black">Open menu</span>
                            <i class="ph-list text-2xl"></i>
                        </button>
                    </div>
                    <div class="flex items-center">
                        <span
                            class="md:hidden ml-5 cursor-pointer"
                            @click="
                                setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')
                            ">
                            <i
                                class="ph-moon-stars-fill text-2xl dark:text-yellow-200 lg:block hover:dark:text-yellow-400 hover:text-yellow-400"
                                v-if="$colorMode.value === 'dark'" />
                            <i
                                class="ph-sun-dim-fill text-2xl dark:text-yellow-200 text-orange-500 lg:block hover:dark:text-yellow-400 hover:text-yellow-400"
                                v-if="$colorMode.value === 'light'" />
                        </span>
                        <NuxtLink to="/">
                            <span class="sr-only">Home</span>
                            <img
                                class="h-16 md:h-24 w-auto transition duration-500 scale-50 md:hover:scale-110"
                                src="/img/logo_clear_fsj.png" />
                        </NuxtLink>
                    </div>
                </div>

                <nav class="hidden md:flex space-x-10 items-center">
                    <NuxtLink to="/todos">
                        <span
                            class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-gray-300">
                            할일
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/videos">
                        <span
                            class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-gray-300">
                            비디오
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/tutorials">
                        <span
                            class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-gray-300">
                            튜토리얼
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/ask-corner/search">
                        <span
                            class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-gray-300">
                            질문
                        </span>
                    </NuxtLink>
                </nav>
                <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <NuxtLink
                        v-if="!user"
                        to="/login"
                        class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 dark:text-white">
                        로그인
                    </NuxtLink>

                    <User
                        @toggleSideDrawer="toggleSideDrawer"
                        v-if="user"
                        :user="user"
                        :isLoggedIn="isLoggedIn"
                        class="hidden md:block ml-5" />

                    <NuxtLink
                        v-if="!user"
                        to="/register"
                        class="transition duration-500 hover:scale-110 ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        회원가입
                    </NuxtLink>

                    <span
                        class="hidden md:block ml-5 cursor-pointer"
                        @click="setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')">
                        <i
                            class="ph-moon-stars-fill text-3xl text-gray-50 lg:block hover:dark:text-yellow-400 hover:text-yellow-400"
                            v-if="$colorMode.value === 'dark'" />
                        <i
                            class="ph-sun-dim-fill text-3xl lg:block hover:dark:text-yellow-400 hover:text-yellow-400"
                            v-if="$colorMode.value === 'light'" />
                    </span>
                </div>
            </div>
        </div>

        <!-- overlay -->
        <div
            v-if="showSideDrawer"
            id="modal_overlay"
            class="absolute inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0"></div>
        <!-- drawer component -->
        <transition name="slide-left" mode="in-out">
            <div
                v-if="showSideDrawer"
                ref="userDrawer"
                id="drawer-navigation my-12"
                class="box-shadow-7 fixed z-40 top-0 h-screen transition-all duration-700 p-4 overflow-y-auto w-80 bg-white dark:bg-slate-800"
                tabindex="-1"
                aria-labelledby="drawer-navigation-label">
                <h5
                    id="drawer-navigation-label"
                    class="text-base font-semibold text-gray-500 dark:text-gray-200 uppercase hover:dark:text-green-400 hover:text-green-400">
                    Menu
                </h5>

                <button
                    @click="showSideDrawer = false"
                    type="button"
                    data-drawer-dismiss="drawer-navigation"
                    aria-controls="drawer-navigation"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-500 dark:text-gray-200 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-black dark:hover:text-white">
                    <i class="ph-x text-2xl" />
                    <span class="sr-only">닫기</span>
                </button>

                <div class="py-4 overflow-y-auto my-12">
                    <ul class="space-y-2">
                        <li>
                            <User
                                v-if="user"
                                :user="user"
                                :isLoggedIn="isLoggedIn"
                                class="hidden md:block ml-5" />
                        </li>
                        <li>
                            <button
                                type="button"
                                class="text-gray-500 ml-2 mt-2"
                                @click="
                                    setColorTheme(
                                        $colorMode.preference === 'dark' ? 'light' : 'dark'
                                    )
                                ">
                                <i
                                    class="ph-moon-stars-fill text-2xl dark:text-yellow-200 lg:block hover:dark:text-yellow-400 hover:text-yellow-400"
                                    v-if="$colorMode.value === 'dark'" />
                                <i
                                    class="ph-sun-dim-fill text-2xl dark:text-yellow-200 text-orange-500 lg:block hover:dark:text-yellow-400 hover:text-yellow-400"
                                    v-if="$colorMode.value === 'light'" />
                            </button>
                        </li>
                        <li>
                            <NuxtLink to="https://github.com/c-owner/www.n-todo.com">
                                <img
                                    src="@/assets/images/icons8-github.png"
                                    alt="github"
                                    class="text-gray-500 dark:text-gray-200 h-6 w-6 ml-2 mt-2 hover:bg-blue-700" />
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/videos"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i class="ph-video-camera text-2xl" />

                                <span class="flex-1 ml-3 whitespace-nowrap">비디오</span>
                                <!-- <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span> -->
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/tutorials"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i class="ph-article text-2xl" />

                                <span class="flex-1 ml-3 whitespace-nowrap">튜토리얼</span>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/articles"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i class="ph-article text-2xl" />

                                <span class="flex-1 ml-3 whitespace-nowrap">게시판</span>
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/ask-corner/search"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i class="ph-question text-2xl" />
                                <span class="flex-1 ml-3 whitespace-nowrap">질문</span>
                            </NuxtLink>
                        </li>
                        <li v-if="!isLoggedIn">
                            <NuxtLink
                                to="/login"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i class="ph-sign-in text-2xl" />
                                <span class="flex-1 ml-3 whitespace-nowrap">로그인</span>
                            </NuxtLink>
                        </li>
                        <li v-if="!isLoggedIn">
                            <NuxtLink
                                to="/register"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i class="ph-sign-in text-2xl" />

                                <span class="flex-1 ml-3 whitespace-nowrap">회원가입</span>
                            </NuxtLink>
                        </li>
                        <li @click="logout" v-if="isLoggedIn">
                            <div
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i class="ph-sign-out text-2xl" />
                                <span class="flex-1 ml-3 whitespace-nowrap">로그아웃</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<style>
    body {
        background-color: #fff;
        color: rgba(0, 0, 0, 0.8);
    }

    .dark-mode body {
        background-color: #222222;
        color: #ebf4f1;
    }

    .sepia-mode body {
        background-color: #f1e7d0;
        color: #433422;
    }
</style>
