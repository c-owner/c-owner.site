<script setup lang="ts">
    import { ref } from 'vue';
    import { onClickOutside } from '@vueuse/core';

    const findPwModal = ref(null); // ref to the modal element
    const emit = defineEmits({ // emit 정의
        closeFindPw: () => true // 닫기 함수
    });
    onClickOutside(findPwModal, () => {
        closeModal();
    });
    function closeModal() {
        emit('closeFindPw');
    }
    function findAction() {

    }
</script>

<template>
    <div class="fade duration-700">
        <div class="modal" id="find-modal">
            <div
                ref="findPwModal"
                class="fixed z-20 h-3/4 w-1/2 m-auto inset-x-0 inset-y-0 p-4 bg-gray-800 dark:bg-white rounded-sm overflow-y-scroll">

<!--                top area -->
                <div class=" flex items-center text-black">
                    <div class="text-3xl font-noto-sans-kr font-medium">비밀번호 찾기</div>
                    <button @click="closeModal()" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:scale-110 duration-700 focus:outline-none">
                        <i class="ph-x-circle-fill text-3xl text-blue-darken-4 dark:text-indigo-800 vertical-bottom" />
                    </button>
                </div>

<!--                content area -->
                <form @submit.stop.prevent="findAction" method="post">

                </form>


            </div>
        </div>
    </div>
</template>

<style scoped></style>
