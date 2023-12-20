import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "./App.scss"
import Router from "../src/pages/Router"
import AuthContextProvider from "./context/AuthContext"
import { ThemeProvider } from "@mui/material"
import { theme } from "./components/muiTheme"
import { ConfigProvider } from "antd"
import ProductContextProvider from "./context/ProductContext"
import CartContextProvider from "./context/CartContext"
import antdTheme from "./components/antdTheme"
function App() {
	return (
		<>
			<AuthContextProvider>
				<ProductContextProvider>
					<CartContextProvider>
						<ThemeProvider theme={theme}>
							<ConfigProvider theme={antdTheme}>
								<Router />
							</ConfigProvider>
						</ThemeProvider>
					</CartContextProvider>
				</ProductContextProvider>
			</AuthContextProvider>
		</>
	)
}

export default App
