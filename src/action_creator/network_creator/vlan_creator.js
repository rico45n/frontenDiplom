
const defaultVlan = {
    id_vlan: -1,
    vlan_name: null,
    vlan_number: null,
    is_status: {
        id_status: 1,
        name_status: null
    }
};


export function getVlanSuccess(type, vlan_info){
    switch (type) {
        case "all":
            return {
                type: "get_all_vlan_success",
                vlan_info: vlan_info
            };
        case "addNewLine":
            vlan_info.push(defaultVlan);
            return {
                type: "get_all_vlan_success",
                vlan_info: vlan_info
            };
        case "deleteNewLine":
            vlan_info.pop();
            return {
                type: "get_all_vlan_success",
                vlan_info: vlan_info
            };
        default: return [];
    }
}

export function addNewLine(type, data){
    return (dispatch) =>{ dispatch( getVlanSuccess(type ,data))
    }
}

export function getVlanSelect(type, data){
    switch (type) {
        case "selectVlanValue":
            return {
                type: "selectVlanValue",
                selectVlanValue: data
            };

        default: return [];
    }
}

export function getAllVlan(type, url){
    return (dispatch) =>{
        fetch(url)
            .then(response =>{
                if(response.status!==200){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(vlan_info => dispatch(
                getVlanSuccess(type,vlan_info))
            )
    }
}

export function setVlan(type, url, data) {
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
            .then(vlan_info => {
                return dispatch(getVlanSuccess(type, vlan_info));
            })
    }
}

export function deleteVlan(type, url, data) {
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
            .then(vlan_info => dispatch(
                getVlanSuccess(type,  vlan_info))
            )
    }
}

export function updateVlan(type, url, id,data) {
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
            .then(vlan_info => dispatch(
                getVlanSuccess(type, vlan_info))
            )
    }
}