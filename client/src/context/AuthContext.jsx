import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from "react"
import AuthServices from "./AuthServices"

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
	const [loading, setLoading] = useState(false)
	const log = useRef(true)
	const getUser = async () => {
		try {
			setLoading(true)
			const res = await AuthServices.getMe()
			dispatch({ type: "LOGIN", payload: { user: res.data } })
		} catch (error) {
			dispatch({ type: "LOGOUT" })
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if (log.current) {
			getUser()
			log.current = false
		}
	}, [])
	return (
		<>
			<AuthContext.Provider value={{ ...state, dispatch, loading }}>
				{props.children}
			</AuthContext.Provider>
		</>
	)
}

export default AuthContextProvider

export const useAuth = () => {
	return useContext(AuthContext)
}
