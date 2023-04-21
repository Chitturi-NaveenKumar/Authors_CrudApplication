<template>
  <q-btn
    no-outline
    rounded
    no-caps
    color="negative"
    text-color="black"
    class="update"
    @click="deleteHandler"
  >
    <q-icon left size="1.2em" name="delete" />
    <div class="text">Delete</div>
  </q-btn>
</template>

<script setup lang="ts">
import type { AuthorsData } from "../types/types";
import { useMutation } from "@urql/vue";
import { ref } from "vue";
import { deleteAuthor } from "../queries";

const updateTodoResult = ref<AuthorsData | {}>({});
const emit = defineEmits<{ (e: "update"): void }>();
const props = defineProps<{ id: Number }>();
const deleteAuthorMutation = useMutation(deleteAuthor);

// Delete Authors
const deleteHandler = async () => {
  console.log(props.id);
  updateTodoResult.value = await deleteAuthorMutation.executeMutation({
    id: props.id,
  });
  emit("update");
};
</script>

<style scoped>
.delete {
  margin: auto;
  background-color: red;
  text-align: center;
  border-radius: 5px;
  width: 75%;
  padding: 10px;
}
</style>
