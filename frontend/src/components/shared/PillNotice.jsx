/* eslint-disable react/prop-types -- scopeRef is an internal ref handed over by
   the navbar; this component is only ever rendered by it. */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useNoticeQueue } from "../../context/NoticeContext"
import { loadMotion, prefersReducedMotion } from "../../utils/motion"

// The whole rhythm lives here so it can be tuned from one place, in seconds.
// Links leave upward, then the icon lands and draws itself while the message
// arrives letter by letter from below, waits, and leaves the way it came in
// before the links drop back down.
const ITEM_OUT = 0.26
const ITEM_IN = 0.3
const ITEM_STAGGER = 0.055
const ITEM_TRAVEL = -30
const LETTER_IN = 0.28
const LETTER_OUT = 0.22
const LETTER_TRAVEL = 12
const LETTER_STAGGER_MIN = 0.008
const LETTER_STAGGER_MAX = 0.022
const LETTER_STAGGER_SPAN = 0.36
// The icon leads and the copy follows a beat later, so the two read as one
// gesture instead of arriving as a block.
const LETTER_LEAD = 0.12
const ICON_IN = 0.26
const ICON_OUT = 0.2
const EMOJI_IN_DURATION = 0.42
const EMOJI_WAVE_DURATION = 0.62
const ICON_TRAVEL = 10
const ICON_RING = 0.32
const ICON_MARK = 0.26
const ICON_MARK_DELAY = 0.2
const HOLD_MIN = 1500
const HOLD_PER_CHAR = 45
const HOLD_MAX = 2600
const FONT_SIZE = 13
const FONT_SIZE_MIN = 10
const OVERLAY_PADDING = 36
const ICON_GAP = 8
// The easing the rest of the site moves with.
const EASE_OUT = [0.25, 1, 0.3, 1]

// Explicit keyframes on both ends: the notice never depends on the animation
// library reading the element's current style, so every phase starts from the
// state the previous one left behind. `transform` is written out rather than
// using framer's `x`/`y` shorthands, which the mini entry does not resolve.
const travel = (fromY, fromOpacity, toY, toOpacity) => ({
	opacity: [fromOpacity, toOpacity],
	transform: [`translateY(${fromY}px)`, `translateY(${toY}px)`],
})

const ITEMS_OUT = travel(0, 1, ITEM_TRAVEL, 0)
const ITEMS_IN = travel(ITEM_TRAVEL, 0, 0, 1)
const LETTERS_IN = travel(LETTER_TRAVEL, 0, 0, 1)
const LETTERS_OUT = travel(0, 1, LETTER_TRAVEL, 0)
const ICON_SETS = {
	in: {
		opacity: [0, 1],
		transform: [`translateY(${ICON_TRAVEL}px) scale(0.7)`, "translateY(0px) scale(1)"],
	},
	out: {
		opacity: [1, 0],
		transform: ["translateY(0px) scale(1)", `translateY(${LETTER_TRAVEL}px) scale(0.8)`],
	},
}

// Emoji land with a small overshoot instead of drawing themselves. The wave
// then gets its own wiggle in the same animation, because a wave that does not
// wave is just a picture of a hand.
const EMOJI_IN = {
	opacity: [0, 1],
	transform: [`translateY(${ICON_TRAVEL}px) scale(0.4)`, "translateY(0px) scale(1.15)", "translateY(0px) scale(1)"],
}
const EMOJI_WAVE_IN = {
	opacity: [0, 1],
	transform: [
		`translateY(${ICON_TRAVEL}px) scale(0.4) rotate(0deg)`,
		"translateY(0px) scale(1.15) rotate(-16deg)",
		"translateY(0px) scale(1) rotate(13deg)",
		"translateY(0px) scale(1) rotate(0deg)",
	],
}
const WAVING = new Set(["\u{1F44B}", "\u{1F64B}", "\u{1F590}"])

const wait = (duration) => new Promise(resolve => window.setTimeout(resolve, duration))
const nextFrame = () => new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)))
const holdFor = (text) => Math.min(HOLD_MAX, HOLD_MIN + text.length * HOLD_PER_CHAR)
const staggerFor = (length) => Math.min(LETTER_STAGGER_MAX, Math.max(LETTER_STAGGER_MIN, LETTER_STAGGER_SPAN / Math.max(length, 1)))

const pin = (targets, opacity, y) => {
	targets.forEach((element) => {
		element.style.opacity = String(opacity)
		element.style.transform = `translateY(${y}px)`
	})
}

// The notice carries either an emoji or this drawn icon. Hand drawn rather than
// pulled from an icon set: the ring and the mark are strokes, which is what
// lets them draw themselves on the way in. The mark says what the notice
// means: a tick for a success, an arrow on its way out, and an exclamation for
// a problem. Kept for the notices that want a mark rather than a glyph.
const StatusIcon = ({ type }) => (
	<span className="pill-notice__icon pill-notice__glyph" aria-hidden="true">
		<svg
			viewBox="0 0 20 20"
			width="18"
			height="18"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.7"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle className="pill-notice__ring" cx="10" cy="10" r="7.9" />
			{
				type === "error"
					? <>
						<path className="pill-notice__mark" d="M10 6.1v4.3" />
						<circle className="pill-notice__dot" cx="10" cy="13.6" r="1" fill="currentColor" stroke="none" />
					</>
					: type === "farewell"
						? <path className="pill-notice__mark" d="M7.3 10h4.7M12 10l-2.3-2.3M12 10l-2.3 2.3" />
						: <path className="pill-notice__mark" d="M6.6 10.4l2.4 2.4 4.5-4.9" />
			}
		</svg>
	</span>
)

// Plays notices inside the navbar pill. The pill already clips to its rounded
// border, so the links and the message are hidden by that overflow as they
// travel out, and the pill keeps its exact width throughout: the links stay in
// the layout, they are only translated and faded.
const PillNotice = ({ scopeRef }) => {
	const { version, peek, advance } = useNoticeQueue()
	const [notice, setNotice] = useState(null)
	const overlayRef = useRef(null)
	const textRef = useRef(null)
	const running = useRef(false)
	const mounted = useRef(true)
	const itemsHidden = useRef(false)
	const commitRef = useRef(null)
	const strokeLengths = useRef({ ring: 0, mark: 0 })

	const items = useCallback(() => (
		Array.from(scopeRef.current?.querySelectorAll(".pill-nav-item") || [])
	), [scopeRef])

	const letters = useCallback(() => (
		Array.from(scopeRef.current?.querySelectorAll(".pill-notice__letter") || [])
	), [scopeRef])

	const resetItems = useCallback(() => {
		items().forEach((element) => {
			element.style.opacity = ""
			element.style.transform = ""
		})
		itemsHidden.current = false
	}, [items])

	// Resolves once the letters for a notice are actually in the DOM, so the
	// measuring and the first keyframe never race the React commit.
	const mountNotice = useCallback((value) => new Promise((resolve) => {
		commitRef.current = resolve
		setNotice(value)
	}), [])

	// Measures the icon strokes and parks them fully drawn-back. This runs as a
	// layout effect, before the frame is painted, so the tick is never seen at
	// full length for an instant before it starts drawing.
	const prepareIcon = useCallback(() => {
		const overlay = overlayRef.current
		if (!overlay) return

		const ring = overlay.querySelector(".pill-notice__ring")
		const mark = overlay.querySelector(".pill-notice__mark")
		const lengths = { ring: 0, mark: 0 }

		if (ring) {
			lengths.ring = ring.getTotalLength?.() || 0
			ring.style.strokeDasharray = `${lengths.ring}`
			ring.style.strokeDashoffset = `${lengths.ring}`
		}
		if (mark) {
			lengths.mark = mark.getTotalLength?.() || 0
			mark.style.strokeDasharray = `${lengths.mark}`
			mark.style.strokeDashoffset = `${lengths.mark}`
		}
		strokeLengths.current = lengths
	}, [])

	useLayoutEffect(() => {
		if (!notice || !commitRef.current) return
		prepareIcon()
		const resolve = commitRef.current
		commitRef.current = null
		resolve()
	}, [notice, prepareIcon])

	useEffect(() => {
		mounted.current = true
		return () => {
			mounted.current = false
			running.current = false
			if (commitRef.current) {
				const resolve = commitRef.current
				commitRef.current = null
				resolve()
			}
			resetItems()
		}
	}, [resetItems])

	// The message has to fit the width the pill already has, so it is measured
	// and the font steps down until it does. Short notices never shrink.
	const fit = useCallback(() => {
		const overlay = overlayRef.current
		const element = textRef.current
		if (!element || !overlay) return

		const glyph = overlay.querySelector(".pill-notice__glyph")
		const reserved = glyph ? glyph.offsetWidth + ICON_GAP : 0
		const available = overlay.clientWidth - OVERLAY_PADDING - reserved
		let size = FONT_SIZE
		element.style.fontSize = `${size}px`
		while (size > FONT_SIZE_MIN && element.scrollWidth > available) {
			size -= 0.5
			element.style.fontSize = `${size}px`
		}
	}, [])

	useEffect(() => {
		if (!version || running.current) return undefined
		running.current = true

		const alive = () => mounted.current

		// With no animation library - a failed import, or reduced motion - the
		// same phases play out instantly, so the notice still reaches the user.
		const hideItems = async (animate) => {
			const targets = items()
			if (animate && targets.length) {
				await animate(targets, ITEMS_OUT, {
					duration: ITEM_OUT,
					delay: index => index * ITEM_STAGGER,
					ease: "easeIn",
				})
			}
			pin(targets, 0, ITEM_TRAVEL)
			itemsHidden.current = true
		}

		const showItems = async (animate) => {
			const targets = items()
			if (animate && targets.length) {
				await animate(targets, ITEMS_IN, {
					duration: ITEM_IN,
					delay: index => index * ITEM_STAGGER,
					ease: EASE_OUT,
				})
			}
			// Hand the links back to the stylesheet once they are home.
			resetItems()
		}

		// The drawn status icon: ring and mark sweep themselves on.
		const showDrawnIcon = async (animate) => {
			const overlay = overlayRef.current
			const icon = overlay?.querySelector(".pill-notice__icon")
			if (!icon) return

			const ring = overlay.querySelector(".pill-notice__ring")
			const mark = overlay.querySelector(".pill-notice__mark")
			const dot = overlay.querySelector(".pill-notice__dot")
			const { ring: ringLength, mark: markLength } = strokeLengths.current

			if (animate) {
				const steps = [animate(icon, ICON_SETS.in, { duration: ICON_IN, ease: EASE_OUT })]

				if (ring) {
					steps.push(animate(ring, { "stroke-dashoffset": [`${ringLength}px`, "0px"] }, { duration: ICON_RING, ease: EASE_OUT }))
				}
				if (mark) {
					steps.push(animate(mark, { "stroke-dashoffset": [`${markLength}px`, "0px"] }, { duration: ICON_MARK, delay: ICON_MARK_DELAY, ease: EASE_OUT }))
				}
				if (dot) {
					steps.push(animate(dot, { opacity: [0, 1] }, { duration: 0.18, delay: ICON_MARK_DELAY + 0.06, ease: EASE_OUT }))
				}
				await Promise.all(steps)
			}

			icon.style.opacity = "1"
			icon.style.transform = "translateY(0px) scale(1)"
			if (ring) ring.style.strokeDashoffset = "0"
			if (mark) mark.style.strokeDashoffset = "0"
			if (dot) dot.style.opacity = "1"
		}

		// An emoji lands with a pop; a wave then waves.
		const showEmoji = async (animate, emoji) => {
			const element = overlayRef.current?.querySelector(".pill-notice__emoji")
			if (!element) return

			const waving = WAVING.has(emoji)
			if (animate) {
				await animate(element, waving ? EMOJI_WAVE_IN : EMOJI_IN, {
					duration: waving ? EMOJI_WAVE_DURATION : EMOJI_IN_DURATION,
					ease: EASE_OUT,
				})
			}
			element.style.opacity = "1"
			element.style.transform = "translateY(0px) scale(1)"
		}

		const showGlyph = async (animate, notice) => {
			if (notice.emoji) await showEmoji(animate, notice.emoji)
			else await showDrawnIcon(animate)
		}

		// Either glyph leaves the same way: down and out with the copy.
		const hideGlyph = async (animate) => {
			const glyph = overlayRef.current?.querySelector(".pill-notice__glyph")
			if (!glyph) return

			if (animate) {
				await animate(glyph, ICON_SETS.out, { duration: ICON_OUT, ease: "easeIn" })
			}
			glyph.style.opacity = "0"
			glyph.style.transform = `translateY(${LETTER_TRAVEL}px) scale(0.8)`
		}

		const showLetters = async (animate) => {
			const targets = letters()
			if (!targets.length) return
			fit()
			if (animate) {
				await animate(targets, LETTERS_IN, {
					duration: LETTER_IN,
					delay: (index, total) => LETTER_LEAD + index * staggerFor(total),
					ease: EASE_OUT,
				})
			}
			pin(targets, 1, 0)
		}

		const hideLetters = async (animate) => {
			const targets = letters()
			if (!targets.length) return
			if (animate) {
				await animate(targets, LETTERS_OUT, {
					duration: LETTER_OUT,
					// The tail of the message leaves first, so it reads as the
					// line falling back the way it came in.
					delay: (index, total) => (total - 1 - index) * staggerFor(total),
					ease: "easeIn",
				})
			}
			pin(targets, 0, LETTER_TRAVEL)
		}

		const run = async () => {
			const motion = await loadMotion().catch(() => null)
			const animate = motion && !prefersReducedMotion() ? motion.animate : null

			let current = peek()
			while (current && alive()) {
				if (!itemsHidden.current) {
					await hideItems(animate)
					if (!alive()) break
				}

				// A run of notices keeps the links out and only swaps the content.
				while (current && alive()) {
					await mountNotice(current)
					await Promise.all([showGlyph(animate, current), showLetters(animate)])
					await wait(holdFor(current.text))
					if (!alive()) break
					await Promise.all([hideGlyph(animate), hideLetters(animate)])
					setNotice(null)
					// Only now does it leave the queue, so an interrupted run replays it.
					advance(current.id)
					current = peek()
				}
				if (!alive()) break

				// A notice raised during the last frames of the animation should
				// land before the links come back.
				await nextFrame()
				current = peek()

				if (!current) {
					await showItems(animate)
					if (!alive()) break
					await nextFrame()
					current = peek()
				}
			}
		}

		run().finally(() => {
			running.current = false
		})

		return undefined
	}, [version, peek, advance, fit, items, letters, mountNotice, resetItems, prepareIcon])

	if (!notice) return null

	return (
		<div
			className="pill-notice"
			data-type={notice.type}
			ref={overlayRef}
			role="status"
			aria-live="polite"
		>
			{
				notice.emoji
					? <span className="pill-notice__emoji pill-notice__glyph" key={`${notice.id}-emoji`} aria-hidden="true">{notice.emoji}</span>
					: <StatusIcon key={`${notice.id}-icon`} type={notice.type} />
			}
			<span className="pill-notice__text" ref={textRef} aria-hidden="true">
				{
					Array.from(notice.text).map((character, index) => (
						<span className="pill-notice__letter" key={`${notice.id}-${index}`}>
							{character === " " ? "\u00a0" : character}
						</span>
					))
				}
			</span>
			<span className="visually-hidden">{notice.text}</span>
		</div>
	)
}

export default PillNotice
