import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {updatePost} from "../redux/api";

const ModalEditPost = ({post, setPost}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState(post.title);
    const [picture, setPicture] = useState();

    const handleSave = () => {
        const newPost = {
            title: title
        };
        if (picture) {
            console.log("Upload picture")
        } else {
            console.log("Don't upload picture")
        }
        console.log(newPost)
        updatePost(post.id, newPost)
            .then(data => data.result)
            .then((data) => setPost({...post, ...data}))
            .then(() => handleClose());
    }

    const displayImage = (newPicture) => {
        if (newPicture) {
            const reader = new FileReader();
            console.log("In displayImage");
            reader.onload = function (e) {
                const selectedImage = document.getElementById('selectedImage');
                selectedImage.src = e.target.result;
                console.log("Above set block");
                selectedImage.style.display = 'block';
            };

            reader.readAsDataURL(newPicture);
        }
    }

    return (
        <div>
            <div role="button" className="text-decoration-underline" onClick={handleShow}>
                edit
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="addPost.titleInput">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                autoFocus
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <img
                            id="selectedImage"
                            src="#"
                            alt="Selected Image"
                            style={{display: 'none', maxHeight: '300px', margin: '0 auto'}}
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
                    <Button variant="primary" onClick={handleSave}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEditPost;
