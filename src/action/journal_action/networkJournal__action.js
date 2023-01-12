export function getNetwork_Journal (state = [], action) {
    switch(action.type) {
        case "get_all_network_journal_success":
            return action.network_journal_info;
        default:
            return state;
    }
}

export function selectNetwork_Journal (state = [], action) {
     switch(action.type) {
        case "selectNetwork_JournalValue":
            return action.selectNetwork_JournalValue;
        default:
            return state;
    }
}