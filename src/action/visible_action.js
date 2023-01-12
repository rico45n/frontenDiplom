const initialState = {
    visible: false,
    id: null
}

export function getActionUsers(state = initialState, action) {
    switch(action.type) {
        case "showDialog":
            return action.info;
        default:
            return state;
    }
}
export function getDeleteActionUsers(state = initialState, action) {
    switch(action.type) {
        case "deleteDialog":
            return action.info;
        default:
            return state;
    }
}
export function getUpdateActionUsers(state = initialState, action) {
    switch(action.type) {
        case "updateVisible":
            return action.info;
        default:
            return state;
    }
}