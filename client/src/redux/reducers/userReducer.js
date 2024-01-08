import {LOGIN_USER} from "../actions/userActions";
const initialState = {
    username: ''
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, username: action.payload};
        default:
            return state;
    }
}