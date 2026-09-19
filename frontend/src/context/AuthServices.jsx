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

// update the authenticated user's profile
const updateMe = async (userData) => {
	const res = await axios.put(`${API_URL}/me`, userData, config)
	return res.data
}

// update the authenticated user's password
const updatePassword = async (passwordData) => {
	const res = await axios.put(`${API_URL}/me/password`, passwordData, config)
	return res.data
}

// upload the authenticated user's profile image
const uploadProfileImage = async (base64, onUploadProgress) => {
	const res = await axios.post(`${API_URL}/profile-image`, { base64 }, {
		...config,
		onUploadProgress,
	})
	return res.data
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
	updateMe,
	updatePassword,
	uploadProfileImage,
	getAllUsers,
	updateUser,
	deleteUser
}

export default AuthServices
