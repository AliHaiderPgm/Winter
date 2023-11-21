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

export const sortBy = [
	{ label: "Newest", value: "newest" },
	{ label: "Price: High-Low", value: "desc" },
	{ label: "Price: Low-High", value: "acs" },
]

export const shoeFor = [
	{
		value: 'male',
		label: 'Men',
	},
	{
		value: 'female',
		label: 'Women',
	},
	{
		value: 'children',
		label: 'Kids',
	},
]

export const sortByPrice = [
	{
		label: "Under Rs.1999",
		value: "0-1999"
	},
	{
		label: "Rs.2000 - Rs.4999",
		value: "2000-4999"
	},
	{
		label: "Rs.5000 - Rs.9999",
		value: "5000-9999"
	},
	{
		label: "Over Rs.10,000",
		value: "10000-999999999"
	},
]