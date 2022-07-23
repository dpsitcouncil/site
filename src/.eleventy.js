const { EleventyRenderPlugin } = require("@11ty/eleventy")
const markdownIt = require("markdown-it")
const markdownItRenderer = new markdownIt({
	breaks: true,
})
const eleventyRenderer = markdownIt({
	breaks: true,
})


module.exports = function (eleventyConfig) {

	// Ensures nothing interferes with hthe data files
	eleventyConfig.addPassthroughCopy("src/admin")
	eleventyConfig.addPassthroughCopy("src/_media")

	// Live reload for data
	eleventyConfig.addWatchTarget("src/_data")

	// Markdown for descriptions, summaries etc
	eleventyConfig.addPlugin(EleventyRenderPlugin)
	eleventyConfig.addFilter("markdownify", (str) => {
		return markdownItRenderer.renderInline(str ?? "")
	})
	eleventyConfig.setLibrary("md", eleventyRenderer)


	return {
		passthroughFileCopy: true,
		dir: {
			input: "src",
			output: "_site",
		},
	}
}
