const { EleventyRenderPlugin } = require("@11ty/eleventy")
const markdownIt = require("markdown-it")
const markdownItRenderer = new markdownIt({
	breaks: true,
})
const eleventyRenderer = markdownIt({
	breaks: true,
})

const NOT_FOUND_PATH = "_site/404.html";

module.exports = function (eleventyConfig) {
	// Ensures nothing interferes with the data files
	eleventyConfig.addPassthroughCopy("src/admin")
	eleventyConfig.addPassthroughCopy("src/_media")
	eleventyConfig.addPassthroughCopy("src/**/*.js")

	// Live reload for data
	eleventyConfig.addWatchTarget("src/_data")
	eleventyConfig.addWatchTarget("src/styles")

	// Markdown for descriptions, summaries etc
	eleventyConfig.addPlugin(EleventyRenderPlugin)
	eleventyConfig.addFilter("markdownify", (str) => {
		return markdownItRenderer.renderInline(str ?? "")
	})
	eleventyConfig.addFilter("mdfy", (str) => {
		return markdownItRenderer.render(str ?? "")
	})
	eleventyConfig.setLibrary("md", eleventyRenderer)

	// Liquid options
	eleventyConfig.setLiquidOptions({
		dynamicPartials: true,
		strict_filters: false,
	})
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function(err, bs) {
			bs.addMiddleware("*", (req, res) => {
				if (!fs.existsSync(NOT_FOUND_PATH)) {
					throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`);
				}
		
				const content_404 = fs.readFileSync(NOT_FOUND_PATH);
				// Add 404 http status code in request header.
				res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
				// Provides the 404 content without redirect.
				res.write(content_404);
				res.end();
			});
		  }
		}
	});

	return {
		passthroughFileCopy: true,
		dir: {
			input: "src",
			output: "_site",
		},
	}
}
