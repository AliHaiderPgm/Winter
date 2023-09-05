import axios from "axios"
const API_URL = "http://localhost:5000/api/users"
const config = {
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
	credentials: "same-origin",
}
// register user
const registerUser = async (userData) => {
	const res = await axios.post(API_URL, userData, config)
	return res.data
}

// login user
const loginUser = async (userData) => {
	const res = await axios.post(`${API_URL}/login`, userData, config)
	return res.data
}

//logout user
const logoutUser = async () => {
	const res = await axios.post(`${API_URL}/logout`, config)
	return res.status
}

//get user data
const getMe = async () => {
	const res = await axios.get(`${API_URL}/me`, config)
	return res.data
}

const AuthServices = {
	registerUser,
	loginUser,
	logoutUser,
	getMe,
}

export default AuthServices
