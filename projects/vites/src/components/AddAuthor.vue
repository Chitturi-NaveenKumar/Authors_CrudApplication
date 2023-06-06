<template>
  <AuthorModal
    @closemodal="addHandler"
    :author="authorData"
    :button="'Add Author'"
  />
</template>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { useAuthorsStore } from "../store/authors";
import type { AuthorsData } from "../types/types";
import { createAuthor } from "../queries/index.js";

const authorsStore = useAuthorsStore();
const { authorData } = storeToRefs(authorsStore);

const addAuthorMutation = useMutation(createAuthor);

const addAuthor = async (authorDetails: AuthorsData) => {
  await addAuthorMutation.executeMutation({
    id: authorDetails.id,
    username: authorDetails.username,
    firstname: authorDetails.firstname,
    lastname: authorDetails.lastname,
    bio: authorDetails.bio,
  });
  authorsStore.cleanAuthor();
};

const addHandler = async (authorDetails: AuthorsData) => {
  await addAuthor(authorDetails);
  authorsStore.router.push({ name: "index" });
};
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
