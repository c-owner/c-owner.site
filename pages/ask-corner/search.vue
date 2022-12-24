<script setup lang="ts">

</script>

<template>
    <div class="min-h-screen">
        <div class="h-32 flex justify-center">
            <div class="flex m-5">
                <img class="mx-auto h-24 w-auto" src="/img/logo_clear_fsj.png" alt="full logo" />
                <h1 class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-white ml-4">
                    질문
                </h1>
            </div>
        </div>

        <div class="md:flex min-h-full">
            <ElementsAskSidebar />

            <div class="md:w-1/3 z-1 flex justify-right relative"></div>
        </div>

    </div>
</template>
