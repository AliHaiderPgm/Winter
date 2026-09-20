// framer-motion is only needed once a notice actually plays, so it is fetched
// as its own chunk instead of riding along in the navbar chunk. The idle
// preload means the first "Added to Favorites!" already has it in hand without
// the landing page paying for it up front.
//
// `dom/mini` is framer-motion's WAAPI-only `animate`: about 4 KB gzipped
// instead of roughly 21 KB for the full entry, and this notice only ever
// animates opacity and a single translate.
let motionPromise = null

export const loadMotion = () => {
	if (!motionPromise) {
		motionPromise = import("framer-motion/dom/mini").catch((error) => {
			// Do not cache a failure: a later notice should try again.
			motionPromise = null
			throw error
		})
	}
	return motionPromise
}

export const preloadMotion = () => {
	const start = () => {
		loadMotion().catch(() => { })
	}
	if (typeof window === "undefined") return

	if ("requestIdleCallback" in window) {
		window.requestIdleCallback(start, { timeout: 2500 })
		return
	}
	window.setTimeout(start, 1000)
}

export const prefersReducedMotion = () => (
	typeof window !== "undefined"
	&& window.matchMedia("(prefers-reduced-motion: reduce)").matches
)
