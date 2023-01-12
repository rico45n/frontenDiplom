import {combineReducers} from "redux";
import {getCrosses, selectCrosses} from "../../action/network_action/crosses_action";

const crosses_reduser = combineReducers({
    crosses_info: getCrosses,
    selectCrosses: selectCrosses
});

export default crosses_reduser;