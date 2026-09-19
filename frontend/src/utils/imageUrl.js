const UNSPLASH_HOST = "images.unsplash.com"

const DEFAULT_WIDTH = 640
const DEFAULT_QUALITY = 75
const SRCSET_WIDTHS = [320, 480, 640, 900]

export const isOptimizableImage = (src) => typeof src === "string" && src.includes(UNSPLASH_HOST)

// Drops any existing query string so stale cache-busting/width params (e.g. the
// `sig=` the seeder used to append) never reach the network. The same photo then
// always resolves to one URL and can be reused from the browser/CDN cache.
export const buildImageUrl = (src, width = DEFAULT_WIDTH, quality = DEFAULT_QUALITY) => {
	if (!src) return src
	if (!isOptimizableImage(src)) return src

	const base = src.split("?")[0]
	return `${base}?auto=format&fit=crop&q=${quality}&w=${width}`
}

export const buildImageSrcSet = (src, widths = SRCSET_WIDTHS) => {
	if (!isOptimizableImage(src)) return undefined

	return widths.map((width) => `${buildImageUrl(src, width)} ${width}w`).join(", ")
}
