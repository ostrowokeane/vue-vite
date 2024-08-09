import "@/app/styles/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./app/router/router";
import { vMaska } from "maska";

import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as directives from "vuetify/directives";

const light: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#ff80b0",
    // primary: "#882f5b",
    default: "#eee",
    telegram: "#2FB9FB",
  },
};
const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#333",
    // primary: "#fff",
    // primary: "#ff80b0",
    primary: "#a43b63",
    default: "#5c5c5c",
    "on-default": "#eee",
    telegram: "#229ED9",
  },
};

const vuetify = createVuetify({
  // components,
  directives,
  theme: {
    defaultTheme: "dark",
    themes: {
      dark,
      light,
    },
  },
});

createApp(App)
  .use(router)
  .use(vuetify)
  .directive("maska", vMaska)
  .directive("initial-height", {
    mounted(el) {
      const height = el.offsetHeight;
      el.style.height = `${height}px`;
    },
    async updated(el, { value, oldValue }) {
      if (value === oldValue) return;
      el.style.height = `initial`;
      setTimeout(() => {
        const height = el.offsetHeight;
        el.style.height = `${height}px`;
      });
    },
  })

  .mount("#app");
