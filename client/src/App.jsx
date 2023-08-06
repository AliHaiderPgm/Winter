import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "./App.scss"
import Router from "../src/pages/Router"
import AuthContextProvider from "./context/AuthContext"
import { ThemeProvider } from "@mui/material"
import { theme } from "./components/muiTheme"
function App() {
	return (
		<>
			<AuthContextProvider>
				<ThemeProvider theme={theme}>
					<Router />
				</ThemeProvider>
			</AuthContextProvider>
		</>
	)
}

export default App
