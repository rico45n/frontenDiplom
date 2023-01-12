import {combineReducers} from "redux";
import {getAllTypeDevice} from "../../action/device_action/type_device_action";

const type_device_reduser = combineReducers({
    type_device_info: getAllTypeDevice

});

export default type_device_reduser;