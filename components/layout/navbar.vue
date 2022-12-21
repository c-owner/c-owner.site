<script setup lang="ts">
    import { useState } from '#app';

    const styleCode: string =
        'color: #FFF;background-color: darkslategrey;width=250px;height:150px;font-size:34px;';
    console.log('%c Todo ', styleCode);

    const showSideDrawer = ref(false);
    const router = useRouter();

    router.afterEach(() => {
        showSideDrawer.value = false;
    });

    const colorMode = useColorMode();

    const user = useState('user');
    const setColorTheme = (newTheme: Theme) => {
        colorMode.preference = newTheme;
    };
</script>

<template>
    <div class="navbar relative dark:bg-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
            <div class="flex justify-between border-b-2 border-gray-100">
                <div class="flex justify-between min-w-full md:min-w-0">
                    <div class="md:hidden mt-4">
                        <button
                            @click="showSideDrawer = true"
                            type="button"
                            class="bg-white rounded-md p-2 inline-flex text-gray-400 hover:text-gray-500 dark:bg-black dark:text-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded="false">
                            <span class="sr-only dark:bg-black">Open menu</span>
                            <svg
                                class="h-6 w-6 dark:bg-black"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <div class="">
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
                        <span class="text-base font-medium text-gray-500 hover:text-gray-900">
                            Todos
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/categories">
                        <span class="text-base font-medium text-gray-500 hover:text-gray-900">
                            Videos
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/tutorials">
                        <span class="text-base font-medium text-gray-500 hover:text-gray-900">
                            State in Nuxt
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/ask-jack/search">
                        <span class="text-base font-medium text-gray-500 hover:text-gray-900">
                            Ask Corner
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/dashboard">
                        <span class="text-base font-medium text-gray-500 hover:text-gray-900">
                            Dashboard
                        </span>
                    </NuxtLink>
                </nav>
                <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <NuxtLink
                        v-if="!user"
                        to="/login"
                        class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                        Sign in
                    </NuxtLink>

                    <!--                    <User v-if='user' :user='user' />-->

                    <NuxtLink
                        v-if="!user"
                        to="/register"
                        class="transition duration-500 hover:scale-110 ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        Sign up
                    </NuxtLink>

                    <!-- <a class="ml-5" href="https://github.com/jurassicjs/nuxt3-laravel-dev" target="_blank">
                      <img class="h-8 w-auto sm:h-10" src="~/public/img/github-logo.png" />
                    </a> -->
                    <span
                        class="hidden md:block ml-8 cursor-pointer"
                        @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')">
                        <svg
                            v-if="$colorMode.value == 'dark'"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 text-gray-50 hidden lg:block hover:dark:text-yellow-400 hover:text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                        <svg
                            v-if="$colorMode.value == 'light'"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 hidden lg:block hover:dark:text-yellow-400 hover:text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor ">
                            <path
                                fill-rule="evenodd"
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>

        <!-- drawer component -->
        <div
            id="drawer-navigation my-12"
            :class="{ hidden: !showSideDrawer }"
            class="fixed z-40 top-0 h-screen transition-all duration-700 p-4 overflow-y-auto bg-white w-80 dark-mode dark:bg-black dark:bg-slate-800"
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
                <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close menu</span>
            </button>

            <div class="py-4 overflow-y-auto my-12 dark-mode dark:bg-slate-800">
                <ul class="space-y-2">
                    <li>
                        <button
                            class="ml-2"
                            @click="
                                setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')
                            ">
                            <svg
                                v-if="$colorMode.value == 'dark'"
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 text-gray-500 dark:text-gray-200"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                            <svg
                                v-if="$colorMode.value == 'light'"
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 text-gray-500 dark:text-gray-200"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </li>
                    <NuxtLink to="https://github.com/c-owner/www.n-todo.com">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            class="text-gray-500 dark:text-gray-200 h-6 w-6 ml-2 mt-2"
                            width="0.97em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 496 512">
                            <path
                                fill="currentColor"
                                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6c-3.3.3-5.6-1.3-5.6-3.6c0-2 2.3-3.6 5.2-3.6c3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9c2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9c.3 2 2.9 3.3 5.9 2.6c2.9-.7 4.9-2.6 4.6-4.6c-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2c12.8 2.3 17.3-5.6 17.3-12.1c0-6.2-.3-40.4-.3-61.4c0 0-70 15-84.7-29.8c0 0-11.4-29.1-27.8-36.6c0 0-22.9-15.7 1.6-15.4c0 0 24.9 2 38.6 25.8c21.9 38.6 58.6 27.5 72.9 20.9c2.3-16 8.8-27.1 16-33.7c-55.9-6.2-112.3-14.3-112.3-110.5c0-27.5 7.6-41.3 23.6-58.9c-2.6-6.5-11.1-33.3 2.6-67.9c20.9-6.5 69 27 69 27c20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27c13.7 34.7 5.2 61.4 2.6 67.9c16 17.7 25.8 31.5 25.8 58.9c0 96.5-58.9 104.2-114.8 110.5c9.2 7.9 17 22.9 17 46.4c0 33.7-.3 75.4-.3 83.6c0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252C496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2c1.6 1.6 3.9 2.3 5.2 1c1.3-1 1-3.3-.7-5.2c-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9c1.6 1 3.6.7 4.3-.7c.7-1.3-.3-2.9-2.3-3.9c-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2c2.3 2.3 5.2 2.6 6.5 1c1.3-1.3.7-4.3-1.3-6.2c-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9c1.6 2.3 4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2c-1.4-2.3-4-3.3-5.6-2z"></path>
                        </svg>
                    </NuxtLink>
<!--                    <NuxtLink to="https://instagram.com/ck__hoon">
                        <svg
                            class="text-gray-500 dark:text-gray-200 h-6 w-6 ml-2 mt-2"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="img"
                            width="0.97em"
                            height="1em"
                            viewBox="0 0 24 24">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                                fill="currentColor" />
                        </svg>
                    </NuxtLink>-->
                    <li>
                        <NuxtLink
                            to="/videos"
                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6">
                                <path
                                    stroke-linecap="round"
                                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                            </svg>

                            <span class="flex-1 ml-3 whitespace-nowrap">Video</span>
                            <!-- <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span> -->
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/tutorials"
                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                            </svg>

                            <span class="flex-1 ml-3 whitespace-nowrap">Tutorials</span>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/articles"
                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                            </svg>

                            <span class="flex-1 ml-3 whitespace-nowrap">Articles</span>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/ask-corner/search"
                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                            <span class="flex-1 ml-3 whitespace-nowrap">Ask Corner</span>
                        </NuxtLink>
                    </li>
                    <li v-if="!isLoggedIn">
                        <NuxtLink
                            to="/login"
                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            <span class="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                        </NuxtLink>
                    </li>
                    <li v-if="!isLoggedIn">
                        <NuxtLink
                            to="/register"
                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>

                            <span class="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                        </NuxtLink>
                    </li>
                    <li @click="logout" v-if="isLoggedIn">
                        <span
                            to="/register"
                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            <span class="flex-1 ml-3 whitespace-nowrap">logout</span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
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
