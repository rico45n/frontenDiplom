import {combineReducers} from "redux";
import {getNodes, selectNodesValue} from "../../action/network_action/nodes_action";


const room_reduser = combineReducers({
    nodes_info: getNodes,
    selectNodesValue: selectNodesValue
});

export default room_reduser;