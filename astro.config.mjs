// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";
import { execSync } from "node:child_process";

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
  }), sitemap({
    // 未使用のnamespaceを除外してファイルサイズを削減
    namespaces: {
      news: false,
      video: false,
      image: false,
      xhtml: false,
    },
    // 最終更新日を追加
    serialize(item) {
      try {
        const lastmod = execSync(
          `git log -1 --format=%cI -- "src/pages${item.url.replace('https://nakano1122.github.io', '').replace(/\/$/, '') || '/index'}.astro"`,
          { encoding: 'utf-8' }
        ).trim();
        if (lastmod) {
          item.lastmod = lastmod;
        }
      } catch {
        // fallback: use current date
        item.lastmod = new Date().toISOString();
      }
      return item;
    },
  })],
});
