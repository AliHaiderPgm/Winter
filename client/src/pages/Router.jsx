import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./frontend"
import Auth from "./auth"
import Dashboard from "./dashboard"

const Router = () => {
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
