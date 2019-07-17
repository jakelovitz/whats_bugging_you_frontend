const defaultState = {
    currentUser: {}
}

function reducer(prevState = defaultState, action) {
    switch(action.type) {
        case "LOG_IN":
            return {...prevState, currentUser: action.payload}//current user here}
        default:
            return prevState
    }
}

export default reducer