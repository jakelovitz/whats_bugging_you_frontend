import update from 'immutability-helper';

const defaultState = {
    currentUser: null
}

function reducer(prevState = defaultState, action) {
    switch(action.type) {
        case "LOG_IN":
            return {...prevState, currentUser: action.payload}
        case "AUTO_LOG_IN":
            return {...prevState, currentUser: action.payload}
        case "ADD_COMPLAINT_TYPE":
            return update(prevState, {currentUser: {"complaint_types": {$push: [action.payload]}} })
        default:
            return prevState
    }
}

export default reducer