import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import { QuasarResolver } from "unplugin-vue-components/resolvers";
import Pages from "vite-plugin-pages";
import path from "path";

export default defineConfig({
  server: {
    fs: {
      strict: false,
    },
  },
  plugins: [
    Pages({
      dirs: "src/pages",
      exclude: ["**/components/*.vue"],
    }),
    Components({
      dirs: ["src/components", "src/pages", "src/store"],
      extensions: ["vue", "ts"],
      dts: true,
      deep: true,
      resolvers: [QuasarResolver()],
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.[tj]sx?$/],
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/,
      ],
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // global imports to register
      imports: [
        // presets
        "vue",
        "vue-router",
        "pinia",

        {
          from: "vue-router",
          imports: ["RouteLocationRaw"],
          type: true,
        },
      ],

      defaultExportByFilename: false,

      dts: "./auto-imports.d.ts",

      cache: false,

      vueTemplate: false,

      resolvers: [
        /* ... */
      ],

      injectAtEnd: true,

      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
    vue({
      template: { transformAssetUrls },
    }),

    quasar({
      sassVariables: "src/quasar-variables.sass",
    }),
  ],
});
