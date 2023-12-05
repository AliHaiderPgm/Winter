import { message } from "antd"

export const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})

export const urlToBase64 = async (url) => {
	try {
		const response = await fetch(url)
		const blob = await response.blob()
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(blob)
			reader.onloadend = () => {
				if (reader.result) {
					resolve(reader.result)
				} else {
					reject("Base64 conversion failed")
				}
			}
			reader.onerror = reject
		})
	} catch (error) {
		throw new Error(`Error converting URL to base64: ${error}`)
	}
}
export const getRandomId = () => Math.random().toString(36).slice(2)

export const slugify = (text) => {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')  // Replace spaces with hyphens
		.replace(/[^\w\-]+/g, '')  // Remove special characters
		.replace(/\-\-+/g, '-')  // Replace consecutive hyphens with a single hyphen
		.replace(/^-+/, '')  // Remove leading hyphens
		.replace(/-+$/, ''); // Remove trailing hyphens
}

export const addToHistory = (e) => {
	const dataObj = JSON.parse(localStorage.getItem("history"))
	const dataArray = dataObj ? dataObj : []
	const isAlreadyAdded = dataArray?.some(val => val?.value.toLowerCase() === e?.toLowerCase())
	if (!isAlreadyAdded && e !== "" && e !== undefined && e !== null) {
		const dataToStore = {
			value: e,
			date: new Date().getTime()
		}
		dataArray.push(dataToStore)
		localStorage.setItem("history", JSON.stringify(dataArray))
	}
}

export const getHistory = () => {
	const dataObj = JSON.parse(localStorage.getItem("history"))
	return dataObj
}


// --------------FAVORITE PRODUCTS -------------------//

export const handleAddToFavorites = (product) => {
	const dataObj = JSON.parse(localStorage.getItem("favProducts"))
	if (checkInFavorites(product)) {
		message.error("Already added to Favorites!")
		return
	}
	const dataArray = dataObj ? dataObj : []
	dataArray.push(product)
	localStorage.setItem("favProducts", JSON.stringify(dataArray))
	message.success("Added to Favorites!")
}
export const checkInFavorites = (product) => {
	const dataObj = JSON.parse(localStorage.getItem("favProducts"))
	const isAlreadyAdded = dataObj?.some(item => item._id === product._id)
	return isAlreadyAdded
}


// ---------------CART PRODUCTS ------------------------//
