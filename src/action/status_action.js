export function status_action(state = [], action){
    switch(action.type){
        case "get_status":
            return action.status_info;
        default:
            return state;
    }
}

export function selectStatus (state = [], action) {
    switch(action.type) {
        case "selectStatusValue":
            return action.selectStatus;
        default:
            return state;
    }
}