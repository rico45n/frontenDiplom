export function network_pool(state = [], action){
    switch(action.type){
        case "get_network_pool":
            return action.network_pool;
        default:
            return state;
    }
}

export function selectNetwork_pool (state = [], action) {
    switch(action.type) {
        case "selectNetwork_poolValue":
            return action.selectNetwork_poolValue;
        default:
            return state;
    }
}