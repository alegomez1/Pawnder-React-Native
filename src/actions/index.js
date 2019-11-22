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
export const setCurrentUser = (currentUser) => {
    return{
        type: 'SET_USER',
        payload: currentUser
    }
}
export const setHasPet = (hasPet) => {
    return{
        type: 'SET_HAS_PET',
        payload: hasPet
    }
}