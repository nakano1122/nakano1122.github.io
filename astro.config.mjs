// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

import remarkBilingual from "./src/plugins/remark-bilingual.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://nakano1122.github.io/",
  markdown: {
    remarkPlugins: [remarkBilingual],
  },
  integrations: [icon({
    include: {
      mdi: ['weather-sunny', 'weather-night', 'email-outline', 'github', 'open-in-new', 'close', 'at', 'translate', 'file-document-outline', 'arrow-right', 'arrow-left', 'chevron-down', 'chevron-left', 'chevron-right'],
    },
  }), sitemap()],
});
