// Toasts are Sonner: the component from Emil Kowalski's "Building a toast
// component" (stacking cards that lift as more arrive, swipe to dismiss, held
// open while hovered, timers paused in a hidden tab). It replaces antd's
// message and notification everywhere in the app.
//
// The module is fetched on demand for the same reason framer-motion is (see
// utils/motion.js): every toast is raised by something the user just did, so
// the landing page has no reason to ship ~14 KB gzipped of toast machinery
// that may never run. Sonner's own store replays toasts raised before its
// <Toaster /> subscribed; what this wrapper adds is the last gap, the moment
// before the module itself has arrived, by holding those calls and replaying
// them once it lands.
let sonnerPromise = null
let sonner = null
const queued = []

export const loadSonner = () => {
	if (!sonnerPromise) {
		sonnerPromise = import("sonner")
			.then((module) => {
				sonner = module
				queued.splice(0).forEach(([method, args]) => module.toast[method](...args))
				return module
			})
			.catch((error) => {
				// Do not cache a failure: the next toast should try again.
				sonnerPromise = null
				queued.splice(0)
				throw error
			})
	}
	return sonnerPromise
}

// Mirrors Sonner's own API. A call made before the chunk has landed is held
// rather than dropped, and plays as soon as the module is there.
const raise = (method) => (...args) => {
	if (sonner) return sonner.toast[method](...args)
	queued.push([method, args])
	loadSonner().catch((error) => console.error("Toast could not be loaded", error))
	return undefined
}

export const toast = {
	success: raise("success"),
	error: raise("error"),
	info: raise("info"),
	warning: raise("warning"),
	message: raise("message"),
	loading: raise("loading"),
	dismiss: raise("dismiss"),
}
