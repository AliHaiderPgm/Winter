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
