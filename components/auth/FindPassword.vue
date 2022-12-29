<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import { onClickOutside } from '@vueuse/core';
    import { useFetch } from '#app';
    import { findWithEmail, loginWithEmail } from "~/composables/useAuth";

    const email = ref('');
    const verifyNumber = ref('');

    const findPwModal = ref(null); // ref to the modal element
    const emit = defineEmits({
        // emit 정의
        closeFindPw: () => true // 닫기 함수
    });

    const errors: Ref<Map<string, { message: InputValidation }> | undefined> = ref(
        new Map<string, { message: InputValidation }>()
    );
    let response: FormValidation;

    onClickOutside(findPwModal, () => {
        closeModal();
    });
    function closeModal() {
        emit('closeFindPw');
    }

    async function findEmail() {
        response = await findWithEmail(email.value);
        // return true;
        errors.value = response.errors;
    }

    async function findAction() {
        await findEmail();

        if (errors) {
            return;
        }
        return;
        await useFetch('/api/auth/find-password', {
            method: 'POST',
            body: { email: email.value, verifyNumber: verifyNumber.value }
        });
    }
</script>

<template>
    <div class="fade duration-700">
        <div class="modal" id="find-modal">
            <div
                ref="findPwModal"
                style="width: fit-content; height: fit-content"
                class="fixed z-20 pb-20 m-auto inset-x-0 inset-y-0 p-4 dark:bg-gray-800 bg-white rounded-sm overflow-y-scroll">
                <div
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3"
                    role="alert"
                    v-if="response?.hasErrors && errors">
                    <ul class="block sm:inline">
                        <li v-for="[key, value] in errors">
                            {{ value.message }}
                        </li>
                    </ul>
                </div>

                <!--                top area -->
                <div class="flex items-center text-black">
                    <div class="text-3xl font-noto-sans-kr font-medium dark:text-white pr-40">
                        비밀번호 찾기
                    </div>
                    <button
                        @click="closeModal()"
                        class="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:scale-110 duration-700 focus:outline-none">
                        <i
                            class="ph-x-circle-fill text-3xl text-blue-darken-4 dark:text-indigo-400 dark:text-white vertical-bottom" />
                    </button>
                </div>

                <!--                content area -->
                <form @submit.stop.prevent="findAction()" method="post" class="mt-8 space-y-6">
                    <div class="rounded-md shadow-sm -space-y-px mb-1">
                        <div>
                            <label for="email-address" class="sr-only"> 이메일 </label>
                            <input
                                v-model="email"
                                id="email-address"
                                type="email"
                                name="email"
                                required
                                class="appearance-none dark:bg-slate-500 dark:text-white dark:placeholder-white rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                :class="errors?.has('email') ? ' border-red-500' : ''"
                                placeholder="이메일" />
                        </div>
                    </div>
                    <div>
                        <label for="verifyNumber" class="sr-only"> 인증번호 </label>
                        <input
                            type="number"
                            v-model="verifyNumber"
                            name="verifyNumber"
                            id="verifyNumber"
                            class="appearance-none dark:bg-slate-500 dark:text-white dark:placeholder-white rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="인증번호" />
                    </div>

                    <button
                        type="submit"
                        class="w-full font-d2-coding text-center ml-auto text-gray-50 hover:text-white rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 bg-indigo-600 dark:bg-gradient-to-r dark:from-indigo-500 hover:bg-indigo-800 dark:text-gray-200 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
                        찾기
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
