const defaultNetwork = {
    date_old: "",
    date_reg: "",
    defaultGeteway: "",
    dhcp_pool: "",
    id_dhcp_pool: "",
    id_network: -1,
    id_pool_address: "",
    id_status: "",
    id_user_old: "",
    id_user_reg: "",
    id_vlan: "",
    ip_address_network: "",
    name_status: "",
    networkMask: "",
    pool_address: "",
    user_old: "",
    user_reg: "",
    vlan: "",
    status_network: 0,
    name_stat_network: ""
};

export function getNetwork(type, all_network){
    switch (type) {
        case "all":
            return {
                type: "get_network",
                all_network: all_network
            };
        case "addNewLine":
            all_network.push(defaultNetwork);
            return {
                type: "get_network",
                all_network: all_network
            };
        case "deleteNewLine":
            all_network.pop();
            return {
                type: "get_network",
                all_network: all_network
            };
        default: return [];
    }
}

export function getIpAddressFilterS(type, all_address){
    switch (type) {
        case "all":
            return {
                type: "get_address",
                all_address: all_address
            };
        default: return [];
    }
}
export function addNewLine(type, data){
    return (dispatch) =>{ dispatch( getNetwork(type ,data))
    }
}

export function getAllNetwork(type, url){
    return (dispatch) =>{
        fetch(url)
            .then(response =>{
                if(response.status!==200){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then( all_network => dispatch(getNetwork(type, all_network)))
    }
}

export function getNetworkSelect(type, data){
    switch (type) {
        case "selectNetworkValue":
            return {
                type: "selectNetworkValue",
                selectNetworkValue: data
            };
        default: return [];
    }
}

export function getIPSelect(type, data){
    switch (type) {
        case "selectIPValue":
            return {
                type: "selectIPValue",
                selectIPValue: data
            };
        default: return [];
    }
}

export function setNetwork(type, url, data) {
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
            .then(all_network => {
                return dispatch(getNetwork(type, all_network));
            })
    }
}

export function deleteNetwork(type, url, data) {
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
            .then(all_network => dispatch(
                getNetwork(type,  all_network))
            )
    }
}

export function updateNetwork(type, url, id,data) {
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
            .then(all_network => dispatch(
                getNetwork(type, all_network))
            )
    }
}

export function getIpAddressFilter(type,url, id){
    return (dispatch) =>{
        fetch(url+id, {
            credentials: "same-origin", //передаем сессионные данные
            method: 'GET'
        })
            .then(response =>{
                if(response.status!==200){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then( all_address => dispatch(getIpAddressFilterS(type, all_address)))
    }
}