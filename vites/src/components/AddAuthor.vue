<template>
  <AuthorModal
    @closemodal="addHandler"
    :author="author"
    :button="'Add Author'"
  />
</template>

<script setup lang="ts">
import type { AuthorsData } from "../types/types.ts";
import { useMutation } from "@urql/vue";

import { createAuthor } from "../queries";

const router = useRouter();
const createAuthors = ref<AuthorsData | {}>({});
const author = ref<AuthorsData>({
  username: "",
  firstname: "",
  lastname: "",
  bio: "",
});

const addAuthorMutation = useMutation(createAuthor);

const addHandler = async (authorDetails: AuthorsData) => {
  createAuthors.value = await addAuthorMutation.executeMutation({
    id: authorDetails.id,
    username: authorDetails.username,
    firstname: authorDetails.firstname,
    lastname: authorDetails.lastname,
    bio: authorDetails.bio,
  });

  router.push({ name: "index" });
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
