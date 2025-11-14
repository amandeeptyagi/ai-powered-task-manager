import API from "@/lib/axios.js"

// Delete admin profile
export const deleteAdminProfile = () => API.delete("/admin/delete-profile");
