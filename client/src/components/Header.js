import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../redux/actions/userActions";

const Header = () => {
    const username = useSelector(state => state.user.username);
    const dispatch = useDispatch()

    const handleLogout = () => {
        if (username.trim() !== '') {
            console.log('Get username - ' + username);
            dispatch(loginUser(''));
        }
    };

    return (
        <div>
            <div className="hstack gap-3 p-2">
                <div className="p-2 text-uppercase fs-3">Gallery</div>
                <div className="p-2 ms-auto" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person align-middle" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg> {username}</div>
                <div className="vr"></div>
                <div className="p-2"><a role="button" className="page-link text-decoration-underline cur" onClick={handleLogout}>Log out</a></div>
            </div>
        </div>
    );
};

export default Header;