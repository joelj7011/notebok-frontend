import axios from 'axios';

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
