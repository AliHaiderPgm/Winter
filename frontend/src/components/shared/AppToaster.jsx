import { useEffect, useState } from "react"
import { loadSonner } from "../../utils/toast"

// Sonner is fetched while the page is quiet and mounted once it lands, the
// same trade utils/motion.js makes. Nothing has to wait for it: a toast raised
// in the meantime is held by utils/toast and replayed by Sonner's store, so
// mounting late never loses a message.
const IDLE_TIMEOUT = 2500
const FALLBACK_DELAY = 1000

// One toaster for the whole app, mounted above the router so it covers the
// storefront, the dashboard and the auth screens alike.
const AppToaster = () => {
	const [Toaster, setToaster] = useState(null)

	useEffect(() => {
		let active = true

		const start = () => {
			loadSonner()
				.then(({ Toaster: SonnerToaster }) => {
					if (active) setToaster(() => SonnerToaster)
				})
				.catch(() => { })
		}

		let cancel
		if ("requestIdleCallback" in window) {
			const id = window.requestIdleCallback(start, { timeout: IDLE_TIMEOUT })
			cancel = () => window.cancelIdleCallback?.(id)
		} else {
			const id = window.setTimeout(start, FALLBACK_DELAY)
			cancel = () => window.clearTimeout(id)
		}

		return () => {
			active = false
			cancel?.()
		}
	}, [])

	if (!Toaster) return null

	return (
		<Toaster
			theme="light"
			position="bottom-right"
			duration={4000}
			gap={10}
			offset={22}
			mobileOffset={14}
			visibleToasts={4}
			className="app-toaster"
			toastOptions={{
				classNames: {
					toast: "app-toast",
					title: "app-toast__title",
				},
			}}
		/>
	)
}

export default AppToaster
