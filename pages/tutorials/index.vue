<script setup lang="ts">
const str: string = 'test';
</script>

<template>
    <div>
        <div class="">
            <div class="py-12 theme-mode dark:bg-black">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center">

                        <img class="w-auto" src="~/assets/images/maxresdefault.jpg" alt="dude image"/>

                        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight md:text-7xl dark:text-white">
                            Corner
                            <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal400 hover:from-green-500 hover:to-teal-400">
                        Step by Step Test</span>
                        </p>


                    </div>
                </div>
            </div>
        </div>
        <DevOnly>
            <div>
                개발환경에만 보임
            </div>
        </DevOnly>
        <h1>Index</h1>
        <div class="badge">touch</div>

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
