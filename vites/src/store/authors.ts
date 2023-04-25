import { defineStore } from "pinia";
import { AuthorsData } from "../types/types";
import {
  authorById,
  createAuthor,
  getAuthors,
  updateAuthorById,
} from "../queries/index";
import { useQuery } from "@urql/vue";

export const useAuthorsStore = defineStore("authors", () => {
  const authorsData = ref<AuthorsData[]>();
  const authorData = ref<AuthorsData>({});

  const loading = ref(false);
  const router = useRouter();
  //queries and mutations

  const allAuthors = useQuery({ query: getAuthors });

  const getAllAuthors = async () => {
    loading.value = true;
    const authors = await allAuthors.executeQuery();

    console.log(authors.data.value.authors);
    authorsData.value = await JSON.parse(
      JSON.stringify(authors.data.value.authors)
    );

    loading.value = false;
  };

  const cleanAuthor = () => {
    authorData.value = {
      username: "",
      bio: "",
      firstname: "",
      lastname: "",
      id: undefined,
    };
  };

  return {
    authorsData,
    loading,
    getAllAuthors,
    router,
    cleanAuthor,
    authorData,
  };
});
