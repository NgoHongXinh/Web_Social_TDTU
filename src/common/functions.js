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

export const deleteCookieAccessToken = () => {
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


export const TimeFromCreateToNow = (created_time) =>{
    var timestamp = created_time
    const current = new Date().getTime();
    var created_time = new Date(timestamp).getTime();
    const timeDBetween2datetime = current - created_time;
    // Extract hours, minutes, and seconds from the Date object
    
    const oneDayMs = 24 * 60 * 60 * 1000; // Số milliseconds trong một ngày
    const numberOfDays = Math.floor(timeDBetween2datetime / oneDayMs);
    
    const seconds = Math.floor(timeDBetween2datetime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if(numberOfDays >=1 && numberOfDays <=3){
        return `${numberOfDays} ngày trước`
    }
    else if (hours >= 1 && hours <= 24){
        return ` ${hours} giờ trước`
    }
    else if((minutes % 60) >=1 && (minutes % 60)<=60){
        return `${minutes % 60} phút trước`
    }
}


// console.log(`Khoảng thời gian giữa hai thời điểm là ${hours} giờ ${minutes % 60} phút ${seconds % 60} giây.`);
// console.log(numberOfDays, seconds, minutes, hours)