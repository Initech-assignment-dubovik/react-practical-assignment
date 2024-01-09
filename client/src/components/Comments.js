import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {useSelector} from "react-redux";
import ModalComment from "./ModalComment";
import Comment from "./Comment";

const Comments = ({post, setPost}) => {
    const {username} = useSelector(state => state.user);
    const [show, setShow] = useState(false);

    return (
        <>
            <div
                role="button"
                className="p-2 text-decoration-underline"
                onClick={() => setShow(true)}
            >Comments ({post.comments.length})
            </div>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {post.title} - {post.username}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="w-100 overflow-hidden">
                        <img className="w-100 object-fit-cover" style={{maxHeight: '300px'}} src={post.imageSrc}
                             alt="Image"/>
                    </div>
                    <h5 className="pt-3">Comments:</h5>
                    <div className="overflow-auto" style={{maxHeight: '300px'}}>
                        {post.comments.map((comment) => (
                            <Comment key={comment.id} comment={comment} post={post} setPost={setPost}/>
                        ))}
                    </div>
                    <ModalComment post={post} setPost={setPost}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Comments;