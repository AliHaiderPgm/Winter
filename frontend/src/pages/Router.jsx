import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./frontend"
import Auth from "./auth"
import Dashboard from "./dashboard"
import { useAuth } from "../context/AuthContext"
import PreLoader from "../components/PreLoader"
import ScrollToTop from "../components/shared/ScrollToTop"

const Router = () => {
	const { loading, isAuthenticated, user } = useAuth()
	const isAdmin = user?.type?.toLowerCase?.() === "admin"

	if (loading) {
		return <PreLoader />
	}
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path="/auth/*" element={isAuthenticated ? <Navigate to={isAdmin ? "/dashboard/products" : "/" } replace={true} /> : <Auth />} />
				<Route path="/dashboard/*" element={isAuthenticated && isAdmin ? <Dashboard /> : <Navigate to="/" replace={true} />} />
				<Route path="/*" element={<Home />} />
				<Route path="*" element={<>Page Not Found</>} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
