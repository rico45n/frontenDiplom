export function getAllDevice (state = [], action) {
    switch(action.type) {
        case "get_all_device_success":
            return action.device_info;
        default:
            return state;
    }
}
export function selectDeviceValue (state = [], action) {
    switch(action.type) {
        case "selectDeviceValue":
            return action.selectDeviceValue;
        default:
            return state;
    }
}

export function selectDeviceLastValue (state = [], action) {
    switch(action.type) {
        case "selectDeviceLastValue":
            return action.selectDeviceLastValue;
        default:
            return state;
    }
}

export function getInfoCrossDevicesEnd (state = [], action) {
    switch(action.type) {
        case "infoCrossDevicesEnd":
            return action.infoCrossDevicesEnd;
        default:
            return state;
    }
}

export function getInfoCrossDevices (state = [], action) {
    switch(action.type) {
        case "infoCrossDevices":
            return action.infoCrossDevices;
        default:
            return state;
    }
}

export function getInfoConnectDevices (state = [], action) {
    switch(action.type) {
        case "infoConnectDevices":
            return action.infoConnectDevices;
        default:
            return state;
    }
}