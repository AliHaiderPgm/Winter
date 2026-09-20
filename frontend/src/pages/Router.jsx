/* eslint-disable react-refresh/only-export-components -- the lazy() trees
   below are split points, not components Fast Refresh can keep alive. */
import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./frontend"
import { useAuth } from "../context/AuthContext"
import PreLoader from "../components/PreLoader"
import ScrollToTop from "../components/shared/ScrollToTop"

// The dashboard pulls in antd's tables, date pickers and menus, and the auth
// screens pull in its forms. No storefront visitor needs either, so both are
// split out of the first load.
const Auth = lazy(() => import("./auth"))
const Dashboard = lazy(() => import("./dashboard"))

const Router = () => {
	const { loading, isAuthenticated, user } = useAuth()
	const isAdmin = user?.type?.toLowerCase?.() === "admin"

	if (loading) {
		return <PreLoader />
	}
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Suspense fallback={<PreLoader />}>
				<Routes>
					<Route path="/auth/*" element={isAuthenticated ? <Navigate to={isAdmin ? "/dashboard/products" : "/" } replace={true} /> : <Auth />} />
					<Route path="/dashboard/*" element={isAuthenticated && isAdmin ? <Dashboard /> : <Navigate to="/" replace={true} />} />
					<Route path="/*" element={<Home />} />
					<Route path="*" element={<>Page Not Found</>} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default Router
