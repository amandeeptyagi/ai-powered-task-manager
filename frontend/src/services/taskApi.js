import API from "@/lib/axios.js"

// Create task
export const createTask = (data) => API.post("/task/create", data);

// Get all tasks
export const getTasks = () => API.get("/task");

// Get single task by ID
export const getTaskById = (taskId) => API.get(`/task/${taskId}`);

// Update task by ID
export const updateTask = (taskId, data) => API.put(`/task/${taskId}`, data);

// Delete task by ID
export const deleteTask = (taskId) => API.delete(`/task/${taskId}`);