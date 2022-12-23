<script setup lang="ts">
    import { ref } from '@vue/reactivity';
    import { registerWithEmail } from '~/composables/useAuth';
    import type { Ref } from 'vue';
    import CornerLogo from "~/components/layout/CornerLogo.vue";

    const email: Ref<string> = ref('');
    const password: Ref<string> = ref('');
    const username: Ref<string> = ref('');
    const name: Ref<string> = ref('');

    const errors: Ref<Map<string, { message: InputValidation }> | undefined> = ref(
        new Map<string, { message: InputValidation }>()
    );
    let response: FormValidation;

    async function postRegisterForm() {
        response = await registerWithEmail(username.value, name.value, email.value, password.value);
        errors.value = response.errors;
    }
</script>

<template>
    <div class="dark:bg-black h-screen">
        <div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full">
                <CornerLogo />
                <div>
                    <h2 class="text-center text-3xl font-extrabold mt-5">회원가입</h2>
                </div>

                <!--                 error alert -->
                <div
                    v-if="response?.hasErrors && errors"
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3"
                    role="alert">
                    <ul class="block sm:inline">
                        <li v-for="[key, value] in errors">
                            {{ value.message }}
                        </li>
                    </ul>
                </div>

                <form @submit.prevent.stop class="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" value="true" />
                    <div class="rounded-md shadow-sm -space-y-px mb-1">
                        <div>
                            <label for="name" class="sr-only">이름</label>
                            <input
                                v-model="name"
                                id="name"
                                name="name"
                                required
                                class="appearance-none dark:bg-slate-500 dark:text-white dark:placeholder-white rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                :class="errors?.has('name') ? ' border-red-500' : ''"
                                placeholder="이름" />
                        </div>
                    </div>
                    <div class="rounded-md shadow-sm -space-y-px mb-1">
                        <div>
                            <label for="username" class="sr-only">닉네임</label>
                            <input
                                v-model="username"
                                id="username"
                                name="username"
                                required
                                class="dark:bg-slate-500 dark:text-white dark:placeholder-white appearance-none rounded-none relative block w-full
                                px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                :class="errors?.has('username') ? ' border-red-500' : ''"
                                placeholder="닉네임" />
                        </div>
                    </div>

                    <div class="rounded-md shadow-sm -space-y-px mb-1">
                        <div>
                            <label for="email-address" class="sr-only">이메일</label>
                            <input
                                v-model="email"
                                id="email-address"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                                class="dark:bg-slate-500 dark:text-white dark:placeholder-white appearance-none rounded-none relative block w-full
                                px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                :class="errors?.has('email') ? ' border-red-500' : ''"
                                placeholder="이메일" />
                        </div>
                    </div>
                    <div>
                        <label for="password" class="sr-only">비밀번호</label>
                        <input
                            v-model="password"
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            required
                            class="dark:bg-slate-500 dark:text-white dark:placeholder-white appearance-none rounded-none relative block w-full
                            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            :class="errors?.has('password') ? ' border-red-500' : ''"
                            placeholder="비밀번호" />
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="text-sm">
                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                                비밀번호 찾기
                            </a>
                        </div>
                    </div>

                    <div></div>
                </form>

                <button type="submit"
                    @click.prevent="postRegisterForm"
                    class="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <!-- Heroicon name: solid/lock-closed -->
                        <i class="ph-lock-simple-fill h-5 w-5 text-indigo-500 group-hover:text-indigo-400 items-center" />
                    </span>
                    가입하기
                </button>
            </div>
        </div>
    </div>
</template>
