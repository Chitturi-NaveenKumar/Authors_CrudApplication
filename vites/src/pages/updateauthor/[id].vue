<script lang="ts" setup>
const props = defineProps({
  id: { type: String, required: false },
});
console.log(props.id);
</script>
<template>
  <main>
    <UpdateAuthor :id="props.id" />
  </main>
</template>
