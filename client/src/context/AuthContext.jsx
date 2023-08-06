import { createContext, useContext, useEffect, useReducer } from "react"

const AuthContext = createContext()

const initialState = { isAuthenticated: false }
const reducer = (state, actions) => {
	switch (actions.type) {
		case "LOGIN":
			return { isAuthenticated: true, user: actions.payload.user }
		case "LOGOUT":
			return { isAuthenticated: false }
		default:
			return state
	}
}
const AuthContextProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	// check for user in local storage
	useEffect(() => {
		const storedState = JSON.parse(localStorage.getItem("user"))
		if (storedState) {
			dispatch({ type: "LOGIN", payload: { user: storedState } })
		}
	}, [])
	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider

export const useAuth = () => {
	return useContext(AuthContext)
}
