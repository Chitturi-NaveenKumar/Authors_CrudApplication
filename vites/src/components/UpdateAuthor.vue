<template>
  <AuthorModal
    @closemodal="updateHandler"
    v-if="authorData && authorData.id"
    :author="authorData"
    :button="'Update Author Details'"
  />
</template>

<script setup lang="ts">
import { useMutation, useQuery } from "@urql/vue";
import { updateAuthorById, authorById } from "../queries";
import type { AuthorsData } from "../types/types";
import { useAuthorsStore } from "../store/authors";

const authorsStore = useAuthorsStore();
const { authorData } = storeToRefs(authorsStore);
const props = defineProps(["id"]);

const id: number = parseInt(props.id);

//query vairables
const authorsQuery = useQuery({ query: authorById, variables: { id } });
const updateAuthorMutation = useMutation(updateAuthorById);

//query Handlers
const getAuthorById = async () => {
  const author = await authorsQuery.executeQuery();

  authorData.value = await JSON.parse(JSON.stringify(author.data.value.author));
  console.log(authorData.value);
};

//HANDLER FOR UPDATE
const updateHandler = async (authorDetails: AuthorsData) => {
  await updateAuthorMutation.executeMutation({
    id: authorDetails.id,
    username: authorDetails.username,
    firstname: authorDetails.firstname,
    lastname: authorDetails.lastname,
    bio: authorDetails.bio,
  });

  authorsStore.cleanAuthor();
  authorsStore.router.push({
    name: "index",
  });
};

onMounted(async () => {
  await getAuthorById();
});
</script>

<style scoped>
.update {
  margin: auto;
}
.text {
  margin-left: -4 px;
}
</style>
