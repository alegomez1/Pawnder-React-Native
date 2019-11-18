import {combineReducers} from 'redux'

const changeName = (name='no name', action) => {
    if(action.type === 'CHANGE_NAME'){
        return action.payload
    }
    return name
}

export default combineReducers({
    changeName
})