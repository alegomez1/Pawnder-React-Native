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

export default combineReducers({
    changeName,
    isLoggedIn,
    uid
})