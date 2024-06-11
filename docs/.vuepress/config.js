import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
      { text: "External", link: "https://google.com" },
    ],
    sidebar: [
      {
        title: "Guide",
        collapsable: false,
        children: ["/guide/", "/guide/getting-started", "/guide/configuration"],
      },
    ],
  }),
});
