
const defaultConfig ={
    id_crossdevices: -1,
    id_devices_first: null,
    host_name_start: "",
    id_devices_end: null,
    host_name_end: "",
    id_user_otv: 0,
    user_otv: "",
    id_user_old: 0,
    user_old: "",
    id_network_journal: 0,
    ip_address_network: "",
    description: "",
    date_reg: "",
    date_old: "",
    id_vlan: 0,
    name_vlan: "",
    id_crosses: 0,
    info_crosses: "",
    id_status: 0,
    name_status: ""
}

export function getCrossDeviceSuccess(type, cross_device_info){
    switch (type) {
        case "all":
            return {
                type: "get_all_cross_device_success",
                cross_device_info: cross_device_info
            };
        case "addNewLine":
            cross_device_info.push(defaultConfig);
            return {
                type: "get_all_cross_device_success",
                cross_device_info: cross_device_info
            };
        case "deleteNewLine":
            cross_device_info.pop();
            return {
                type: "get_all_cross_device_success",
                cross_device_info: cross_device_info
            };
        default: return [];
    }
}

export function addNewLine(type, data){
    return (dispatch) =>{ dispatch( getCrossDeviceSuccess(type ,data))
    }
}

export function getAllCrossDevice(type,url){
    return (dispatch) =>{
        fetch(url)
            .then(response =>{
                if(response.status!==200){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(cross_device_info => dispatch(
                getCrossDeviceSuccess(type,cross_device_info))
            )
    }
}

export function setCrossDevice(type, url, data) {
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
            .then(cross_device_info => {
                return dispatch(getCrossDeviceSuccess(type, cross_device_info));
            })
    }
}

export function deleteCrossDevice(type, url, data) {
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
            .then(cross_device_info => dispatch(
                getCrossDeviceSuccess(type,  cross_device_info))
            )
    }
}

export function updateCrossDevice(type, url, id,data) {
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
            .then(cross_device_info => dispatch(
                getCrossDeviceSuccess(type, cross_device_info))
            )
    }
}