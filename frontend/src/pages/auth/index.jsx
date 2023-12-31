import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import ForgotPassword from "./ForgotPassword"

const index = () => {
	return (
		<>
			<Routes>
				<Route path="/" index element={<Navigate to="/" replace={true} />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgotPassword" element={<ForgotPassword />} />
			</Routes>
		</>
	)
}

export default index
