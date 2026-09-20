/* eslint-disable react/prop-types -- a card wrapper; its props are slots, and
   the project has no prop-types. */
// The same card as the storefront's topic and channel cards: white, 2px
// #11111141 border, 7px radius. `flush` drops the padding for content that
// draws to its own edges, like a table.
const Panel = ({ title, note, actions, flush = false, className = "", children }) => {
	const head = title || note || actions

	return (
		<section className={`dashboard__card ${flush ? "dashboard__card--flush" : ""} ${className}`}>
			{head ? (
				<header className="dashboard__card__head">
					<div>
						{title ? <h2>{title}</h2> : null}
						{note ? <p className="note">{note}</p> : null}
					</div>
					{actions ? <div className="d-flex flex-wrap gap-2 align-items-center">{actions}</div> : null}
				</header>
			) : null}
			{children}
		</section>
	)
}

export default Panel
