import React, {useState} from 'react';
import {Stack} from "react-bootstrap";
import {useSelector} from "react-redux";
import {deleteComment, updateComment} from "../utils/api";
import ModalComment from "./ModalComment";
import RemoveLike from "./likes/RemoveLike";
import SetLike from "./likes/SetLike";
import RemoveDislike from "./likes/RemoveDislike";
import SetDislike from "./likes/SetDislike";

const Comment = ({comment, post, setPost}) => {
    const {username} = useSelector(state => state.user);
    const [currentComment, setCurrentComment] = useState(comment);


    function updateCurrentComment() {
        updateComment(currentComment)
            .then(data => {
                if (data.success) {
                    setCurrentComment(data.result);
                }
            });
    }

    function handleRemoveLike() {
        currentComment.likes = currentComment.likes.filter(e => e !== username);
        updateCurrentComment();
    }

    function handleSetLike() {
        currentComment.dislikes = currentComment.dislikes.filter(e => e !== username);
        currentComment.likes = [...currentComment.likes, username];
        updateCurrentComment();
    }

    function handleRemoveDislike() {
        currentComment.dislikes = currentComment.dislikes.filter(e => e !== username);
        updateCurrentComment();
    }

    function handleSetDislike() {
        currentComment.likes = currentComment.likes.filter(e => e !== username);
        currentComment.dislikes = [...currentComment.dislikes, username];
        updateCurrentComment();
    }

    function handleDeleteComment() {
        deleteComment(currentComment.id)
            .then(() => {
                let updatedComments = [...post.comments];
                updatedComments = updatedComments.filter(e => e.id !== currentComment.id);
                const newPost = {...post, comments: updatedComments};
                setPost(newPost);
            })
    }

    return (
        <div>
            <div key={currentComment.id}>
                <div>Author: {currentComment.username}</div>
                <div className="fst-italic">{currentComment.text}</div>
                <Stack direction="horizontal" gap={2}>
                    {username === currentComment.username && (<>
                        <div
                            role="button"
                            className="p-2 ms-auto text-decoration-underline"
                        ><ModalComment
                            key={currentComment.id}
                            post={post} setPost={setPost} edit={true}
                            comment={currentComment} setComment={setCurrentComment}/>
                        </div>
                        <div
                            role="button"
                            className="p-2 text-decoration-underline"
                            onClick={handleDeleteComment}
                        >delete
                        </div>
                    </>)}
                </Stack>
                <div className="hstack">
                    <div>
                        <small className="text-body-secondary">{new Date(+currentComment.date).toLocaleString()}</small>
                    </div>
                    {currentComment.likes.includes(username) ?
                        <RemoveLike removeLike={handleRemoveLike}/> :
                        <SetLike setLike={handleSetLike}/>
                    }
                    <div>{currentComment.likes.length - currentComment.dislikes.length}</div>
                    {currentComment.dislikes.includes(username) ?
                        <RemoveDislike removeDislike={handleRemoveDislike}/> :
                        <SetDislike setDislike={handleSetDislike}/>
                    }
                </div>
                <hr/>
            </div>
        </div>
    );
};

export default Comment;