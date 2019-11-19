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

export default combineReducers({
    changeName,
    isLoggedIn
})