import React from 'react';
import {Pagination} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {putPageAction} from "../redux/actions/postActions";

const Paginator = () => {
    const {totalPages, page, keyword} = useSelector(state => state.post.postsInfo);
    const pageItems = [];
    const dispatch = useDispatch();

    const handlePageChange = (newPage) => {
        dispatch(putPageAction(newPage));
    };

    for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
            <Pagination.Item
                key={i}
                active={i === page}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </Pagination.Item>
        )
    }

    return (
        <div className="d-flex justify-content-center">
            {!keyword ? (<Pagination>
                <Pagination.First
                    disabled={page === 1}
                    onClick={() => handlePageChange(1)}
                />
                <Pagination.Prev
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                />
                {pageItems}
                <Pagination.Next
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                />
                <Pagination.Last
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                />
            </Pagination>): <p></p>}
        </div>
    );
};

export default Paginator;