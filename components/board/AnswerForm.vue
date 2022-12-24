<script setup lang="ts">

import { useState } from "#app";
import { reactive } from "vue";

const props = defineProps(['questionId'])

const addAnswer = 'addAnswer';
const emit = defineEmits<{ (e: typeof addAnswer, answer: BAnswer): void }>()

const questionId = props.questionId

const data: BAnswerPost = reactive({
  text: '',
  questionId: parseInt(questionId)
})

const showAnswerForm = useState('showAnswerForm' + questionId)

async function postAnswer() {
    const answer = await $fetch(`/api/ask-corner/answer`, { method: 'post', body: { data } });

    const newAnswer = useState('newAnswer')
    newAnswer.value = answer

    emit('addAnswer', answer)
    data.text = ''


}



</script>

<template>
    <form @submit.stop.prevent="postAnswer">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">답변</label>
        <textarea v-model="data.text" id="message" rows="4"
                  class="block w-full shadow-sm sm:text-sm resize-none p-4 border-gray-300 rounded-md focus:outline-none
                  focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                  placeholder="구체적이고 친절한 답변을 작성합니다."></textarea>
        <div class="flex justify-end">
            <button @click="postAnswer"
                    class="mt-5 px-6 py-3.5 text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    type="submit">
                작성
            </button>
            <button @click="showAnswerForm = !showAnswerForm" type="button"
                    class="mt-5 px-6 py-3.5 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                취소
            </button>
        </div>
    </form>
</template>

<style scoped>

</style>
