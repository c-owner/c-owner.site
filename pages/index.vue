<template>
    <div>
        <h1 class="hover:bg-black hover:text-white text-8xl">Index</h1>
        <span class="badge text-sm">Test</span>
    </div>
</template>

<script lang="ts">
const test: string = "test"

function testFunction() {
    console.log(test)
}

testFunction()
</script>

<style lang="postcss">
.badge {
    @apply bg-blue-500 text-white font-bold rounded-full px-3 py-1;
}
</style>
