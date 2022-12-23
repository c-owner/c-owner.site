<script setup lang="ts">
    const str: string = 'test';
</script>

<template>
    <div class="mx-auto text-center">
        <div class="py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <img class="w-auto w-[50%] mx-auto transition duration-500 scale-50 md:hover:scale-90" src="/img/logo_short.png" alt="dude image" />

                    <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight md:text-7xl dark:text-white">
                        Corner
                        <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal400 hover:from-green-500 hover:to-teal-400">
                            TODO, VIDEOS
                        </span>
                    </p>

                </div>
            </div>
            <h1>Index</h1>
            <div class="badge">touch</div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
    .badge {
        @apply inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200;

        &:hover {
            @apply bg-gray-300;
        }
    }
</style>
