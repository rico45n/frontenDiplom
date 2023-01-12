import {combineReducers} from "redux";
import {getPool, selectPool} from "../../action/network_action/pool_action";

const pool_reduser = combineReducers({
    pool_info: getPool,
    selectPool: selectPool
});

export default pool_reduser;