import {combineReducers} from "redux";
import {network_pool, selectNetwork_pool} from "../../action/network_action/network_pool_action";

const networ_pool_reduser = combineReducers({
    network_pool: network_pool,
    selectNetwork_pool: selectNetwork_pool
});

export default networ_pool_reduser;