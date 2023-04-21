<script setup lang="ts">
import { Client, provideClient, cacheExchange, fetchExchange } from "@urql/vue";
import DisplayAuthors from "./components/DisplayAuthors.vue";
import Modal from "./components/modal.vue";
const client = new Client({
  url: "http://localhost:3001/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

provideClient(client);
</script>

<template>
  <router-view></router-view>
  <suspense>
    <!-- <HelloWorld /> -->
    <!-- <DisplayAuthors /> -->
    <!-- <Modal /> -->
  </suspense>
</template>

<style scoped></style>
