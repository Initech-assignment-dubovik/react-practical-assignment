export const LOGIN_USER = 'LOGIN_USER';

export const loginUser = username => (
    {
        type: LOGIN_USER,
        payload: username
    }
)
