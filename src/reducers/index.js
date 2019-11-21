import {combineReducers} from 'redux'

const changeName = (name='ALEX', action) => {
    if(action.type === 'CHANGE_NAME'){
        return action.payload
    }
    return name
}

const isLoggedIn = (loggedIn=true, action)=>{
    if(action.type === 'LOGIN'){
        return action.payload
    }
    return loggedIn
}

const uid = (uid='123', action) => {
    if(action.type === 'SET_UID'){
        return action.payload
    }
    return uid
}
const currentUser = (currentUser='user', action)=> {
    if(action.type === 'SET_USER'){
        return action.payload
    }
    return currentUser
}
const userHasPet = (hasPet=false, action) => {
    if(action.type === 'SET_HAS_PET'){
        return action.payload
    }
    return hasPet
}
export default combineReducers({
    changeName,
    isLoggedIn,
    uid,
    userHasPet,
    currentUser
})