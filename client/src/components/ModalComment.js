import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createComment, updateComment} from "../redux/api";

const ModalComment = ({post, setPost, action, comment, setComment}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = ({}) => setShow(true);

    const username = useSelector(state => state.user.username);
    const dispatch = useDispatch();

    const [text, setText] = useState(action ? comment.text : '');

    function handleSave() {
        if (action) {
            const updatedComment = {...comment, text};
            console.log("Update Comment");
            console.log("post" + post);
            updateComment(updatedComment)
                .then(data => data.result)
                .then(newComment => {
                    setComment(newComment);
                })
                .then(() => handleClose());
        } else {
            console.log("Create Comment")
            createComment(text, post.id, username)
                .then(newComment => {
                    const updatedComments = [...post.comments, newComment.result];
                    const newPost = { ...post, comments: updatedComments };
                    setPost(newPost);
                })
                .then(() => handleClose());
        }
    }

    return (
        <div>
            <div
                role="button"
                // className="bg-body-secondary p-2 m-2 text-decoration-underline text-center"
                onClick={handleShow}>{action ? "edit" : "Add comment"}
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{action ? "Edit comment" : "Add new comment"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="addComment.titleInput">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                autoFocus
                                value={text}
                                onChange={(e) => setText(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalComment;
