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
    <nuxt-layout>
        <nuxt-page />
    </nuxt-layout>
</template>
