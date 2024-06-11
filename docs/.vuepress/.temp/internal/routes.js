export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/home/duy/MEA/duycode-vuepress/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Hello VuePress"} }],
  ["/contributing.html", { loader: () => import(/* webpackChunkName: "contributing.html" */"/home/duy/MEA/duycode-vuepress/docs/.vuepress/.temp/pages/contributing.html.js"), meta: {"title":"CONTRIBUTORS"} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "guide_index.html" */"/home/duy/MEA/duycode-vuepress/docs/.vuepress/.temp/pages/guide/index.html.js"), meta: {"title":"READ ME GUIDE"} }],
  ["/guide/getting-started.html", { loader: () => import(/* webpackChunkName: "guide_getting-started.html" */"/home/duy/MEA/duycode-vuepress/docs/.vuepress/.temp/pages/guide/getting-started.html.js"), meta: {"title":"Getting Started"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/home/duy/MEA/duycode-vuepress/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
