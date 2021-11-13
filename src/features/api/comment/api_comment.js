const axios = require('axios');
const host = "http://localhost:8000/";

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