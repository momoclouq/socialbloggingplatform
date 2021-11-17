const axios = require('axios');
const host = "http://localhost:8000/";

const instance = (token) => axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 3000,
    headers: {'Authorization': 'Bearer '+ token}
  });

export const api_signupWithData = async (data) => {
    let message = await axios.post(host + "signup", data);

    return message;
}

export const api_loginWithData = async (data) => {
    let token = await axios.post(host + "login", data);

    return token;
}

export const api_logout = async ({token}) => {
    let output = await instance(token).post("logout");

    return output;
}

export const api_getCurrentUser = async ({token}) => {
    let user = await instance(token).get("blogger/current");

    return user;
}