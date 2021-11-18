const axios = require('axios');
const host = "https://blooming-tor-01512.herokuapp.com/";

export const handleError = async (api, props, rejectWithValue) => {
    try{
        let data = await api(props);

        return data;
    } catch (error){
        return rejectWithValue(error.response.data);
    }
}

export const api_fetchBloggerListWithPageAndMode = async ({currentPage, mode}) => {
    let bloggers = await axios.get(host + "blogger/?p=" + currentPage + "&m=" + mode);

    return bloggers;
}

export const api_fetchBloggerWithDetail = async ({id}) => {
    let blogger = await axios.get(host + "blogger/" + id);

    return blogger.data;
}

export const api_heartBloggerWithId = async ({id}) => {
    let blogger = await axios.get(host + "blogger/" + id + "/heart");

    return blogger;
}