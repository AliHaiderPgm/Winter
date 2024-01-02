import axios from "axios"
import { ServerURL } from "."
const API_URL = `${ServerURL()}/users`
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
	return res
}

//logout user
const logoutUser = async () => {
	const res = await axios.get(`${API_URL}/logout`, config)
	return res.status
}

//get user data
const getMe = async () => {
	const res = await axios.get(`${API_URL}/me`, config)
	return res
}


// get all users
const getAllUsers = async () => {
	const res = await axios.get(`${API_URL}/getAllUsers`)
	return res.data
}

// update user
const updateUser = async (id, data) => {
	const res = await axios.put(`${API_URL}/update/${id}`, data, config)
	return res.data
}

// delete user
const deleteUser = async (id) => {
	const res = await axios.delete(`${API_URL}/delete/${id}`, config)
	return res.data
}
const AuthServices = {
	registerUser,
	loginUser,
	logoutUser,
	getMe,
	getAllUsers,
	updateUser,
	deleteUser
}

export default AuthServices
