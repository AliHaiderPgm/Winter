import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "./App.scss"
import Router from "../src/pages/Router"
import AuthContextProvider from "./context/AuthContext"
import { ThemeProvider } from "@mui/material"
import { theme } from "./components/muiTheme"
import ProductContextProvider from "./context/ProductContext"
function App() {
	return (
		<>
			<AuthContextProvider>
				<ProductContextProvider>
					<ThemeProvider theme={theme}>
						<Router />
					</ThemeProvider>
				</ProductContextProvider>
			</AuthContextProvider>
		</>
	)
}

export default App
