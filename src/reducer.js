import update from 'immutability-helper';

const defaultState = {
    currentUser: null,
    userComplaints: [],
    unreactedUserComplaints: []
}

function reducer(prevState = defaultState, action) {
    switch(action.type) {
        case "LOG_IN":
            return {...prevState, currentUser: action.payload}
        case "AUTO_LOG_IN":
            return {...prevState, currentUser: action.payload}
        case "ADD_COMPLAINT_TYPE":
            return update(prevState, {currentUser: {"complaint_types": {$push: [action.payload]}} })
        case "ADD_COMPLAINT":
            return update(prevState, {unreactedUserComplaints: {$push: [action.payload]}})
        case "ADD_USER_COMPLAINTS":
            return {...prevState, userComplaints: action.payload.one, unreactedUserComplaints: action.payload.two}
        case "ADD_RESPONSE":
            return update(prevState, { unreactedUserComplaints: { $splice: [[action.payload, 1]] } });
        case "REMOVE_UNREACTED_COMPLAINT":
            return update(prevState, { unreactedUserComplaints: { $splice: [[action.payload, 1]] } });
        case "LOG_USER_OUT":
            return defaultState;
        case "UPDATED_EDITED_COMPLAINT":
            return update(prevState, { unreactedUserComplaints: { [action.index]: {$set: action.payload} } })
        default:
            return prevState
    }
}

export default reducer