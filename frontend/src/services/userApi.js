import API from "@/lib/axios.js"

// Register user
export const registerUser = (data) => API.post("/user/register", data);

// Delete user profile
export const deleteUserProfile = () => API.delete("/user/delete-profile");
