export function all_network(state = [], action){
    switch(action.type){
        case "get_network":
            return action.all_network;
        default:
            return state;
    }
}

export function selectNetwork (state = [], action) {
    switch(action.type) {
        case "selectNetworkValue":
            return action.selectNetworkValue;
        default:
            return state;
    }
}

export function selectIP (state = [], action) {
    switch(action.type) {
        case "selectIPValue":
            return action.selectIPValue;
        default:
            return state;
    }
}

export function selectIpAddress (state = [], action) {
    switch(action.type) {
        case "get_address":
            return action.all_address;
        default:
            return state;
    }
}