
export function getNetworkPoll(type, network_pool){
    switch (type) {
        case "all":
            return {
                type: "get_network_pool",
                network_pool: network_pool
            };
        default: return [];
    }
}

export function getNetworkPoolSelect(type, data){
    switch (type) {
        case "selectNetwork_poolValue":
            return {
                type: "selectNetwork_poolValue",
                selectNetwork_poolValue: data
            };
        default: return [];
    }
}

export function getAllNetworkPool (type, url){
    return (dispatch) =>{
        fetch(url)
            .then(response =>{
                if(response.status!==200){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then( network_pool => dispatch(getNetworkPoll(type, network_pool)))
    }
}


export function setNetworkPool(type, url, data) {
    return (dispatch) => {
        fetch(url, {
            credentials: "same-origin", //передаем сессионные данные
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(network_pool => {
                return dispatch(getNetworkPoll(type, network_pool));
            })
    }
}

export function deleteNetworkPool(type, url, data) {
    return (dispatch) => {
        fetch(url + data, {
            credentials: "same-origin", //передаем сессионные данные
            method: 'DELETE'
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(network_pool => dispatch(
                getNetworkPoll(type,  network_pool))
            )
    }
}

export function updateNetworkPool(type, url, id,data) {
    return (dispatch) => {
        fetch(url+id, {
            credentials: "same-origin", //передаем сессионные данные
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(network_pool => dispatch(
                getNetworkPoll(type, network_pool))
            )
    }
}