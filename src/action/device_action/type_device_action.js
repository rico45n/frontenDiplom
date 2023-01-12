export function getAllTypeDevice (state = [], action) {
    switch(action.type) {
        case "get_all_type_device_success":
            return action.type_device_info;
        default:
            return state;
    }
}