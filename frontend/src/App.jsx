// Bootstrap's JS is not needed: every interactive piece here (navbar menu,
// search overlay, dropdowns) is React state, and no markup uses data-bs-*
// attributes. Dropping it removes ~82 KB from the first load.
import "./App.scss"
import Router from "../src/pages/Router"
import AuthContextProvider from "./context/AuthContext"
// Deep paths, not the antd barrel. antd declares sideEffects: ["*.css"], so
// importing the barrel keeps every component (Table, Tree, DatePicker...) in
// the graph and pulls them into the first load. Each deep import brings only
// that component.
import AntApp from "antd/es/app"
import ConfigProvider from "antd/es/config-provider"
import ProductContextProvider from "./context/ProductContext"
import CartContextProvider from "./context/CartContext"
import NoticeProvider from "./context/NoticeContext"
import antdTheme from "./components/antdTheme"
function App() {
	return (
		<ConfigProvider theme={antdTheme}>
			<AntApp>
				{/* Inside AntApp so notices can still fall back to antd's toast
				    wherever the navbar pill is not on screen. */}
				<NoticeProvider>
					<AuthContextProvider>
						<ProductContextProvider>
							<CartContextProvider>
									<Router />
							</CartContextProvider>
						</ProductContextProvider>
					</AuthContextProvider>
				</NoticeProvider>
			</AntApp>
		</ConfigProvider>
	)
}

export default App
