import { Quasar } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import router from "./routes/index.ts";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(Quasar, {
  plugins: {},
});
app.mount("#app");
