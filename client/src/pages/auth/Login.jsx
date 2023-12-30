import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Checkbox, Form, Input, message } from "antd"
import AuthServices from "../../context/AuthServices"
import { useAuth } from "../../context/AuthContext"
import LoginImage from "../../assets/login.jpg"
import Logo from "../../assets/logo.png"

export default function Login() {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { dispatch } = useAuth()
	const [innerWidth, setInnerWidth] = useState(window.innerWidth)
	const { pathname } = useLocation()
	useEffect(() => {
		window.addEventListener("resize", () => setInnerWidth(window.innerWidth))
		return () => {
			window.removeEventListener("resize", () => setInnerWidth(window.innerWidth))
		}
	}, [])

	const handleSubmit = async (e) => {
		try {
			setLoading(true)
			const res = await AuthServices.loginUser(e)
			if (res.status === 200) {
				dispatch({ type: "LOGIN", payload: { user: res.data } })
				navigate(pathname)
			}
		} catch (error) {
			message.error("Failed to login!")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="container-fluid">
			<div className="row dvh-100">
				<div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
					<div className=" col-md-9 d-flex flex-column gap-3 p-5 p-md-0">
						<div>
							<img src={Logo} alt="winter" className="img-fluid col-2 col-md-1 mb-3" />
							<h1 className="fw-bold">Sign in to your account</h1>
							<p className="fw-semibold">Not a member? <Link to="/auth/register">Join now</Link></p>
						</div>
						<div>
							<Form
								name="basic"
								layout="vertical"
								initialValues={{
									remember: true,
								}}
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

								<div className="d-flex align-items-center justify-content-between my-3">
									<Form.Item
										name="remember"
										valuePropName="checked"
									>
										<Checkbox>Remember me</Checkbox>
									</Form.Item>

									<Link to="/auth/forgotPassword" className="fw-semibold link-underline-opacity-0-hover">Forgot Password?</Link>
								</div>

								<Form.Item
								>
									<Button type="primary" htmlType="submit" className="btn-filled w-100 p-2" loading={loading}>
										Submit
									</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
				{
					innerWidth >= 768 && <div className="col-6 p-0 dvh-100">
						<img src={LoginImage} alt="Winter store" className="img-fluid object-fit-cover w-100 h-100" />
					</div>
				}
			</div>
		</div>
	)
}
