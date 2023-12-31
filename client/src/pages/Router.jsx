import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./frontend"
import Auth from "./auth"
import Dashboard from "./dashboard"
import { useAuth } from "../context/AuthContext"
import PreLoader from "../components/PreLoader"

const Router = () => {
	const { loading, isAuthenticated, user } = useAuth()
	if (loading) {
		return <PreLoader />
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<Home />} />
				<Route path="/auth/*" element={isAuthenticated ? <Navigate to="/" replace={true} /> : <Auth />} />
				{
					isAuthenticated && user.type === "admin" ?
						<Route path="/dashboard/*" element={<Dashboard />} /> : null
				}
				<Route path="*" element={<>Page Not Found</>} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
