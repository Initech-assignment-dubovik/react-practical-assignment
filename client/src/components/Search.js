import React, {useState} from 'react';
import ModalPost from "./ModalPost";
import {useDispatch, useSelector} from "react-redux";
import {putKeywordAction} from "../redux/actions/postActions";

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(putKeywordAction(searchText));
        }
    };

    const handleChange = (e) => {
        setSearchText(e.target.value);
        if (!e.target.value) {
            dispatch(putKeywordAction(''));
        }
    }

    return (
        <div>
            <nav className="navbar  bg-body-tertiary">
                <div className="container-fluid">
                    <ModalPost/>
                    <input className="form-control me-2 w-25" type="search" placeholder="Search" aria-label="Search"
                           onChange={handleChange}
                           onKeyDown={handleKeyDown}
                    />
                </div>
            </nav>
        </div>
    );
};

export default Search;