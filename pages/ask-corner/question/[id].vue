<script setup lang="ts">
    import { ref } from 'vue';
    import { useFetch, useRoute, useRouter, useState } from '#app';
    import { useLoggedIn, useUser } from '~/composables/useAuth';
    import Tiptap from "~/components/board/Tiptap.vue";

    const router = useRouter();
    const route = useRoute();
    const questionId = route.params.id;
    const me = await useUser();
    const showEditForm = ref(false);
    const showDeleted = ref(false);
    const showAnswerButton = ref(false);

    const isLoggedIn = await useLoggedIn();

    const { data: question } = await useFetch<BQuestion>(
        `/api/ask-corner/question?id=${questionId}`,
        { key: route.fullPath }
    );

    const showAnswerForm = useState('showAnswerForm' + questionId, () => false);
    const isMine = question?.value?.authorId == me?.id;

    async function deleteQuestion() {
        const { data: deleted } = await useFetch('/api/ask-corner/delete-question', {
            method: 'POST',
            body: { questionId }
        });

        showDeleted.value = true;
        setTimeout(() => {
            router.push('/ask-corner/search');
        });
    }

    const editEndPoint = '/api/ask-corner/edit-question';
    function addAnswer(answer: BAnswer) {
        question.value?.answers.push(answer);
        showAnswerForm.value = false;
    }
</script>

<template>
    <div class="min-h-full">
        <div class="h-32 flex justify-center">
            <div class="flex m-5">
                <img class="mx-auto h-24 w-auto" src="/img/logo_clear_fsj.png" alt="full logo" />
                <h1
                    class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-white ml-4">
                    질문
                </h1>
            </div>
        </div>

        <div class="md:flex">
            <ElementsAskSidebar />
            <div class="md:w-1/3 z-1 flex justify-right relative"></div>
            <div class="w-full md:w-1/3">
                <div
                    class="p-8 text-white bg-lime-600 dark:bg-black rounded shadow-md"
                    v-if="showDeleted">
                    질문 삭제
                </div>

                <div
                    class="flex flex-column justify-center hover:scale-110 transition duration-500"
                    v-if="question">
                    <div class="max-w-xxl w-full p-4">
                        <div class="p-8 bg-white dark:bg-slate-700 rounded shadow-md">
                            <div class="flex justify-between dark:text-gray-300 text-sm">
                                <span>
                                    No. {{ question.id }}
                                </span>
                                <span class="dark:text-indigo-300">
                                    {{ question.authName }}
                                </span>
                            </div>

                            <BoardTiptap v-if="!showEditForm" :data="question" label="" :editable="false" />

                            <div class="mt-5" v-if="isMine && showEditForm == false">
                                <button @click="showEditForm = true" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded">
                                    수정
                                </button>
                                <button @click="deleteQuestion" class="bg-red-500 ml-3 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded">
                                    삭제
                                </button>
                            </div>

                            <BoardQuestionForm :endpoint="editEndPoint" :data="question" :showEditForm="showEditForm" v-if="showEditForm" />
                        </div>
                    </div>
                </div>

                <div v-for="answer in question?.answers" :key="answer.id"
                     class="flex flex-column justify-center hover:scale-110 transition duration-500">
                    <div class="max-w-xxl w-full p-4">

                        <div class="p-8 bg-white dark:bg-slate-900 rounded shadow-md">
                            <div class="flex justify-end dark:text-gray-300 text-sm">
                                <span class="dark:text-blue-200">
                                    {{ answer.authorName }}
                                </span>
                            </div>
                            <p class="dark:text-gray-300" v-html="answer.text"></p>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end">
                    <button v-if="!showAnswerForm && isLoggedIn" @click="showAnswerForm = !showAnswerForm"
                            class="text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-indigo-200 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            type="button">
                        답변하기
                    </button>
                </div>

                <div v-if="showAnswerForm">
                    <BoardAnswerForm :questionId="questionId" @addAnswer="addAnswer" />
                </div>

            </div>
        </div>
    </div>
</template>
