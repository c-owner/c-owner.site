<script setup lang="ts">
    import { ref } from 'vue';
    import { refreshNuxtData, useFetch, useRoute, useRouter, useState } from "#app";
    import { useLoggedIn, useUser } from '~/composables/useAuth';
    import Tiptap from "~/components/board/Tiptap.vue";
    import dayjs from "dayjs";

    const router = useRouter();
    const route = useRoute();
    const questionId = route.params.id;
    const me = await useUser();
    const showDeleteQuestion = ref(false);
    const showDeleteAnswer = ref(false);
    const answerData = ref({} as BAnswerPost);


    const isLoggedIn = await useLoggedIn();

    const { data: question, refresh } = await useFetch<BQuestion>(
        `/api/ask-corner/question?id=${questionId}`,
        { key: route.fullPath }
    );

    const showAnswerForm = useState('showAnswerForm' + questionId, () => false);
    let selectIndex = null;
    const showAnswerEditForm = useState('showAnswerEditForm' + selectIndex, () => false);
    const showEditForm = useState('showEditForm', () => false);

    const isMine = question?.value?.authorId == me?.id;

    async function deleteQuestion() {
        const { data: deleted } = await useFetch('/api/ask-corner/delete-question', {
            method: 'POST',
            body: { questionId }
        });

        showDeleteQuestion.value = true;
        setTimeout(() => {
            router.push('/ask-corner/search');
        });
    }

    const editEndPoint = '/api/ask-corner/edit-question';

    async function addAnswer(answer: BAnswer) {
        await question.value?.answers.push(answer);
        answerData.value = {} as BAnswerPost;

        showAnswerEditForm.value = false;
        showAnswerForm.value = false;
        await refresh();
    }

    function updatedCheck(created: Date, updated: Date) {
        if (dayjs(created).isSame(dayjs(updated))) {
            return {
                type: false,
                date: dayjs(created).format("YYYY-MM-DD HH:mm")
            };
        } else {
            return {
                type: true,
                date: dayjs(updated).format("YYYY-MM-DD HH:mm")
            };
        }
    }

    let answerPoint = '/api/ask-corner/answer';
    function actionEditAnswer(answer: BAnswerPost, index: number) {
        if (!answer) {
            answerData.value = {} as BAnswerPost;
            answerPoint = '/api/ask-corner/answer';
            showAnswerForm.value = true;
            showAnswerEditForm.value = false;
        } else {
            answerData.value = answer;
            answerPoint = '/api/ask-corner/edit-answer';
            selectIndex = index;
            showAnswerForm.value = false;
            showAnswerEditForm.value = true;
        }

    }

    async function deleteAnswer(id: number) {
        const { data: deleted } = await useFetch('/api/ask-corner/delete-answer', {
            method: 'DELETE',
            body: { id }
        });

        showDeleteAnswer.value = true;
        setTimeout(() => {
            showDeleteAnswer.value = false
        }, 1000)
        await refresh();
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
                    v-if="showDeleteQuestion">
                    질문 삭제
                </div>

                <div
                    class="flex flex-column justify-center hover:scale-110 transition duration-500"
                    v-if="question">
                    <div class="max-w-xxl w-full p-4">
                        <div class="p-8 bg-white dark:bg-slate-700 rounded shadow-md">
                            <div class="flex justify-between dark:text-gray-300 text-sm">
                                <span class="font-bold text-sm">
                                    {{ question.authName }}
                                    &nbsp;{{ updatedCheck(question.createdAt, question.updatedAt).date }}
                                    <span class="text-gray-400 font-normal" v-if="updatedCheck(question.createdAt, question.updatedAt).type">
                                        <br/>(수정됨)
                                    </span>
                                </span>
                                <span class="ml-3 text-sm dark:text-yellow-200" v-if="question.totalAnswer > 0">
                                    답변: {{ question.totalAnswer }}
                                </span>
                            </div>

                            <BoardTiptap v-if="!showEditForm" :data="question" label="" :editable="false" />

                            <div class="flex justify-between">
                                <div class="mt-5" v-if="isMine && showEditForm == false">
                                    <button @click="showEditForm = true" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded">
                                        수정
                                    </button>
                                    <button @click="deleteQuestion" class="bg-red-500 ml-3 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded">
                                        삭제
                                    </button>

                                </div>
                                <div class="flex justify-end mt-5">
                                    <button v-if="isLoggedIn && !isMine" @click="actionEditAnswer(null, null)"
                                            class="text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 py-2 px-2
                                            focus:outline-none focus:ring-indigo-200 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm text-center"
                                            type="button">
                                        답변하기
                                    </button>
                                </div>
                            </div>

                            <BoardQuestionForm :endpoint="editEndPoint" :data="question" :showEditForm="showEditForm" @refresh="refresh"
                                               v-if="showEditForm" />
                        </div>
                    </div>
                </div>
                <div v-if="showAnswerForm" :key="`answerForm-${answerData.id}`">
                    <BoardAnswerForm :questionId="questionId" :answerData="answerData" :endpoint="answerPoint" @addAnswer="addAnswer" />
                </div>

                <div
                    class="p-8 text-white bg-lime-600 dark:bg-black rounded shadow-md mb-3 mt-3 transition duration-500"
                    v-if="showDeleteAnswer">
                    답변 삭제
                </div>

                <div v-for="(answer, answer_index) in question?.answers" :key="`answerList-${answer.id}`"
                     class="flex flex-column justify-center hover:scale-110 transition duration-500">
                    <div class="max-w-xxl w-full p-4">

                        <div class="p-8 bg-white dark:bg-slate-900 rounded shadow-md">
                            <div class="flex justify-end dark:text-gray-300 text-sm">
                                <span class="font-bold text-sm dark:text-blue-200">
                                    {{ answer.authorName }}
                                    &nbsp;{{ updatedCheck(question.createdAt, question.updatedAt).date }}
                                </span>
                            </div>

                            <div v-if="showAnswerEditForm && selectIndex === answer_index" :key="`answerForm-${answerData.id}`">
                                <BoardAnswerForm :questionId="questionId" :answerData="answerData" :showAnswerEditForm="showAnswerEditForm" :selectIndex="selectIndex"
                                                 :endpoint="answerPoint" @addAnswer="addAnswer" />
                            </div>
                            <p v-else
                                class="mt-2 dark:text-gray-300 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg" v-html="answer.text"></p>

                            <div class="flex justify-end">
                                <div class="mt-2" v-if="answer.authorId === me?.id">
                                    <button @click="actionEditAnswer(answer, answer_index)" class="hover:text-indigo-700 text-indigo font-bold py-2 px-2 rounded">
                                        수정
                                    </button>
                                    <button @click="deleteAnswer(answer.id)" class="ml-3 text-red-500 hover:text-indigo-700 font-bold py-2 px-2 rounded">
                                        삭제
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>



            </div>
        </div>
    </div>
</template>
