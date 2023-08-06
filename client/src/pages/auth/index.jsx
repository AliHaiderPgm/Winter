import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import { ForgotPassword } from "./ForgotPassword"

const index = () => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgotPassword" element={<ForgotPassword />} />
			</Routes>
		</>
	)
}

export default index
