import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5239", // Fallback to localhost
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;