<template>
  <AuthorModal
    @closemodal="updateHandler"
    v-if="authorDataById && authorDataById.id"
    :author="authorDataById"
    :button="'Update Author Details'"
  />
</template>

<script setup lang="ts">
import { useMutation, useQuery } from "@urql/vue";
import { updateAuthorById, authorById } from "../queries";
import { AuthorModalVue as AuthorModal } from "../importComponents";
import { onMounted, ref } from "vue";
import type { AuthorsData } from "../types/types";
import { useRoute, useRouter } from "vue-router";

const updateAuthors = ref<AuthorsData | {}>({});
const authorDataById = ref<AuthorsData>({});

const route = useRoute();
const router = useRouter();
const id: number = parseInt(route.params.id);

//query vairables
const authorsQuery = useQuery({ query: authorById, variables: { id } });
const updateAuthorMutation = useMutation(updateAuthorById);

//query Handlers
const getAuthorById = async () => {
  const author = await authorsQuery.executeQuery();

  authorDataById.value = await JSON.parse(
    JSON.stringify(author.data.value.author)
  );
  console.log(authorDataById.value);
};

const updateHandler = async (authorDetails: AuthorsData) => {
  updateAuthors.value = await updateAuthorMutation.executeMutation({
    id: authorDetails.id,
    username: authorDetails.username,
    firstname: authorDetails.firstname,
    lastname: authorDetails.lastname,
    bio: authorDetails.bio,
  });

  router.push({
    name: "home",
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
