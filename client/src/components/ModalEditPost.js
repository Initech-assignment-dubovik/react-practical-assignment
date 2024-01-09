import {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {updatePost, uploadPicture} from "../utils/api";

const ModalEditPost = ({post, setPost}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState(post.title);
    const [picture, setPicture] = useState();
    const [showImage, setShowImage] = useState('none')


    useEffect(() => {
        if (post.imageSrc) {
            setShowImage('block');
        }
    }, [post.imageSrc]);


    const handleSave = async () => {
        const newPost = {
            title: title
        };
        let updatedPost;
        await updatePost(post.id, newPost)
            .then(data => {
                if (data.success) {
                    updatedPost = {...post, ...data.result};
                }
            })
        if (picture) {
            await uploadPicture(post.id, picture)
                .then(data => {
                    if (data.success) {
                        updatedPost = {...updatePost, ...data.result};
                    }
                })
            setPost(updatedPost);
            handleClose();
        }
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
            <div
                role="button"
                className="text-decoration-underline"
                onClick={handleShow}>edit
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
                            alt="Selected Image"
                            src={post.imageSrc || '#'}
                            style={{display: showImage, maxHeight: '300px', margin: '0 auto'}}
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
                    <Button variant="primary" onClick={handleSave}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEditPost;
