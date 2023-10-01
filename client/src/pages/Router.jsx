import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./frontend"
import Auth from "./auth"
import Dashboard from "./dashboard"
import { useAuth } from "../context/AuthContext"
import Loader from "../components/shared/Loader"

const Router = () => {
	const { loading } = useAuth()
	if (loading) {
		return <div style={{ height: "100vh" }}>
			<Loader />
		</div>
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<Home />} />
				<Route path="/auth/*" element={<Auth />} />
				<Route path="/dashboard/*" element={<Dashboard />} />
				<Route path="*" element={<>Page Not Found</>} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
