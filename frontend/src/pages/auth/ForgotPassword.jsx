import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Form, Input } from "antd"
import RegisterImage from "../../assets/register.jpg"
import Logo from "../../assets/logo.png"

export default function ForgotPassword() {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const [innerWidth, setInnerWidth] = useState(window.innerWidth)
	useEffect(() => {
		window.addEventListener("resize", () => setInnerWidth(window.innerWidth))
		return () => {
			window.removeEventListener("resize", () => setInnerWidth(window.innerWidth))
		}
	}, [])

	const handleSubmit = async (e) => {
		console.log(e)
	}

	return (
		<div className="container-fluid">
			<div className="row dvh-100">
				<div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
					<div className=" col-md-9 d-flex flex-column gap-3 p-5 p-md-0">
						<div>
							<img src={Logo} alt="winter" className="img-fluid col-2 col-md-1 mb-3" />
							<h1 className="fw-bold">Forgot password?</h1>
							<p className="fw-semibold x">Create new account? <Link to="/auth/register">Register</Link></p>
						</div>
						<div>
							<Form
								name="basic"
								layout="vertical"
								onFinish={e => handleSubmit(e)}
							>
								<Form.Item
									label="Email"
									name="email"
									rules={[
										{
											required: true,
											message: 'Please input your email!',
										},
									]}
								>
									<Input size="large" />
								</Form.Item>

								<Form.Item
								>
									<Button type="primary" htmlType="submit" className="btn-filled w-100 p-2" loading={loading} disabled>
										Coming soon
									</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
				{
					innerWidth >= 768 && <div className="col-6 p-0 dvh-100">
						<img src={RegisterImage} alt="Winter store" className="img-fluid object-fit-cover w-100 h-100" />
					</div>
				}
			</div>
		</div>
	)
}
