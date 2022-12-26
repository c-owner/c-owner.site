<script setup lang="ts">
    import { useFetch, useRouter } from '#app';
    import { ref } from 'vue';

    interface Props {
        data: BQuestionPost;
        showEditForm: boolean;
        endpoint?: string;
    }

    const props = defineProps<Props>();
    const data = props.data;
    let showEditForm = props.showEditForm;
    const router = useRouter();

    const isEditable = ref(true); //todo: implement logic

    const endpoint = props.endpoint || '';
    const method = endpoint.indexOf('edit') ? 'PUT' : 'POST';

    async function postQuestion() {
        const { data: question } = await useFetch<BQuestion>(() => `${props.endpoint}`, {
                method: method,
                body: { data },
                pick: ['id']
            }
        );

        if (data.id) {
            showEditForm = false;
        } else {
            await router.push(`/ask-corner/question/${question?.value?.id}`);
        }

    }
</script>

<template>
    <form @submit.stop.prevent="postQuestion">
        <BoardTiptap
            :data="data"
            :editable="isEditable" />

        <div class="flex justify-end">
            <button
                @click="postQuestion"
                class="mt-5 text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                type="button">
                질문하기
            </button>
        </div>
        <!-- todo: make button text dynamic -->
    </form>
</template>

<style scoped></style>
