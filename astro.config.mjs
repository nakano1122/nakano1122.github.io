// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://nakano1122.github.io/",
  integrations: [icon({
    iconDir: "node_modules/@iconify/json",
  }), sitemap()],
});