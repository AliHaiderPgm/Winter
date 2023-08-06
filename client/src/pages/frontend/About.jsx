import Header from "../../components/Header"
import React, { useEffect, useRef } from "react"

export default function About() {
	const paragraphRef = useRef()

	useEffect(() => {
		document.title = "About"
		const metaDescription = document.querySelector('meta[name="description"]')

		// Update the meta description with the content of the <p> tag
		if (metaDescription && paragraphRef.current) {
			metaDescription.content = paragraphRef.current.textContent
		}

		// Cleanup function (optional)
		return () => {
			document.title = "E-store"
			if (metaDescription) {
				metaDescription.content =
					"Welcome to our online e-store, your one-stop destination for all your shopping needs. Discover an extensive range of high-quality products, carefully curated to cater to your diverse interests and preferences."
			}
		}
	}, [])

	return (
		<div style={{ minHeight: "80vh" }}>
			<h1 className="text-center">About us</h1>
			<p ref={paragraphRef}>
				Welcome to our e-store! We are an online shopping destination committed
				to bringing you an exceptional shopping experience. With a diverse range
				of products carefully curated for your needs, we aim to cater to every
				aspect of your lifestyle.
			</p>
		</div>
	)
}
