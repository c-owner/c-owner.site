<script setup lang="ts">

import { reactive } from "vue";


const data: BQuestionPost = reactive({
    title: "",
    description: ""
});

const endpoint = "/api/ask-corner/ask";

</script>
<template>
    <div
        class="min-h-full">

        <div class="h-32 flex justify-center">
            <div class="flex m-5">
                <img class="mx-auto h-24 w-auto" src="/img/logo_clear_fsj.png" alt="full stack jack logo" />
                <h1 class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-white ml-4">
                    질문하세요
                </h1>
            </div>
        </div>
        <div class="md:flex">

            <ElementsAskSidebar />
            <div class="sm:w-1/3 lg:w-1/4 z-1 flex justify-right relative"></div>
            <div class="ml-auto mr-0 sm:w-2/3 md:w-2/3 lg:w-[50%] p-3 h-screen">
                <BoardQuestionForm :data="data" :endpoint="endpoint" />
            </div>
        </div>
    </div>
</template>
