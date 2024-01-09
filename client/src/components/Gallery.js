import React, {useEffect} from 'react';
import Post from "./Post";
import {useDispatch, useSelector} from "react-redux";
import {putPostsAction} from "../redux/actions/postActions";
import {getPostsByPage, searchPosts} from "../utils/api";

const Gallery = () => {
    const {posts, page, total, keyword} = useSelector(state => state.post.postsInfo);
    const rerender = useSelector(state => state.post.rerender);
    const dispatch = useDispatch();

    useEffect(async () => {
        if (keyword) {
            searchPosts(keyword)
                .then(data => ({
                    posts: data.result,
                }))
                .then(data => dispatch(putPostsAction(data)))
        } else {
            getPostsByPage(page)
                .then(data => ({
                    posts: data.result,
                    totalPages: data.totalPages,
                    total: data.total,
                    page: data.page
                }))
                .then(data => {
                    dispatch(putPostsAction(data))
                })
        }

    }, [page, total, keyword, rerender]);

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4 mb-4 mt-0">
            {posts && posts.length > 0 ? (
                posts.map((e) => <Post key={e.id} content={e} countPosts={posts.length} currentPage={page}/>)
            ) : (
                <div>No posts found</div>
            )}
        </div>
    );
};

export default Gallery;