import { createRouter, createWebHistory } from "vue-router";
import Demo from "../components/Demo.vue";
import HomeView from "../views/HomeView.vue";
import AddAuthorView from "../views/AddAuthorView.vue";
import UpdateAuthorView from "../views/UpdateAuthorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/addauthor",
      name: "addauthor",
      component: AddAuthorView,
      props: (route) => {
        return { ...route.params };
      },
    },
    {
      path: "/updateauthor/:id",
      name: "updateauthor",
      component: UpdateAuthorView,
    },
  ],
});

export default router;
