import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {loginUser} from '../redux/actions/userActions'

const Login = () => {
    const [username, setUsername] = useState('')
    const dispatch = useDispatch()

    const handleLogin = () => {
        if (username.trim() !== '') {
            console.log('Get username - ' + username);
            dispatch(loginUser(username));
        }
    };

    return (
        <div className="wrapper">
            <div className="d-flex justify-content-center">
                <div className="input-group">
                    <span className="input-group-text">@</span>
                    <div className="form-floating">
                        <input onChange={e => setUsername(e.target.value)} type='text'
                               className="form-control" id="floatingInputGroup1" placeholder="Username"></input>
                        <label htmlFor="floatingInputGroup1">Username</label>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
