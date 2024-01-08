import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ADD_POST } from "../utils/constants";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPost, uploadPicture } from "../redux/api";
import { putTotalAction } from "../redux/actions/postActions";

const ModalPost = ({content}) => {
    const [show, setShow] = useState(false);
    const { total } = useSelector(state => state.post.postsInfo);
    const dispatch = useDispatch();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const username = useSelector(state => state.user.username);
    const [title, setTitle] = useState('');
    const [picture, setPicture] = useState(null);

    const handleSave = () => {
        const post = {
            title: title,
            username: username
        };

        createPost(post)
            .then(data => data.result)
            .then(post => uploadPicture(post.id, picture))
            .then(() => dispatch(putTotalAction(total + 1)));

        handleClose();
    }

    const displayImage = (newPicture) => {
        if (newPicture) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const selectedImage = document.getElementById('selectedImage');
                selectedImage.src = e.target.result;
                selectedImage.style.display = 'block';
            };
            reader.readAsDataURL(newPicture);
        }
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                {ADD_POST}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="addPost.titleInput">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                autoFocus
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <img
                            id="selectedImage"
                            src="#"
                            alt="Selected Image"
                            style={{ display: 'none', maxHeight: '300px', margin: '0 auto'}}
                        />
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={e => {
                                    if (e.target.files.length > 0) {
                                        setPicture(e.target.files[0]);
                                        displayImage(e.target.files[0]);
                                    }
                                }}
                            />
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

export default ModalPost;
