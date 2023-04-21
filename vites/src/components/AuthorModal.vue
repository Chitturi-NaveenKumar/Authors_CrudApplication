<template>
  <div class="modal-overlay">
    <div class="q-pa-md modal" style="width: 50%; height: fit-content">
      <div class="heading">{{ button }}</div>
      <q-form @submit="updateHandler" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="authorDetails.username"
          label="Authors name *"
          hint="Author Name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="authorDetails.firstname"
          label="Authors First Name *"
          hint="Author FirstName"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="authorDetails.lastname"
          label="Authors Last Name *"
          hint="Author Last Name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="text"
          v-model="authorDetails.bio"
          label="Authors Bio"
          hint="Authors Bio"
          lazy-rules
          :rules="[(val) => (val && val.length > 5) || 'Please type something']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
    <div class="close">
      <img
        class="close-img"
        src="../assets/close.svg"
        @click="$emit('close')"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AuthorsData } from "../types/types";

const emit = defineEmits<{
  (e: "closemodal", authorDetails: AuthorsData): void;
  (e: "close"): void;
}>();
const { author, button } = defineProps<{
  author: AuthorsData;
  button: string;
}>();

const authorDetails: AuthorsData = author;

const updateHandler = () => {
  emit("closemodal", authorDetails);
};

const onReset = () => {
  authorDetails.bio = "";
  authorDetails.firstname = "";
  authorDetails.lastname = "";
  authorDetails.username = "";
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 5;
}
.close {
  float: right;
  margin-top: 8.2rem;

  cursor: pointer;
}
.close-img {
  width: 20px;
  background-color: rgb(179, 25, 25);
  -webkit-mask: url(../assets/close.svg) no-repeat center;
  mask: url(../assets/close.svg) no-repeat center;
}

.modal {
  text-align: center;
  background-color: #e3dddd;
  height: 60%;
  width: 50%;
  margin-top: 10%;
  /* padding: 60px 0; */
  border-radius: 20px;
  overflow: hidden;
}

.heading {
  font-size: 1.6rem;
  margin-bottom: 2.1rem;
  font-weight: bold;
}
</style>
