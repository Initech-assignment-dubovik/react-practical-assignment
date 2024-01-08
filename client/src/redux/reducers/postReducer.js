import {PUT_KEYWORD, PUT_PAGE, PUT_POSTS, PUT_TOTAL, RERENDER} from "../actions/postActions";

const initState = {
    rerender: true,
    postsInfo: {
        posts: [],
        page: 1
    }
};

export const postReducer = (state = initState, action) => {
    switch (action.type) {
        case PUT_POSTS:
            return {...state, postsInfo: {...state.postsInfo, ...action.payload}};
        case PUT_PAGE:
            return {...state, postsInfo: {...state.postsInfo, page: action.payload}};
        case PUT_TOTAL:
            return {...state, postsInfo: {...state.postsInfo, total: action.payload}};
        case PUT_KEYWORD:
            return {...state, postsInfo: {...state.postsInfo, keyword: action.payload}};
        case RERENDER:
            return {...state, rerender: !state.rerender}
        default:
            return state;
    }
}