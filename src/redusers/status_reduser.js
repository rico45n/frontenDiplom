import {combineReducers} from "redux";
import {selectStatus, status_action} from "../action/status_action";

const status_reduser = combineReducers({
    status_action: status_action,
    selectStatus: selectStatus
});

export default status_reduser;