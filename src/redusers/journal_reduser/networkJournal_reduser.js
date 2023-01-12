import {combineReducers} from "redux";
import {getNetwork_Journal, selectNetwork_Journal} from "../../action/journal_action/networkJournal__action";

const networkJournal_reduser = combineReducers({
    network_journal_info: getNetwork_Journal,
    selectNetwork_Journal: selectNetwork_Journal
});
export default networkJournal_reduser;