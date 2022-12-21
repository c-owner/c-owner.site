<script setup lang="ts">

import type { Ref } from "vue";

const errors: Ref<Map<String, { message: InputValidation; }> | undefined> = ref(new Map<string, { message: InputValidation }>())

</script>

<template>
    <div class="dark:bg-black h-screen">
        <div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full">

                <div class="lg:flex mt-10">
                    <img class="mx-auto h-24 w-auto" src="/img/logo_clear_fsj.png" alt="logo" />
                    <h1 class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-gray-400">
                        Corner
                    </h1>
                </div>
                <div>
                    <h2 class="text-center text-3xl font-extrabold mt-5 text-gray-900 dark:text-white">
                        회원가입
                    </h2>
                </div>

                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3" role="alert">
                    <ul class="block sm:inline">
                        <li v-for="[key, value] in errors">
                            {{ value.message }}
                        </li>
                    </ul>
                </div>

            </div>
        </div>

    </div>
</template>
