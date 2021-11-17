const axios = require("axios");

const host = "http://localhost:8000/";

const instance = (token) => axios.create({
    baseURL: host,
    timeout: 3000,
    headers: {'Authorization': 'Bearer ' + token}
});

export const api_changeInfoUser = async ({token, data}) => {
    let newUser = await instance(token).put("blogger", data);

    return newUser;
}

export const api_deleteUser = async ({token, data}) => {
    console.log(data);
    let message = await instance(token).delete("blogger", {data: data});

    return message;
}