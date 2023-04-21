<template>
  <AuthorModal
    v-show="showModal"
    @closemodal="updateHandler"
    :author="props.authorData"
    @close="handler"
    :button="'Update'"
  />

  <q-btn
    no-outline
    rounded
    no-caps
    color="warning"
    text-color="black"
    class="update"
    @click="showModal = true"
  >
    <q-icon left size="1.2em" name="edit" />
    <div class="text">Update</div>
  </q-btn>
</template>

<script setup lang="ts">
import { gql, useMutation, useQuery } from "@urql/vue";
import { updateAuthorById } from "../queries";
import { AuthorModalVue as AuthorModal } from "../importComponents";
import { ref } from "vue";
import type { AuthorsData } from "../types/types";

const updateAuthors = ref<AuthorsData | {}>({});
const showModal = ref<Boolean>(false);

const emit = defineEmits<{ (e: "noupdate"): void; (e: "update"): void }>();
const props = defineProps<{ id: number; authorData: AuthorsData }>();

const updateAuthorMutation = useMutation(updateAuthorById);

const handler = () => {
  showModal.value = false;
  emit("noupdate");
};

const updateHandler = async (authorDetails: AuthorsData) => {
  updateAuthors.value = await updateAuthorMutation.executeMutation({
    id: authorDetails.id,
    username: authorDetails.username,
    firstname: authorDetails.firstname,
    lastname: authorDetails.lastname,
    bio: authorDetails.bio,
  });

  showModal.value = false;
};
</script>

<style scoped>
.update {
  margin: auto;
}
.text {
  margin-left: -4 px;
}
</style>
