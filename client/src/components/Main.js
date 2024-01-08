import React from 'react';
import Login from "./Login";
import {useSelector} from "react-redux";
import MainPage from "./MainPage";

const Main = () => {
    const {username} = useSelector(state => state.user);

    return (
        <div>
            {username === '' ? <Login/> : <MainPage/>}
        </div>
    )
};

export default Main;