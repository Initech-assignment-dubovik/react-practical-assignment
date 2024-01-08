import {BASE_URL, COMMENT, PAGE, PICTURE, POST, SEARCH} from "../utils/constants";

export const createPost = (post) => {
    return fetch(BASE_URL + POST, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
        .then(response => response.json())
}

export const updatePost = (post) => {
    return fetch(BASE_URL + POST + `${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
        .then(resp => resp.json())
}

export const searchPosts = (keyword) => {
    return fetch(`${BASE_URL}${POST}${SEARCH}${keyword}`)
        .then(response => response.json())
}

export const getPostsByPage = (page) => {
    return fetch(`${BASE_URL}${POST}${PAGE}${page}`)
        .then(response => response.json())
}

export const deletePost = (id) => {
    return fetch(`${BASE_URL}${POST}${id}`, {
        method: "DELETE"
    })
        .then(response => response.json())
}

export const uploadPicture = (id, picture) => {
    const formData = new FormData();
    formData.append("picture", picture);
    return fetch(BASE_URL+POST+id+PICTURE, {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
}

export const createComment = (text, postId, username) => {
    const newComment = {text, postId, username}
    return fetch(`${BASE_URL}${COMMENT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment)
    })
        .then(response => response.json())
}

export const updateComment = (comment) => {
    return fetch(`${BASE_URL}${COMMENT}${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
}

export const deleteComment = (id) => {
    return fetch(`${BASE_URL}${COMMENT}${id}`, {
        method: "DELETE"
    })
        .then(response => response.json())
}

export const getPosts = () => {
    return fetch(`${BASE_URL}${POST}`)
        .then(response => response.json())
}

export const getPost = (id) => {
    return fetch(`${BASE_URL}${POST}${id}`)
        .then(response => response.json())
}

export const getComment = (id) => {
    return fetch(`${BASE_URL}${COMMENT}${id}`)
        .then(response => response.json())
}

export const getComments = () => {
    return fetch(`${BASE_URL}${COMMENT}`)
        .then(response => response.json())
}