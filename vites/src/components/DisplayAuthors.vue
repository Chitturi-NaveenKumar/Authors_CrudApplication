<template>
  <div class="container">
    <div class="heading">
      <h1>Authors</h1>
    </div>
    <div class="add">
      <q-btn
        no-outline
        rounded
        no-caps
        color="info"
        text-color="black"
        class="addAuthor"
        @click="handler($event, 'addauthor', undefined)"
      >
        <q-icon left size="1.5em" name="add" />
        <div class="text">Add Author</div>
      </q-btn>
    </div>
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
              <q-btn
                no-outline
                rounded
                no-caps
                color="warning"
                text-color="black"
                class="update"
                @click="handler($event, 'updateauthor', props.row.id)"
              >
                <q-icon left size="1.2em" name="edit" />
                <div class="text">Update</div>
              </q-btn>
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

import { onMounted, provide, ref } from "vue";
import { DeleteAuthorsVue as DeleteAuthors } from "../importComponents";

import { getAuthors } from "../queries";
import type { AuthorsData, coulmnType } from "../types/types";
import { useRouter } from "vue-router";

const res = ref<AuthorsData[]>([]);
const router = useRouter();
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
const handler = (event: any, routeName: string, id: number | undefined) => {
  router.push({
    name: routeName,
    params: { id: id },
  });
};
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
