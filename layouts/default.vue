<script setup lang="ts">
    import Navbar from '@/components/layout/navbar.vue';
</script>

<template>
    <div class="dark:bg-black">
        <Navbar/>

        <slot/>
    </div>
</template>
