import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      {
        text: "Database",
        children: [
          { text: "SQL", link: "/database/sql/" },
          { text: "MongoDB", link: "/database/mongodb/" },
        ],
      },
      {
        text: "Language",
        children: [
          { text: "Javascript", link: "/language/javascript/" },
          { text: "HTML-CSS", link: "/language/html-css/" },
        ],
      },
    ],
    sidebar: {
      "/": [
        {
          title: "Guide",
          collapsable: false,
          children: ["/guide/"],
        },
      ],
      "/database/sql/": [
        {
          title: "SQL",
          collapsable: false,
          children: ["/database/sql/", "/database/sql/transaction"],
        },
      ],
      "/database/mongodb/": [
        {
          title: "MongoDb",
          collapsable: false,
          children: [
            "/database/mongodb/",
            "/database/mongodb/backup-restore",
            "/database/mongodb/replica",
          ],
        },
      ],
      "/language/javascript/": [
        {
          title: "Javascript",
          collapsable: false,
          children: [
            "/language/javascript/",
            "/language/javascript/typescript-decorator",
            "/language/javascript/typescript-type-interface",
          ],
        },
      ],
    },
  }),
});
