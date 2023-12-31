import { Button } from "antd"
import { useEffect } from "react"

export default function Index() {
	useEffect(() => {
		document.title = "Contact"
		// Optionally, you can also update other meta tags
		const metaDescription = document.querySelector('meta[name="description"]')

		if (metaDescription) {
			metaDescription.content =
				"Contact us to help you with your product issues."
		}

		return () => {
			document.title = "Winter"
			if (metaDescription) {
				metaDescription.content =
					"Welcome to our online e-store, your one-stop destination for all your shopping needs. Discover an extensive range of high-quality products, carefully curated to cater to your diverse interests and preferences."
			}
		}
	})
	return (
		<>
			<div className="container-fluid p-0 my-3">
				<iframe
					title="We are right here..."
					src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13617.505295814151!2d73.07561025!3d31.431305199999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1674663703224!5m2!1sen!2s"
					width="100%"
					height="400"
					style={{ border: 0 }}
					allowFullScreen=""
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
			<div className="container d-flex justify-content-center mb-4">
				<div className="row">
					<h3 className="fw-bold text-center">Contact us</h3>
					<form action="">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							className="form-control"
							placeholder="Boogeyman"
						/>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							className="form-control"
							placeholder="abc@xyz.com"
						/>
						<label htmlFor="message">Message</label>
						<textarea
							placeholder="Enter your message here..."
							id="message"
							cols="30"
							rows="4"
							className="form-control"
						></textarea>
						<Button className="my-2 w-100 btn-filled">
							Send
						</Button>
					</form>
				</div>
			</div>
		</>
	)
}
