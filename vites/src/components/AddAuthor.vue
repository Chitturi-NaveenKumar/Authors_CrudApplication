<template>
  <AuthorModal
    v-show="showModal"
    @closemodal="addHandler"
    @close="showModal = false"
    :author="author"
    :button="'Add Author'"
  />

  <div class="add">
    <q-btn
      no-outline
      rounded
      no-caps
      color="info"
      text-color="black"
      class="addAuthor"
      @click="showModal = true"
    >
      <q-icon left size="1.5em" name="add" />
      <div class="text">Add Author</div>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import type { AuthorsData } from "../types/types.ts";
import { useMutation } from "@urql/vue";
import { ref } from "vue";
import { createAuthor } from "../queries";
import { AuthorModalVue as AuthorModal } from "../importComponents";

const showModal = ref<boolean>(false);
const createAuthors = ref<AuthorsData | {}>({});
const author = ref<AuthorsData>({
  username: "",
  firstname: "",
  lastname: "",
  bio: "",
});

const emit = defineEmits<{ (e: "addAuthor"): void }>();

const addAuthorMutation = useMutation(createAuthor);

const addHandler = async (authorDetails: AuthorsData) => {
  createAuthors.value = await addAuthorMutation.executeMutation({
    id: authorDetails.id,
    username: authorDetails.username,
    firstname: authorDetails.firstname,
    lastname: authorDetails.lastname,
    bio: authorDetails.bio,
  });
  showModal.value = false;
  emit("addAuthor");
};
console.log(showModal.value);
</script>

<style scoped>
.add {
  float: right;
  margin-top: 30px;
}

.addAuthor {
  margin-right: 120px;
  padding: 5px;
  border: none;
}
.text {
  margin-left: -10px;
  font-size: 15px;
}
</style>
