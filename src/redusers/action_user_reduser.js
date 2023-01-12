import {getActionUsers, getDeleteActionUsers, getUpdateActionUsers} from "../action/visible_action";
import {combineReducers} from "redux";

const action_user_reduser = combineReducers({
    visible: getActionUsers,
    deleteVisible: getDeleteActionUsers,
    updateVisible: getUpdateActionUsers
});

export default action_user_reduser;
