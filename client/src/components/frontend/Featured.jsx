import { useEffect, useRef, useState } from "react"
import BnbCard from "../shared/BnbCard"
import { useProduct } from "../../context/ProductContext"

const Featured = () => {
	const [products, setProducts] = useState([])
	const { GetCustomizedProducts } = useProduct()
	const log = useRef(true)
	const getProducts = async () => {
		try {
			const res = await GetCustomizedProducts("type", "Sneakers", 1, [], 4)
			setProducts(res)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		if (log.current) {
			getProducts()
			log.current = false
		}
	}, [])
	return (
		<div className="container">
			<div className="row justify-content-center">
				{products.map((product, index) => {
					return <div className="col-12 col-md-6 col-lg-3" key={index}>
						<BnbCard data={product} uniqueKey={product._id} />
					</div>
				})}
			</div>
		</div>
	)
}

export default Featured
