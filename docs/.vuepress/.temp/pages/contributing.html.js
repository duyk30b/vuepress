import comp from "/home/duy/MEA/duycode-vuepress/docs/.vuepress/.temp/pages/contributing.html.vue"
const data = JSON.parse("{\"path\":\"/contributing.html\",\"title\":\"CONTRIBUTORS\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"contributing.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
