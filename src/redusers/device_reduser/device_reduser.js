import {combineReducers} from "redux";
import {
    getAllDevice,
    selectDeviceLastValue,
    selectDeviceValue,
    getInfoCrossDevicesEnd,
    getInfoCrossDevices,
    getInfoConnectDevices
} from "../../action/device_action/device_action";

const device_reduser = combineReducers({
    device_info: getAllDevice,
    selectDeviceValue: selectDeviceValue,
    selectDeviceLastValue: selectDeviceLastValue,
    infoCrossDevicesEnd: getInfoCrossDevicesEnd,
    infoCrossDevices: getInfoCrossDevices,
    infoConnectDevices: getInfoConnectDevices
});

export default device_reduser;