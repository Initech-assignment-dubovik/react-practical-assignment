import React, {useState} from 'react';
import '../css/Post.css';
import {useDispatch, useSelector} from "react-redux";
import {deletePost, updatePost} from "../redux/api";
import {putPageAction, rerenderAction} from "../redux/actions/postActions";
import {Stack} from "react-bootstrap";
import Comments from "./Comments";
import ModalEditPost from "./ModalEditPost";
import RemoveLike from "./likes/RemoveLike";
import SetLike from "./likes/SetLike";
import RemoveDislike from "./likes/RemoveDislike";
import SetDislike from "./likes/SetDislike";

const Post = ({content, countPosts, currentPage}) => {
    const {username} = useSelector(state => state.user);
    const [post, setPost] = useState(content);
    const dispatch = useDispatch();

    function updateCurrentPost() {
        updatePost(post.id, post)
            .then(data => {
                if (data.success) {
                    const newPost = {...post, ...data.result}
                    setPost(newPost)
                }
            });
    }

    function handleSetLike(event) {
        post.dislikes = post.dislikes.filter(e => e !== username);
        post.likes = [...post.likes, username];
        updateCurrentPost();
    }

    function handleSetDislike(event) {
        post.likes = post.likes.filter(e => e !== username);
        post.dislikes = [...post.dislikes, username];
        updateCurrentPost();
    }

    function handleRemoveLike(event) {
        post.likes = post.likes.filter(e => e !== username);
        updateCurrentPost();
    }

    function handleRemoveDislike(event) {
        post.dislikes = post.dislikes.filter(e => e !== username);
        updateCurrentPost();
    }

    function handleDeletePost() {
        console.log("Удаление поста");
        console.log(countPosts);
        console.log(currentPage);

        deletePost(post.id)
            .then(() => {
                if (currentPage > 1 && countPosts - 1 === 0) {
                    currentPage--;
                    dispatch(putPageAction(currentPage));
                } else {
                    dispatch(rerenderAction());
                }
            });
    }

    return (
        <div className="col">
            <div className="card">
                <div className="imageContainerStyle">
                    <img src={post.imageSrc}
                         className="imageStyle" alt={post.title}/>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{post.title} - {post.username}</h5>
                    <Stack direction="horizontal" gap={2}>
                        <Comments key={post.id} post={post} setPost={setPost} />
                        {username === post.username && (<>
                            <div className="p-2 ms-auto"><ModalEditPost post={post} setPost={setPost}/></div>
                            <div role="button" className="p-2 text-decoration-underline"
                                 onClick={handleDeletePost}>delete
                            </div>
                        </>)}
                    </Stack>
                </div>
                <div className="card-footer">
                    <div className="hstack">
                        <div>
                            <small
                                className="text-body-secondary">{new Date(+post.date).toString().slice(0, 24)}</small>
                        </div>
                        {post.likes.includes(username) ?
                            <RemoveLike removeLike={handleRemoveLike}/> :
                            <SetLike setLike={handleSetLike}/>
                        }
                        <div>{post.likes.length - post.dislikes.length}</div>
                        {post.dislikes.includes(username) ?
                            <RemoveDislike removeDislike={handleRemoveDislike}/> :
                            <SetDislike setDislike={handleSetDislike}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
