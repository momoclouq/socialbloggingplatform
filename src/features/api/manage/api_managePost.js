const axios = require("axios");

const host = "http://localhost:8000/";

const instance = (token) => axios.create({
    baseURL: host,
    timeout: 3000,
    headers: {'Authorization': 'Bearer ' + token}
});

export const api_fetchPersonalPostListWithPage = async({currentPage, token}) =>{
    let posts = await instance(token).get("post/personal?p=" + currentPage);

    return posts;
}

export const api_deletePost = async({token, id}) => {
    let oldPost = await instance(token).delete(`post/${id}`);

    return oldPost;
}

export const api_createPost = async ({token, data}) => {
    let post = await instance(token).post("post", data);

    return post;
}

export const api_updatePost = async({token, id, data}) => {
    let post = await instance(token).put(`post/${id}`, data);

    return post;
}