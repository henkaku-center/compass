/*
What's going on here:
To dynamically generate the Directory Data key:'value' pairs for our localized Posts (renamed "News") section, 
we need to use 
- .11tydata.js-named files
- eleventyComputed
- arrow function to which we pass the "data" var, which composes the string we want to add to the page data.
*/
export default {
  layout: "person",
  eleventyComputed: {
    type: () => "person",
    translationKey: data => `${data.type}-${data.page.fileSlug}`,
    eleventyNavigation: {
      // key: data => `${data.page.url}`,
      // title: data => `${data.name}`,
      parent: data => `${data.nav.people}`
    },
    activeKey: data => `${data.nav.people}`
  }
}
