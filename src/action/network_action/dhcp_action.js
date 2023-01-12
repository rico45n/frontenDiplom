export function getDhcp(state = [], action) {
    switch(action.type) {
        case "get_all_dhcp_success":
            return action.dhcp_info;
        default:
            return state;
    }
}

export function selectDHCP (state = [], action) {
    switch(action.type) {
        case "selectDHCPValue":
            return action.selectDHCPValue;
        default:
            return state;
    }
}

export function checkDHCP (state = [], action) {
    switch(action.type) {
        case true:
            return action.statusCheck;
        case false:
            return action.statusCheck;
        default: return state;
    }
}