export function getRoom (state = [], action) {
    switch(action.type) {
        case "get_all_room_success":
            return action.room_info;
        default:
            return state;
    }
}

export function selectRoomValue (state = [], action) {
    switch(action.type) {
        case "selectRoomValue":
            return action.selectRoomValue;
        default:
            return state;
    }
}