module.exports = function (eleventyConfig) {
  // Copy static assets directly to the output folder
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("data");

  // Configure development server
  eleventyConfig.setServerOptions({
    port: 5000,
    host: "0.0.0.0",
    showAllHosts: true,
  });

  return {
    dir: {
      input: ".",          // main project folder
      includes: "_includes", // where layouts/partials go
      data: "_data",         // where global data files go
      output: "_site",       // build output folder
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    templateFormats: ["njk", "html", "md"],
  };
};
