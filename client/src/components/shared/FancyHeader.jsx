const FancyHeader = ({ front, back, small }) => {
	return (
		<div className="header-container">
			<h1 className="back">{back}</h1>
			<h1 className="front">{front}</h1>
			<p className="small">{small}</p>
		</div>
	)
}

export default FancyHeader
