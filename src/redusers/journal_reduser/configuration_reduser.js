import {combineReducers} from "redux";
import {getConfiguration, selectConfiguration} from "../../action/journal_action/configuration_action";


const configuration_reduser = combineReducers({
    config_dev_info: getConfiguration,
    selectConfiguration: selectConfiguration
});
export default configuration_reduser;