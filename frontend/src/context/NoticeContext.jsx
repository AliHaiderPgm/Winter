import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "../utils/toast"

// Two contexts on purpose. The notifier side is stable, so raising a notice
// never re-renders the components that can raise one, while the queue side
// changes per notice and is only read by the pill that plays it.
const NoticeApiContext = createContext(null)
const NoticeQueueContext = createContext(null)

// How long a notice raised away from the pill (the login greeting is raised on
// the auth screen, which has no navbar) waits for the navbar to mount before
// the toast takes it instead.
const HELD_TIMEOUT = 2500

// How long a queued notice waits after the pill disappears before giving up on
// it. React StrictMode mounts every component twice in development, so the
// navbar reports itself unavailable and available again within a frame; giving
// up immediately would toast a notice that was about to have a pill to play in.
const PILL_GRACE = 1200

const kindOf = (type) => {
	if (type === "error") return "error"
	if (type === "farewell") return "farewell"
	return "success"
}

// Notices take either a bare type (`notify(text, "error")`) or an options
// object. `emoji` swaps the drawn status icon for that glyph in the pill.
const optionsOf = (options) => (
	typeof options === "string" ? { type: options } : (options || {})
)

export const NoticeProvider = ({ children }) => {
	const queue = useRef([])
	const held = useRef([])
	const heldTimer = useRef(null)
	const graceTimer = useRef(null)
	const idRef = useRef(0)
	const pillOnScreen = useRef(false)
	const [version, setVersion] = useState(0)

	// The toast has no farewell variant, so anything that is not an error reads
	// as a success there.
	const fallback = useCallback((notice) => {
		toast[notice.type === "error" ? "error" : "success"](notice.text)
	}, [])

	const enqueue = useCallback((notice) => {
		queue.current.push(notice)
		setVersion(value => value + 1)
	}, [])

	const build = useCallback((text, options) => {
		const content = typeof text === "string" ? text.trim() : ""
		if (!content) return null
		const { type, emoji } = optionsOf(options)
		return { id: ++idRef.current, text: content, type: kindOf(type), emoji: emoji || null }
	}, [])

	const notify = useCallback((text, options) => {
		const notice = build(text, options)
		if (!notice) return

		// No pill to animate in: the toast stands in.
		if (!pillOnScreen.current) {
			fallback(notice)
			return
		}
		enqueue(notice)
	}, [build, enqueue, fallback])

	// For notices raised where the pill is not mounted yet. The pill picks it up
	// as soon as the navbar mounts; if nothing mounts it first, the toast takes
	// it, so a greeting is never lost on mobile.
	const holdForPill = useCallback((text, options) => {
		const notice = build(text, options)
		if (!notice) return

		// Only the most recent held notice is kept: a greeting that is never
		// played is not worth replaying later.
		held.current = [notice]

		window.clearTimeout(heldTimer.current)
		heldTimer.current = window.setTimeout(() => {
			const waiting = held.current
			held.current = []
			waiting.forEach(fallback)
		}, HELD_TIMEOUT)
	}, [build, fallback])

	// The pill drains the queue itself so a run of notices can play back to back
	// without the nav links bouncing in between. It looks at the front of the
	// queue and only drops the notice once it has actually been played, so a
	// remount mid-animation replays it rather than losing it.
	const peek = useCallback(() => queue.current[0] || null, [])

	const advance = useCallback((id) => {
		if (queue.current[0]?.id !== id) return
		queue.current.shift()
	}, [])

	// The navbar reports whether the pill is rendered (desktop widths only).
	const setPillAvailable = useCallback((available) => {
		pillOnScreen.current = available

		if (!available) {
			if (!queue.current.length) return
			// The pill may only be gone for a moment, so wait a beat before
			// deciding these notices have nowhere left to animate.
			graceTimer.current = window.setTimeout(() => {
				if (pillOnScreen.current || !queue.current.length) return
				const waiting = queue.current
				queue.current = []
				waiting.forEach(fallback)
			}, PILL_GRACE)
			return
		}

		// The navbar is up, so anything waiting for it can play.
		if (!held.current.length) return
		window.clearTimeout(heldTimer.current)
		const waiting = held.current
		held.current = []
		waiting.forEach(enqueue)
	}, [enqueue, fallback])

	useEffect(() => () => {
		window.clearTimeout(heldTimer.current)
		window.clearTimeout(graceTimer.current)
	}, [])

	const api = useMemo(() => ({ notify, holdForPill, setPillAvailable }), [notify, holdForPill, setPillAvailable])
	const notices = useMemo(() => ({ version, peek, advance }), [version, peek, advance])

	return (
		<NoticeApiContext.Provider value={api}>
			<NoticeQueueContext.Provider value={notices}>
				{children}
			</NoticeQueueContext.Provider>
		</NoticeApiContext.Provider>
	)
}

export default NoticeProvider

export const useNotice = () => {
	const api = useContext(NoticeApiContext)
	if (!api) throw new Error("useNotice must be used inside NoticeProvider")
	return api
}

export const useNoticeQueue = () => {
	const notices = useContext(NoticeQueueContext)
	if (!notices) throw new Error("useNoticeQueue must be used inside NoticeProvider")
	return notices
}
