<script setup lang="ts">
interface Props {
    text: string;
}
const props = defineProps<Props>();

const text = props.text;


</script>

<template>
    <div align="center">
        <div class="pt-10 pb-10">
            <img src="@/assets/images/icon/icons8-where-what-quest-100.png" alt="empty" width="100" />

            <h3 class="mt-5 text-lg font-medium text-gray-900 dark:text-gray-50">{{ text }}</h3>
        </div>
    </div>
</template>

<style scoped>

</style>
