export const API_BASE_URL = 'https://weavefash.onrender.com'       // bcoz the backend is running on this port 

export const API_ROUTES = {
    AUTH: `${API_BASE_URL}/api/auth`,        // why? bcoz when we go to, server/server.ts -> we will see the endpoint we're using is [app.use("/api/auth", authRoutes)]
    PRODUCTS: `${API_BASE_URL}/api/products`,
    COUPONS: `${API_BASE_URL}/api/coupons`,
    SETTINGS: `${API_BASE_URL}/api/settings`,
    CART: `${API_BASE_URL}/api/cart`,
    ADDRESS: `${API_BASE_URL}/api/address`,
    ORDER: `${API_BASE_URL}/api/order`,
}    
