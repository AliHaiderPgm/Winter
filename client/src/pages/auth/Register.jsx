import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Checkbox, Form, Input, message } from "antd"
import AuthServices from "../../context/AuthServices"
import { useAuth } from "../../context/AuthContext"
import LoginImage from "../../assets/signup.jpg"
import Logo from "../../assets/logo.png"

export default function Login() {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { dispatch } = useAuth()
	const [innerWidth, setInnerWidth] = useState(window.innerWidth)
	useEffect(() => {
		window.addEventListener("resize", () => setInnerWidth(window.innerWidth))
		return () => {
			window.removeEventListener("resize", () => setInnerWidth(window.innerWidth))
		}
	}, [])

	const handleSubmit = async (e) => {
		try {
			if (e.password !== e.confirmPassword) {
				return message.error("Password does not match.")
			}
			setLoading(true)
			const data = {
				...e,
				type: "user"
			}
			const user = await AuthServices.registerUser(data)
			dispatch({ type: "LOGIN", payload: { user } })
			navigate("/")
		} catch (error) {
			console.log(error)
			message.error("Oops! Something went wrong!")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="container-fluid">
			<div className="row dvh-100">
				{
					innerWidth >= 768 && <div className="col-6 p-0 dvh-100">
						<img src={LoginImage} alt="Winter store" className="img-fluid object-fit-cover w-100 h-100" />
					</div>
				}
				<div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
					<div className=" col-md-9 d-flex flex-column gap-3 p-5 p-md-0">
						<div>
							<img src={Logo} alt="winter" className="img-fluid col-2 col-md-1 mb-3" />
							<h1 className="fw-bold">Register</h1>
							<p className="fw-semibold x">Already have an account? <Link to="/auth/login">Login</Link></p>
						</div>
						<div>
							<Form
								name="basic"
								layout="vertical"
								onFinish={e => handleSubmit(e)}
							>
								<Form.Item
									label="Name"
									name="name"
									rules={[
										{
											required: true,
											message: 'Please input your name!',
										},
									]}
								>
									<Input size="large" />
								</Form.Item>
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
									label="Password"
									name="password"
									rules={[
										{
											required: true,
											message: 'Please input your password!',
										},
									]}
								>
									<Input.Password size="large" />
								</Form.Item>
								<Form.Item
									label="Confirm Password"
									name="confirmPassword"
									rules={[
										{
											required: true,
											message: 'This field is required!',
										},
									]}
								>
									<Input.Password size="large" />
								</Form.Item>

								<Form.Item>
									<Button type="primary" htmlType="submit" className="btn-filled w-100 p-2" loading={loading}>
										Register
									</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
