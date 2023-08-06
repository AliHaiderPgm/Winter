import axios from "axios"

const API_URL = "http://localhost:5000/api/users"

// register user
const registerUser = async (userData) => {
	const res = await axios.post(API_URL, userData)
	if (res.data) {
		localStorage.setItem("user", JSON.stringify(res.data))
	}
	return res.data
}

// login user
const loginUser = async (userData) => {
	const res = await axios.post(`${API_URL}/login`, userData)
	if (res.data) {
		localStorage.setItem("user", JSON.stringify(res.data))
	}
	return res.data
}

// logout user
const logoutUser = () => {
	localStorage.removeItem("user")
}

const AuthServices = {
	registerUser,
	loginUser,
	logoutUser,
}

export default AuthServices
