
const startDevice = {
    countEthernetPort: "",
    countOptPort: "",
    hostname: "",
    id_devices: -1,
    id_props_port: 0,
    id_room: 0,
    id_type_devices: 0,
    id_user_otv: 0,
    inventar_number: "",
    mac_address: "",
    room: "",
    type_device: "",
    user_otv: "",
    id_status: "",
    name_status: ""
};

export function getDeviceSuccess(type, device_info){
    switch (type) {
        case "all":
            return {
                type: "get_all_device_success",
                device_info: device_info
            };
        case "addNewLine":
            device_info.push(startDevice);
            return {
                type: "get_all_device_success",
                device_info: device_info
            };
        case "deleteNewLine":
            device_info.pop();
            return {
                type: "get_all_device_success",
                device_info: device_info
            };
        default: return [];
    }
}

export function getCrossDevicesEndSuccess(type, infoCrossDevicesEnd){
    switch (type) {
        case "all":
            return {
                type: "infoCrossDevicesEnd",
                infoCrossDevicesEnd: infoCrossDevicesEnd
            };
        default: return [];
    }
}

export function getCrossDevicesSuccess(type, infoCrossDevices){
    switch (type) {
        case "all":
            return {
                type: "infoCrossDevices",
                infoCrossDevices: infoCrossDevices
            };
        default: return [];
    }
}

export function getConnectDevicesSuccess(type, infoConnectDevices){
    switch (type) {
        case "all":
            return {
                type: "infoConnectDevices",
                infoConnectDevices: infoConnectDevices
            };
        default: return [];
    }
}

export function addNewLine(type, data){
    return (dispatch) =>{ dispatch( getDeviceSuccess(type ,data))
    }
}

export function getDeviceSelect(type, data){
    switch (type) {
        case "selectDeviceValue":
            return {
                type: "selectDeviceValue",
                selectDeviceValue: data
            };
        default: return [];
    }
}
export function getDeviceLastSelect(type, data){
    switch (type) {
        case "selectDeviceLastValue":
            return {
                type: "selectDeviceLastValue",
                selectDeviceLastValue: data
            };
        default: return [];
    }
}

export function getAllDevice(type,url){
    return (dispatch) =>{
        fetch(url)
            .then(response =>{
                if(response.status!==200){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(device_info => dispatch(getDeviceSuccess(type, device_info)))
    }
}

export function setDevice(type, url, data) {
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
            .then(device_info => {
                return dispatch(getDeviceSuccess(type, device_info));
            })
    }
}

export function deleteDevice(type, url, data, id_user) {
    return (dispatch) => {
        fetch(url + data + id_user, {
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
            .then(device_info => dispatch(
                getDeviceSuccess(type,  device_info))
            )
    }
}

export function updateDevice(type, url, id,data) {
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
                .then(device_info => dispatch(
                    getDeviceSuccess(type, device_info))
                )
        }
}

export function getInfoCrossDeviceEnd(type, url, id) {
    return (dispatch) => {
        fetch(url + id, {
            credentials: "same-origin", //передаем сессионные данные
            method: 'GET'
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(infoCrossDevicesEnd => dispatch(
                getCrossDevicesEndSuccess(type,  infoCrossDevicesEnd))
            )
    }
}

export function getInfoCrossDevice(type, url) {
    return (dispatch) => {
        fetch(url, {
            credentials: "same-origin", //передаем сессионные данные
            method: 'GET'
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(infoCrossDevices => dispatch(
                getCrossDevicesSuccess(type,  infoCrossDevices))
            )
    }
}


export function getInfoConnectDevice(type, url) {
    return (dispatch) => {
        fetch(url, {
            credentials: "same-origin", //передаем сессионные данные
            method: 'GET'
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(infoConnectDevices => dispatch(
                getConnectDevicesSuccess(type,  infoConnectDevices))
            )
    }
}

export function updateSelectValue(type, label, data) {
    return (dispatch) => {
        const value = [{label: label , value: data}];
        //v(value);
        console.log(value);
        return  dispatch(getDeviceSelect(type, value));
    };
}