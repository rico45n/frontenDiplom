import {combineReducers} from "redux";
import {getVlan, selectVlan} from "../../action/network_action/vlan_action";

const vlan_reduser = combineReducers({
    vlan_info: getVlan,
    selectVlan: selectVlan
});

export default vlan_reduser;