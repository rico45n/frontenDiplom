export function user_auth(state = [], action){
    switch(action.type){
        case "get_user_auth_success":
            return action.user_auth_info;

        default:
            return state;
    }
}

export function user_allusers(state = [], action) {
    switch(action.type) {
        case "get_all_user_success":
            return action.user_info;
        default:
            return state;
    }
}

export function selectUserValue (state = [], action) {
    switch(action.type) {
        case "selectUserValue":
            return action.selectUserValue;
        default:
            return state;
    }
}

export function selectOldUserValue (state = [], action) {
    switch(action.type) {
        case "selectOldUserValue":
            return action.selectOldUserValue;
        default:
            return state;
    }
}