<script setup lang="ts">
import DialogBox from "~/components/elements/DialogBox.vue";
import { useRoute, useRouter } from "#app";
import { useLoggedIn } from "~/composables/useAuth";
import { ref } from "vue";

const router = useRouter();
const route = useRoute();
const isLoggedIn = await useLoggedIn();
const hideDialog = ref(true)

function goToAskForm() {
    if (isLoggedIn) {
        router.push('/ask-corner/ask')
    }
}

function rehide() {
    hideDialog.value = true;
}


</script>

<template>
    <div>
        <dialog-box @rehide="rehide" dismiss-text="dismiss" :hide="!hideDialog">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-xl font-medium leading-6 text-gray-900 dark:text-white" id="modal-title">경고</h3>
                <div class="mt-2">

                    <p class="mt-5">
                        질문을 하려면 로그인이 필요합니다.
                    </p>
                    <div class="text-xl mt-5 text-link">
                        <NuxtLink  to="/login">로그인</NuxtLink>
                    </div>
                    <div class="text-xl mt-5 text-link">
                        <NuxtLink  to="/register">계정이 없으십니까? <span class="">가입하기</span></NuxtLink>
                    </div>

                </div>
            </div>
        </dialog-box>

    </div>
</template>

