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
		// Legacy paths only emit redirect documents. Index canonical locale paths exclusively.
		filter(page) {
			return /^\/(?:ja|en)(?:\/|$)/.test(new URL(page, 'https://nakano1122.github.io').pathname);
		},
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
				const pathname = new URL(item.url).pathname;
				const localizedPath = pathname.replace(/^\/(?:ja|en)(?=\/|$)/, '') || '/';
				const pagePath = localizedPath === '/'
					? 'index'
					: localizedPath === '/about/'
						? 'about'
						: localizedPath.match(/^\/(research|development)\/[^/]+\/?$/)
							? `${localizedPath.split('/')[1]}/[id]`
							: `${localizedPath.replace(/^\//, '').replace(/\/$/, '')}/index`;
        const lastmod = execSync(
						`git log -1 --format=%cI -- "src/pages/${pagePath}.astro"`,
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
