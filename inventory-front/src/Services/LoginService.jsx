import axios from 'axios';

const BASE       = process.env.REACT_APP_API_BASE_URL;
const LOGIN_URL  = `${BASE}/login`;
const ROLE_URL   = `${BASE}/role`;
const LOGOUT_URL = `${BASE}/logout`;
const USR_URL    = `${BASE}/user`;

export const registerNewUser = (user) => {
    return axios.post(LOGIN_URL, user, {
        withCredentials: true
    });
};

export const validateUser = (userId, password) => {
    return axios.get(`${LOGIN_URL}/${userId}/${password}`, {
        withCredentials: true
    });
};

export const getUserDetails = () => {
    return axios.get(LOGIN_URL, {
        withCredentials: true
    });
};

export const getRole = () => {
    return axios.get(ROLE_URL, {
        withCredentials: true
    });
};

export const getUsersByRole = (role) => {
    return axios.get(`${ROLE_URL}/${role}`, {
        withCredentials: true
    });
};



export const getUserId = () => {
    return axios.get(USR_URL, {
        withCredentials: true
    });
};

export const logoutUser = () => {
    return axios.post(LOGOUT_URL, {}, {
        withCredentials: true
    });
};