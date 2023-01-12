export function getCross_device (state = [], action) {
    switch(action.type) {
        case "get_all_cross_device_success":
            return action.cross_device_info;
        default:
            return state;
    }
}

export function selectCross_device (state = [], action) {
    switch(action.type) {
        case "selectCross_deviceValue":
            return action.selectCross_deviceValue;
        default:
            return state;
    }
}