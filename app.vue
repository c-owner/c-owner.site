<script setup lang="ts">
    import { useHead } from '#head';

    const nuxtApp = useNuxtApp();

    nuxtApp.hook('page:finish', () => {
        window.scrollTo(0, 0);
    });

    useHead({
        title: 'my first nuxt proj - corner',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/logo_clear_fsj.png' }]
    });
</script>

<template>
    <NuxtLayout>
        <div class="dark:bg-black min-h-screen dark:text-white">
            <NuxtPage />
        </div>
    </NuxtLayout>
</template>

<style>
    .page-enter-active,
    .page-leave-active {
        transition: all 0.4s;
    }

    .page-enter-from,
    .page-leave-to {
        opacity: 0;
        filter: blur(1rem);
    }

    .rotate-enter-active,
    .rotate-leave-active {
        transition: all 0.4s;
    }

    .rotate-enter-from,
    .rotate-leave-to {
        opacity: 0;
        transform: rotate3d(1, 1, 1, 15deg);
    }
</style>
