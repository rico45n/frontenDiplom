import {combineReducers} from "redux";
import {checkDHCP, getDhcp, selectDHCP} from "../../action/network_action/dhcp_action";

const dhcp_reduser = combineReducers({
    dhcp_info: getDhcp,
    selectDhcpValue: selectDHCP,
    checkDHCP: checkDHCP
});

export default dhcp_reduser;