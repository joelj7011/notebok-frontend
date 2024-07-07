import axios from 'axios';

// Update this URL to your deployed backend URL
const BASE_URL = 'https://notebook-backend-cejg.onrender.com';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export { axiosInstance, axiosPrivate };

