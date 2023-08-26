import {
	TextInput,
	PasswordInput,
	Checkbox,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
} from "@mantine/core"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { message } from "antd"
import AuthServices from "../../context/AuthServices"
import { useAuth } from "../../context/AuthContext"

const initialState = {
	email: "",
	password: "",
}
export default function Login() {
	const [state, setState] = useState(initialState)
	const [loading, setLoading] = useState(false)
	const [messageApi, contextHolder] = message.useMessage()
	const navigate = useNavigate()
	const { dispatch } = useAuth()

	const handleChange = (e) => {
		setState((s) => ({ ...s, [e.target.name]: e.target.value }))
	}

	const notify = (type, msg) => {
		messageApi.open({ type: type, content: msg })
	}

	const handleSubmit = async () => {
		const { email, password } = state
		if (email.length === 0 || password.length === 0) {
			notify("error", "Please enter email & password!")
		}
		setLoading(true)
		const userData = {
			email,
			password,
		}
		try {
			await AuthServices.loginUser(userData)
			const user = await AuthServices.getMe()
			dispatch({ type: "LOGIN", payload: { user } })
			navigate("/")
		} catch (error) {
			notify("error", error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			{contextHolder}
			<div
				className="d-flex justify-content-center align-items-center bg-Image"
				style={{ height: "100vh" }}
			>
				<Container
					size={420}
					my={40}
					style={{ width: "420px", position: "relative" }}
				>
					<Title
						align="center"
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontWeight: 900,
						})}
					>
						Welcome back!
					</Title>
					<Text className="text-muted" size="sm" align="center" mt={5}>
						Do not have an account yet?
						<Link to="/auth/register">Create one</Link>
					</Text>

					<Paper withBorder shadow="md" p={30} mt={30} radius="md">
						<TextInput
							label="Email"
							placeholder="you@mail.dev"
							required
							name="email"
							value={state.email}
							onChange={handleChange}
						/>
						<PasswordInput
							label="Password"
							placeholder="Your password"
							required
							mt="md"
							name="password"
							value={state.password}
							onChange={handleChange}
						/>
						<Group position="apart" mt="lg">
							<Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
							<Link to="/auth/forgotPassword">Forget Password</Link>
						</Group>
						{loading ? (
							<Button fullWidth mt="xl" className="bg-primaryColor" loading>
								Log in
							</Button>
						) : (
							<Button
								fullWidth
								mt="xl"
								className="bg-primaryColor"
								onClick={handleSubmit}
							>
								Log in
							</Button>
						)}
					</Paper>
				</Container>
			</div>
		</>
	)
}
