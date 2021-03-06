const axios = require('axios');
const host = "https://blooming-tor-01512.herokuapp.com/";

export const api_fetchPublishedPostListWithPage = async ({currentPage, mode}) => {
    let posts = await axios.get(host + "post/published?p=" + currentPage + "&m=" + mode);

    return posts;
}

export const api_fetchPublishedPostDetailWithId = async ({id}) => {
    let post = await axios.get(host + "post/published/" + id);

    return post;
}