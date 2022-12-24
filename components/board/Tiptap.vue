<script setup lang="ts">
    import { defineProps } from 'vue';

    const props = defineProps({
        data: {
            type: Object,
            default: {
                title: '',
                description: ''
            }
        },
        label: {
            type: String,
            default: ''
        },
        editable: {
            type: Boolean,
            default: false
        }
    });

    const data = props.data;
</script>

<template>
    <div>
        <label
            for="message"
            class="block mb-2 ml-5 text-sm font-medium text-gray-900 dark:text-gray-400"
            >{{ label }}</label
        >
        <form class="mt-3" v-if="editable">
            <div class="rounded-md shadow-sm -space-y-px mb-5">
                <div class="mt-5 mb-5">
                    <input
                        v-model="data.title"
                        name="title"
                        id="title"
                        class="focus:outline-none rounded-lg w-4/5 p-3 bg-white dark:bg-gray-900 dark:text-white"
                        placeholder="제목" />
                </div>
            </div>
            <div
                class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div class="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                    <label for="editor" class="sr-only">Publish post</label>
                    <textarea
                        id="editor"
                        v-model="data.description"
                        rows="8"
                        class="block w-full resize-none px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                        placeholder="Write an article..."
                        required></textarea>
                </div>
            </div>
        </form>
        <div v-else>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-300 mb-5">
                {{ data.title }}
            </h2>

            <div
                class="block py-6 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-html="data.description"></div>
        </div>
    </div>
</template>
