<script setup lang="ts">
    import { ref } from '@vue/reactivity';
    import type { Ref } from 'vue';
    import { loginWithEmail } from '~/composables/useAuth';
    import CornerLogo from '~/components/layout/CornerLogo.vue';
    import { onMounted } from 'vue';

    const usernameOrEmail = ref('');
    const password = ref('');
    const rememberId = ref(false);
    const showFindPw = ref(false);

    const errors: Ref<Map<string, { message: InputValidation }> | undefined> = ref(
        new Map<string, { message: InputValidation }>()
    );
    let response: FormValidation;

    async function formRememberImport() {
        usernameOrEmail.value = localStorage.getItem('corner_id') || '';
        password.value = localStorage.getItem('corner_pw') || '';
    }

    onMounted(() => {
        if (localStorage.getItem('corner_id') && localStorage.getItem('corner_pw')) {
            formRememberImport();
            rememberId.value = true;
        } else {
            rememberId.value = false;
        }
    });

    async function postLoginForm() {
        response = await loginWithEmail(usernameOrEmail.value, password.value);
        if (rememberId.value && !response.errors) {
            localStorage.setItem('corner_id', usernameOrEmail.value);
            localStorage.setItem('corner_pw', password.value);
        }
        if (rememberId.value === false) {
            localStorage.removeItem('corner_id');
            localStorage.removeItem('corner_pw');
        }
        errors.value = response.errors;
    }
    function closeFindPw() {
        showFindPw.value = false
    }
</script>

<template>
    <div class="h-screen">
        <div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full">
                <CornerLogo />
                <div>
                    <h2 class="text-center text-3xl font-extrabold mt-5">로그인</h2>
                </div>
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

                <form
                    @submit.stop.prevent="postLoginForm"
                    class="mt-8 space-y-6"
                    action="#"
                    method="POST">
                    <div class="rounded-md shadow-sm -space-y-px mb-1">
                        <div>
                            <label for="email-address" class="sr-only"> 이메일 또는 닉네임 </label>
                            <input
                                v-model="usernameOrEmail"
                                id="email-address"
                                name="email"
                                required
                                class="appearance-none dark:bg-slate-500 dark:text-white dark:placeholder-white rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                :class="errors?.has('usernameOrEmail') ? ' border-red-500' : ''"
                                placeholder="이메일 또는 닉네임" />
                        </div>
                    </div>
                    <div>
                        <label for="password" class="sr-only"> 비밀번호 </label>
                        <input
                            type="password"
                            v-model="password"
                            name="password"
                            id="password"
                            class="appearance-none dark:bg-slate-500 dark:text-white dark:placeholder-white rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            :class="errors?.has('password') ? ' border-red-500' : ''"
                            placeholder="비밀번호" />
                    </div>

                    <div class="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            v-model="rememberId"
                            class="w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label
                            for="remember"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                            >기억하기</label
                        >
                    </div>

                    <button
                        type="submit"
                        class="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <!-- Heroicon name: solid/lock-closed -->
                            <i
                                class="ph-lock-simple-fill h-5 w-5 text-indigo-500 group-hover:text-indigo-400 items-center" />
                        </span>
                        로그인
                    </button>
                </form>

                <div class="mt-3 mb-3">
                    <button type="button" @click="showFindPw = true;" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        비밀번호를 잊으셨나요?
                    </button>
                </div>


            </div>
        </div>

<!--        findPws Modal wrap -->
        <transition name="fade">
            <AuthFindPassword v-if="showFindPw" @closeFindPw="closeFindPw()" :showFindPw="showFindPw" />
        </transition>

    </div>
</template>
