export function getVlan (state = [], action) {
    switch(action.type) {
        case "get_all_vlan_success":
            return action.vlan_info;
        default:
            return state;
    }
}

export function selectVlan (state = [], action) {
    switch(action.type) {
        case "selectVlanValue":
            return action.selectVlanValue;
        default:
            return state;
    }
}