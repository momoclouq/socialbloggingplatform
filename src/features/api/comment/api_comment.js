const axios = require('axios');
const host = "https://blooming-tor-01512.herokuapp.com/";

export const api_fetchAllCommentsWithIdsList = async ({postid}) => {
    let comments = await axios.get(host + "post/" + postid + "/comment");

    return comments;
}

export const api_createCommentWithData = async ({postid, author, content}) => {
    let data = {
        author, content
    };

    console.log(data);

    let comment = await axios.post(host + "post/" + postid + "/comment", data);

    return comment;
}