import {combineReducers} from "redux";
import {getRoom, selectRoomValue} from "../../action/room_action/room_action";

const room_reduser = combineReducers({
    room_info: getRoom,
    selectRoomValue: selectRoomValue
});

export default room_reduser;