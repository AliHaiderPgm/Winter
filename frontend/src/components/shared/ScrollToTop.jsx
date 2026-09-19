import { useEffect, useRef } from "react"
import { useLocation, useNavigationType } from "react-router-dom"

// React Router keeps the scroll position of the page you left, so opening a new
// route from a footer link dropped you at the bottom of the new page. Positions
// are remembered per history entry here, which means a fresh navigation starts
// at the top while Back and Forward return you to where you were.
const positions = new Map()

// Bootstrap makes smooth scrolling the site default, which would turn every
// route change into a slow ride from the old offset. An explicit "instant"
// behaviour is what overrides it: temporarily setting scroll-behavior to auto
// is not enough, Chrome still animates the in-flight scroll.
const jumpTo = (top) => {
	window.scrollTo({ top, left: 0, behavior: "instant" })
}

export default function ScrollToTop() {
	const { key } = useLocation()
	const navigationType = useNavigationType()
	const entryKey = useRef(key)

	useEffect(() => {
		if (navigationType !== "POP") {
			jumpTo(0)
			return
		}
		const saved = positions.get(key)
		if (!saved) return
		// Wait for the route to paint, otherwise the page is too short to scroll.
		const frame = requestAnimationFrame(() => jumpTo(saved))
		return () => cancelAnimationFrame(frame)
	}, [key, navigationType])

	useEffect(() => {
		entryKey.current = key
		const remember = () => positions.set(entryKey.current, window.scrollY)
		window.addEventListener("scroll", remember, { passive: true })
		return () => window.removeEventListener("scroll", remember)
	}, [key])

	return null
}
