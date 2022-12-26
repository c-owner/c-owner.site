<script setup lang="ts">
    import { useFetch, useState } from '#app';
    import { reactive } from 'vue';

    const props = defineProps(['questionId', 'endpoint', 'answerData', 'showAnswerEditForm', 'selectIndex']);

    const emit = defineEmits<{
        (event: 'addAnswer', answer: BAnswer): void;
    }>();

    const questionId = props.questionId;
    const answerData: BAnswerPost = props.answerData;

    // @ts-ignore
    const data: BAnswerPost = reactive({
        text: answerData.text || '',
        questionId: questionId,
        id: answerData.id
    });

    const showAnswerForm = useState('showAnswerForm' + questionId);
    const showAnswerEditForm = useState('showAnswerEditForm' + props.selectIndex);

    async function postAnswer() {
        if (data.text.length < 3) {
            return;
        }
        if (!data.id) {
            delete data.id;
        }
        const answer = await $fetch(`${props.endpoint}`, { method: 'post', body: { data } });

        // @ts-ignore
        emit('addAnswer', answer);


        await cancelForm();
    }
    function cancelForm() {
        if (data.id) {
            showAnswerEditForm.value = false;
        } else {
            showAnswerForm.value = false;
        }
        showAnswerEditForm.value = false;
        data.text = '';
        data.questionId = questionId;
    }
</script>

<template>
    <form @submit.stop.prevent="postAnswer">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >답변</label
        >
        <textarea
            v-model="data.text"
            required
            id="message"
            rows="4"
            class="block w-full shadow-sm sm:text-sm resize-none p-4 border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
            placeholder="구체적이고 친절한 답변을 작성합니다."></textarea>
        <div class="flex justify-end">
            <button
                type="submit"
                class="mt-5 px-6 py-3.5 text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                작성
            </button>
            <button
                @click="cancelForm()"
                type="button"
                class="mt-5 px-6 py-3.5 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                취소
            </button>
        </div>
    </form>
</template>

<style scoped></style>
