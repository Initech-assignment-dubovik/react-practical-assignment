export const PUT_POSTS = 'PUT_POSTS';
export const PUT_PAGE = 'PUT_PAGE';
export const PUT_TOTAL = 'PUT_TOTAL';
export const PUT_KEYWORD = 'PUT_KEYWORD';
export const RERENDER = 'RERENDER';


export const putPostsAction = postsInfo => (
    {
        type: PUT_POSTS,
        payload: postsInfo
    }
);

export const putPageAction = page => (
    {
        type: PUT_PAGE,
        payload: page
    }
)

export const putTotalAction = total => (
    {
        type: PUT_TOTAL,
        payload: total
    }
)

export const putKeywordAction = keyword => (
    {
        type: PUT_KEYWORD,
        payload: keyword
    }
)

export const rerenderAction = () => (
    {
        type: RERENDER
    }
)