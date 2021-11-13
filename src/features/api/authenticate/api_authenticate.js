const axios = require('axios');
const host = "http://localhost:8000/";

export const api_signupWithData = async (data) => {
    let message = await axios.post(host + "signup", data);

    return message;
}

export const api_loginWithData = async (data) => {
    let token = await axios.post(host + "login", data);

    return token;
}