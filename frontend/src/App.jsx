import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "./App.scss"
import Router from "../src/pages/Router"
import AuthContextProvider from "./context/AuthContext"
import { App as AntApp, ConfigProvider } from "antd"
import ProductContextProvider from "./context/ProductContext"
import CartContextProvider from "./context/CartContext"
import antdTheme from "./components/antdTheme"
function App() {
	return (
		<ConfigProvider theme={antdTheme}>
			<AntApp>
				<AuthContextProvider>
					<ProductContextProvider>
						<CartContextProvider>
								<Router />
						</CartContextProvider>
					</ProductContextProvider>
				</AuthContextProvider>
			</AntApp>
		</ConfigProvider>
	)
}

export default App
