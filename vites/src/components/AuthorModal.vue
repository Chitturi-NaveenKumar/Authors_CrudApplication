<template>
  <div class="modal-overlay">
    <div class="q-pa-md modal" style="width: 50%; height: fit-content">
      <div class="heading">{{ button }}</div>
      <q-form @submit="dataHandler" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="authorDetails.username"
          label="Authors name *"
          hint="Author Name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <br />
        <q-input
          filled
          v-model="authorDetails.firstname"
          label="Authors First Name *"
          hint="Author FirstName"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <br />
        <q-input
          filled
          v-model="authorDetails.lastname"
          label="Authors Last Name *"
          hint="Author Last Name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <br />
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
            class="q-ml-sm text-weight-bold"
          />
        </div>
      </q-form>
    </div>
    <div class="exit">
      <q-btn
        label="Back"
        type="submit"
        color="warning"
        rounded
        size="md"
        no-caps
        class="text-weight-medium"
        @click="closeHandler"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AuthorsData } from "../types/types";

const router = useRouter();
const emit = defineEmits<{
  (e: "closemodal", authorDetails: AuthorsData): void;
}>();
const { author, button } = defineProps<{
  author: AuthorsData;
  button: string;
}>();

console.log(author, button);
const authorDetails: AuthorsData = author;

const dataHandler = () => {
  emit("closemodal", authorDetails);
};

const closeHandler = () => {
  router.push({ name: "index" });
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
  background-color: #201e1eda;
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
  margin-top: 5%;
  /* padding: 60px 0; */
  border-radius: 20px;
  overflow: hidden;
}

.heading {
  font-size: 1.6rem;
  margin-bottom: 2.1rem;
  font-weight: bold;
}
.exit {
  margin-top: 40rem;
  margin-left: -5rem;
}
</style>
