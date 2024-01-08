import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createComment, getAllPosts} from "../redux/api";
import {rerenderAction} from "../redux/actions/postActions";

const ModalComment = ({postId}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const username = useSelector(state => state.user.username);
    const dispatch = useDispatch();

    const [text, setText] = useState('');

    function handleSave() {
        createComment(text, postId, username)
            .then(() => getAllPosts())
            .then(() => dispatch(rerenderAction()))
            .then(() => handleClose());
    }

    return (
        <div>
            <div
                role="button"
                className="bg-body-secondary p-2 m-2 text-decoration-underline text-center"
                onClick={handleShow}>Add comment
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="addComment.titleInput">
                            <Form.Control as="textarea" rows={3} autoFocus onChange={(e) => setText(e.target.value)}/>
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
