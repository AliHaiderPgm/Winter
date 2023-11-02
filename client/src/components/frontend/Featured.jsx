import BnbCard from "../shared/BnbCard"

const Featured = () => {
	return (
		<div className="row justify-content-center align-self-center">
			<div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center p-1">
				<BnbCard />
			</div>
			<div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center p-1">
				<BnbCard />
			</div>
			<div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center p-1">
				<BnbCard />
			</div>
			<div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center p-1">
				<BnbCard />
			</div>
		</div>
	)
}

export default Featured
