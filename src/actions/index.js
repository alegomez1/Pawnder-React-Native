export const changeName = (name) => {
    return{
        type: "CHANGE_NAME",
        payload: name
    }
}
export const login = (login) => {
    return{
        type: "LOGIN",
        payload: login
    }
}

export const setUID = (uid) => {
    return{
        type: 'SET_UID',
        payload: uid
    }
}