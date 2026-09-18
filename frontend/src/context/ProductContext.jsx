import { createContext, useContext } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"
import { ServerURL } from "."

const ProductContext = createContext()
const API_URL = `${ServerURL()}/products`
const config = {
	withCredentials: true,
}

const productCache = new Map()
const CACHE_TTL = 1000 * 60 * 3
const STALE_TTL = 1000 * 60 * 10

const invalidateProductCache = () => {
	productCache.clear()
}

const createProductCacheKey = (prefix, params) => {
	return `${prefix}:${JSON.stringify(params ?? {})}`
}

const cachedRequest = async (key, fetcher, ttl = CACHE_TTL, staleAfter = STALE_TTL) => {
	const now = Date.now()
	const cachedEntry = productCache.get(key)

	if (cachedEntry?.data && cachedEntry.expiresAt > now) {
		return cachedEntry.data
	}

	if (cachedEntry?.data && cachedEntry.staleUntil > now) {
		if (!cachedEntry.inFlight) {
			const refreshPromise = fetcher()
				.then((data) => {
					productCache.set(key, {
						data,
						expiresAt: Date.now() + ttl,
						staleUntil: Date.now() + staleAfter,
						inFlight: null,
					})
					return data
				})
				.catch((error) => {
					cachedEntry.inFlight = null
					throw error
				})

			cachedEntry.inFlight = refreshPromise
		}
		return cachedEntry.data
	}

	if (cachedEntry?.inFlight) {
		return cachedEntry.inFlight
	}

	const requestPromise = fetcher()
		.then((data) => {
			productCache.set(key, {
				data,
				expiresAt: Date.now() + ttl,
				staleUntil: Date.now() + staleAfter,
				inFlight: null,
			})
			return data
		})
		.catch((error) => {
			productCache.delete(key)
			throw error
		})

	productCache.set(key, {
		data: cachedEntry?.data ?? null,
		expiresAt: now,
		staleUntil: now + staleAfter,
		inFlight: requestPromise,
	})

	return requestPromise
}

const ProductContextProvider = (props) => {
	const { isAuthenticated, user } = useAuth()

	const AddProduct = async (productData) => {
		const res = await axios.post(API_URL, productData, config)
		invalidateProductCache()
		return res
	}

	const GetProducts = async () => {
		const res = await axios.get(API_URL, config)
		return res.data
	}
	// Get single product details
	const GetDetails = async (id) => {
		const cacheKey = createProductCacheKey("product-detail", { id })
		return cachedRequest(cacheKey, async () => {
			const res = await axios.get(`${API_URL}/${id}`, config)
			return res.data
		})
	}

	const UpdateProduct = async (id, productData) => {
		const res = await axios.put(`${API_URL}/${id}`, productData, config)
		invalidateProductCache()
		return res.data
	}

	const uploadImage = async (image) => {
		const res = await axios.post(`${API_URL}/uploadImage`, image, config)
		return res.data
	}

	const DeleteProduct = async (id) => {
		const res = await axios.delete(`${API_URL}/${id}`, config)
		invalidateProductCache()
		return res.data
	}

	const RecentAndTopRated = async (query) => {
		const cacheKey = createProductCacheKey("recent-top-rated", query)
		return cachedRequest(cacheKey, async () => {
			const res = await axios.post(`${API_URL}/recentAndTopRated`, query)
			return res.data
		})
	}

	// get products for scroll
	const GetCustomizedProducts = async (field, value, page, filter, limit) => {
		const params = {
			field,
			value,
			page,
			limit,
			prices: filter?.[0] ?? [],
			types: filter?.[1] ?? [],
			brands: filter?.[2] ?? [],
			sizes: filter?.[3] ?? [],
			order: filter?.[4]?.[0] ?? null,
		}
		const cacheKey = createProductCacheKey("product-list", params)

		return cachedRequest(cacheKey, async () => {
			const res = await axios.post(`${API_URL}/filter`, { params })
			return res.data
		})
	}
	const SearchProduct = async (e, page) => {
		const params = {
			name: e?.name ?? "",
			field: "shoefor",
			value: e?.shoefor ?? "",
			prices: e?.prices ?? [],
			types: e?.types ?? [],
			brands: e?.brands ?? [],
			sizes: e?.sizes ?? [],
			order: e?.sort ?? null,
			page,
		}
		const cacheKey = createProductCacheKey("search-product", params)

		return cachedRequest(cacheKey, async () => {
			const res = await axios.post(`${API_URL}/filter`, { params })
			return res.data
		})
	}

	const userContext = {
		GetDetails,
		RecentAndTopRated,
		GetCustomizedProducts,
		SearchProduct,
	}
	const contextValues = isAuthenticated && user.type === "user" ? userContext : {
		...userContext,
		GetProducts,
		AddProduct,
		DeleteProduct,
		uploadImage,
		UpdateProduct,
	}
	return (
		<>
			<ProductContext.Provider value={contextValues}>
				{props.children}
			</ProductContext.Provider>
		</>
	)
}

export default ProductContextProvider

export const useProduct = () => {
	return useContext(ProductContext)
}
