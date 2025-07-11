import axios from 'axios';
import { jwtDecode } from 'jwt-decode'

// Set up axios interceptor to automatically include token in requests
export const setupAxiosInterceptors = () => {
    // Request interceptor to add token to headers
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor to handle token expiration
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('token');
                // Redirect to login page
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
};

//decode user info from jwt
export const getUserInfo = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        let decoded = jwtDecode(token);
        return decoded; // decoded is an object as decoded.id and decoded.username 
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}
// Check if user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

// Get token from localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Set token in localStorage and axios headers
export const setToken = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Remove token and clear axios headers
export const removeToken = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
};
