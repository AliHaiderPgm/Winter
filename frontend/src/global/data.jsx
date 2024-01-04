const brands = [
	{
		value: "",
		label: "Brand",
		disabled: true,
	},
	{
		value: "Nike",
		label: "Nike",
	},
	{
		value: "Adidas",
		label: "Adidas",
	},
	{
		value: "Amiri",
		label: "Amiri",
	},
	{
		value: "Puma",
		label: "Puma",
	},
	{
		value: "Reebok",
		label: "Reebok",
	},
	{
		value: "Fila",
		label: "Fila",
	},
	{
		value: "Hush Puppies",
		label: "Hush Puppies",
	},
	{
		value: "Bata",
		label: "Bata",
	},
]
const types = [
	{
		value: "",
		label: "Type",
		disabled: true,
	},
	{
		value: "Sneakers",
		label: "Sneakers",
	},
	{
		value: "Sportswear",
		label: "Sportswear",
	},
	{
		value: "Running",
		label: "Running",
	},
	{
		value: "Golf",
		label: "Golf",
	},
	{
		value: "Workout & Gym",
		label: "Workout & Gym",
	},
	{
		value: "Football",
		label: "Football",
	},
	{
		value: "Basketball",
		label: "Basketball",
	},
	{
		value: "LifeStyle",
		label: "LifeStyle",
	},
]
const shoefor = [
	{
		value: "",
		label: "For",
		disabled: true,
	},
	{
		value: "Male",
		label: "Male",
	},
	{
		value: "Female",
		label: "Female",
	},
	{
		value: "Children",
		label: "Children",
	},
]
const colors = [
	{
		value: "White",
		label: "White",
	},
	{
		value: "Red",
		label: "Red",
	},
	{
		value: "Black",
		label: "Black",
	},
	{
		value: "Blue",
		label: "Blue",
	},
	{
		value: "Green",
		label: "Green",
	},
]
const sizes = [
	{
		value: 6,
		label: "6",
	},
	{
		value: 6.5,
		label: "6.5",
	},
	{
		value: 7,
		label: "7",
	},
	{
		value: 7.5,
		label: "7.5",
	},
	{
		value: 8,
		label: "8",
	},
	{
		value: 8.5,
		label: "8.5",
	},
	{
		value: 9,
		label: "9",
	},
	{
		value: 9.5,
		label: "9.5",
	},
	{
		value: 10,
		label: "10",
	},
	{
		value: 10.5,
		label: "10.5",
	},
	{
		value: 11,
		label: "11",
	},
	{
		value: 11.5,
		label: "11.5",
	},
	{
		value: 12,
		label: "12",
	},
	{
		value: 12.5,
		label: "12.5",
	},
	{
		value: 13,
		label: "13",
	},
	{
		value: 14,
		label: "14",
	},
]
const data = {
	brands,
	types,
	shoefor,
	colors,
	sizes,
}
export default data


export const sortBy = [
	{ label: "Newest", value: "newest" },
	{ label: "Price: High-Low", value: "desc" },
	{ label: "Price: Low-High", value: "acs" },
]
export const shoeFor = [
	{
		value: 'Male',
		label: 'Men',
	},
	{
		value: 'Female',
		label: 'Women',
	},
	{
		value: 'Children',
		label: 'Kids',
	},
]
export const shopByPrice = [
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

export const OrderStatus = [
	{
		text: "Pending",
		label: "Pending",
		value: "pending",
	},
	{
		text: "In Progress",
		label: "In Progress",
		value: "inProgress",
	},
	{
		text: "Delivered",
		label: "Delivered",
		value: "delivered",
	},
	{
		text: "Cancelled",
		label: "Cancelled",
		value: "cancelled",
	},
]