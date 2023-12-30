import { useAuth } from "../context/AuthContext"
import Login from "../pages/auth/Login"
const PrivateRoute = ({ Component }) => {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Component />
    }
    return <Login />
}

export default PrivateRoute