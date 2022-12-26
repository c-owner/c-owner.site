<script setup lang="ts">
import { ref } from "vue";
import { useFetch } from "#app";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


const searchInput = ref("");

const { data: questions, pending, refresh, error } = await useFetch<BQuestion[]>(() => `/api/ask-corner/search?search=${searchInput.value}`, {server:false})

function search() {
    if (searchInput.value.length >= 3) {
        refresh()
    }
}

function questionFromDate(date: Date) {
    return dayjs(date).fromNow()
}

function filterComma(text: string) {
    return text.replace(/,/g, "")
}

</script>

<template>
    <div class="sm:ml-auto sm:mr-0 sm:w-2/3 md:ml-0 md:mr-0 md:w-2/3 lg:w-[50%] p-3">
        <div>
            <div class="flex m-5">
                <label for="search-dropdown"
                       class="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-gray-300">
                    질문 검색
                </label>
                <div class="relative w-full">
                    <input v-model="searchInput" @input="search" type="search" id="search-dropdown"
                           class="block p-2.5 w-full focus:outline-none z-20 text-sm text-slate-900 bg-slate-50 rounded-lg border-solid border-2 border-indigo-600 dark:bg-gray-900 dark:text-gray-300"
                           placeholder="질문 검색하기.." />
                    <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium dark:text-white">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <transition name="fade" v-if="!pending" v-for="question in questions" :key="question.id">
            <NuxtLink v-if="question"
                      :to="`/ask-corner/question/${question.id}`"
                      class="flex flex-column justify-center hover:scale-110 transition duration-500">
                <div class="max-w-xxl w-full p-4">
                    <div class="p-8 bg-white dark:bg-slate-700 rounded-lg shadow-md">
                        <span class="font-bold text-sm">
                            No.{{ filterComma(question.id.toString()) }}
                        </span>
                        <div class="flex justify-end items-center text-gray-400 dark:text-gray-300 mb-5">
                            <span class="font-bold text-sm">
                                {{ question.authName }} <span class="font-normal italic">{{ questionFromDate(question.createdAt) }}</span>
                            </span>
                            <span class="ml-3 text-sm font-medium dark:text-yellow-200" v-if="question.totalAnswer > 0">
                                이 글에 달린 {{ question.totalAnswer }}개의 답변
                            </span>
                            <span class="ml-3 text-sm font-medium dark:text-gray-400" v-else>
                                답변이 없습니다.
                            </span>

                        </div>

                        <BoardTiptap :data="question" label="" :editable="false" />

                    </div>
                </div>
            </NuxtLink>

        </transition>

    </div>
</template>

<style scoped></style>
