import API from "@/lib/axios.js"

// Login user
export const login = (data) => API.post("/login", data);

// Get user profile/details
export const getUser = () => API.get("/user");

// Logout user
export const logoutUser = () => API.post("/logout");