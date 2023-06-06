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
        @click="addhandler($event, 'addauthor')"
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
        :rows="authorsData"
        :columns="columns"
        :loading="loading"
        :pagination="initialPagination"
        row-key="name"
        table-header-class=" text-black text-weight-bold    bg-grey"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="username" :props="props">
              {{ props.row.username }}
            </q-td>
            <q-td key="firstname" :props="props">
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
                @click="updatehandler($event, 'updateauthor', props.row.id)"
              >
                <q-icon left size="1.2em" name="edit" />
                <div class="text">Update</div>
              </q-btn>
            </q-td>
            <q-td :props="props" key="delete">
              <DeleteAuthors
                :id="props.row.id!"
                @update="authorsStore.getAllAuthors"
              />
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
import { storeToRefs } from "pinia";
import { QTableProps } from "quasar";
import { useAuthorsStore } from "../store/authors";

const authorsStore = useAuthorsStore();
const { authorsData, loading } = storeToRefs(authorsStore);

const columns: QTableProps["columns"] = [
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

const initialPagination = ref({
  sortBy: "username",
  descending: false,
  page: 1,
  rowsPerPage: 5,
  rowsNumber: authorsData.value?.length,
});

const noupdateHandler = async () => {
  await authorsStore.getAllAuthors();
};

onMounted(async () => {
  await authorsStore.getAllAuthors();
});

const addhandler = (event: any, routeName: string) => {
  authorsStore.router.push({
    path: `${routeName}`,
  });
};
const updatehandler = (
  event: any,
  routeName: string,
  id: number | string | undefined
) => {
  const val = id?.toString();

  authorsStore.router.push({
    path: `${routeName}/${val}`,
  });
};

const handleRequest = () => {
  console.log("dsfsg");
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
