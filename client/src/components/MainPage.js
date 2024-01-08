import React from 'react';
import Header from "./Header";
import Search from "./Search";
import Content from "./Content";
import '../css/MainPage.css';

const MainPage = () => {
    return (
        <div className="container">
            <Header/>
            <Search/>
            <Content/>
        </div>
    );
};

export default MainPage;