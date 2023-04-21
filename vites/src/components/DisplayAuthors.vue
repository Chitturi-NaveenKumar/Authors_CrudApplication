<template>
  <div class="container">
    <div class="heading">
      <h1>Authors</h1>
    </div>
    <AddAuthor @addAuthor="getAllAuthors" />
    <div class="table">
      <h2>List of authors</h2>
    </div>

    <div class="q-pa-md">
      <q-table
        flat
        bordered
        :rows="res"
        :columns="columns"
        :loading="loading"
        row-key="name"
        hide-bottom
        table-header-class=" text-black text-weight-bold    bg-grey"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="username" :props="props">
              {{ props.row.username }}
            </q-td>
            <q-td key="lastname" :props="props">
              {{ props.row.firstname }}
            </q-td>
            <q-td key="lastname" :props="props">
              {{ props.row.lastname }}
            </q-td>
            <q-td key="bio" :props="props">
              {{ props.row.bio }}
            </q-td>
            <q-td :props="props" key="update">
              <UpdateAuthor
                :id="props.row.id!"
                :authorData="props.row"
                @update="getAllAuthors"
                @noupdate="noupdateHandler"
              />
            </q-td>
            <q-td :props="props" key="delete">
              <DeleteAuthors :id="props.row.id!" @update="getAllAuthors" />
            </q-td>
          </q-tr>
        </template>

        <template #loading>
          <q-inner-loading showing color="secondary" /> </template
      ></q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@urql/vue";

import { onMounted, ref } from "vue";
import { DeleteAuthorsVue as DeleteAuthors } from "../importComponents";
import { UpdateAuthorsVue as UpdateAuthor } from "../importComponents";
import { AddAuthorVue as AddAuthor } from "../importComponents";
import { getAuthors } from "../queries";
import type { AuthorsData, coulmnType } from "../types/types";

const res = ref<AuthorsData[]>([]);

const allAuthors = useQuery({ query: getAuthors });
const loading = ref<boolean>(false);
const columns: coulmnType[] = [
  {
    name: "username",
    required: true,
    label: "Author Name",
    align: "center",
    field: "username",
    format: (val: string) => `${val}`,
    sortable: true,
  },

  {
    name: "firstname",
    required: true,
    label: "First Name",
    align: "center",
    field: "firstname",
    format: (val: String) => `${val}`,
    sortable: false,
  },
  {
    name: "lastname",
    required: true,
    label: "Last Name",
    align: "center",
    field: "lastname",
    format: (val: String) => `${val}`,
    sortable: true,
  },
  {
    name: "bio",
    required: true,
    label: "Bio",
    align: "center",
    field: "bio",
    format: (val: String) => `${val}`,
    sortable: true,
  },
  {
    name: "update",
    required: true,
    label: "",
    align: "center",
    field: "update",
  },
  {
    name: "delete",
    required: true,
    label: "",
    align: "center",
    field: "delete",
  },
];

const getAllAuthors = async () => {
  loading.value = true;
  const authors = await allAuthors.executeQuery();

  console.log(authors.data.value.authors);
  res.value = await JSON.parse(JSON.stringify(authors.data.value.authors));

  loading.value = false;
};

const noupdateHandler = () => {
  getAllAuthors();
};

onMounted(async () => {
  await getAllAuthors();
});
</script>

<style scoped>
.container {
  margin: 0;
  width: 100%;

  margin-top: -12px;
}
.heading {
  margin: 0;
  width: 100%;
}
h2 {
  text-align: center;
  font-size: 39px;
  color: black;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 110px;
  padding: 8px;
}
h1 {
  text-align: center;
  font-size: 43px;
  color: black;
  width: 100%;
  padding: 6px;
  margin: 2px;
  font-weight: bold;
  background: lightcyan;
}

.delete {
  margin: auto;
  background-color: red;
  text-align: center;
  border-radius: 5px;
  width: 75%;
  padding: 10px;
}
</style>
