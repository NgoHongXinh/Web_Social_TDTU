import axios from "axios";
import { BASE_URL } from "./constant";
import { Cookies } from 'react-cookie';

export default axios.create({
    baseURL: BASE_URL
});

// return the user data from the session storage

const cookies = new Cookies();

export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return userStr;
    else return null;
}

// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', user);
}

export const setCookieUser = (userInfo) => {
    return cookies.set('user_info', userInfo);
}

export const getCookieUser = () => {
    return cookies.get('user_info') || null;
}

export const setCookieToken = (token, expires) => {
    return cookies.set('access_token', token, { path: '/', expires: expires });
}

export const getCookieToken = () => {
    return cookies.get('access_token') || null;
}

export const removeCookieToken = () => {
    return cookies.remove('access_token');
}

//--- localStorage
export const setLocalUsername = (u) => {
    return localStorage.setItem('Username', JSON.stringify(u));
}

export const getLocalUsername = () => {
    return JSON.parse(localStorage.getItem('Username')) || null;
}

export const removeLocalUsername = () => {
    return localStorage.removeItem('Username');
}