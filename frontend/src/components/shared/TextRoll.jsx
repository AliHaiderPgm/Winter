// Hover roll for short labels: two stacked copies of the same string roll past
// each other inside a one-line clip. Every letter is its own clip box and carries
// a transition delay set from the distance to the middle of the word, so the
// middle letters start first and the edges lag - the word reads as a single roll
// instead of a wipe. Use `center={false}` for a left-to-right stagger.
//
// Pure CSS on purpose (see utils/motion.js): this animates on the compositor, is
// correct on first paint without JS, and follows prefers-reduced-motion for free.
// The delay is the only thing that has to come from React; all geometry - clip
// height, transforms, hover/focus triggers - lives in sass/components/TextRoll.scss.

const STAGGER = 0.035;

export const TextRoll = (props) => {
	const { children, className = "", center = true } = props;
	const letters = Array.from(children);
	const middle = (letters.length - 1) / 2;

	return (
		<span className={`text-roll ${className}`.trim()}>
			{/* In flow and invisible: owns the width, the baseline and the accessible
			    name, so the link keeps exactly the size and position it had before. */}
			<span className="text-roll__label">{children}</span>
			{/* The animation itself, painted on top of the label. */}
			<span className="text-roll__roll" aria-hidden="true">
				{letters.map((letter, index) => {
					const delay = center
						? STAGGER * Math.abs(index - middle)
						: STAGGER * index;
					// A plain space would collapse to zero width inside its cell, which
					// would let the letters after it slide sideways as they roll.
					const glyph = letter === " " ? "\u00a0" : letter;

					return (
						<span className="text-roll__cell" key={index}>
							<span
								className="text-roll__glyph"
								style={{ transitionDelay: `${delay}s` }}
							>
								{glyph}
							</span>
							<span
								className="text-roll__glyph text-roll__glyph--clone"
								style={{ transitionDelay: `${delay}s` }}
							>
								{glyph}
							</span>
						</span>
					);
				})}
			</span>
		</span>
	);
};
