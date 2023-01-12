const defaultType_device_info = {
    id_type_dev: -1,
    name_type_dev: ""
};

export function getTypeDeviceSuccess(type, type_device_info){
    switch (type) {
        case "all":
            return {
                type: "get_all_type_device_success",
                type_device_info: type_device_info
            };

        case "addNewLine":
            type_device_info.push(defaultType_device_info);
            return {
                type: "get_all_type_device_success",
                type_device_info: type_device_info
            };
        case "deleteNewLine":
            type_device_info.pop();
            return {
                type: "get_all_type_device_success",
                type_device_info: type_device_info
            };
        default: return [];
    }
}

export function addNewLine(type, data){
    return (dispatch) =>{ dispatch( getTypeDeviceSuccess(type ,data))
    }
}

export function getAllTypeDevice(url){
    return (dispatch) =>{
        fetch(url)
            .then(response =>{
                if(response.status!==200){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(type_device_info => dispatch(
                getTypeDeviceSuccess("all",type_device_info))
            )
    }
}

export function setTypeDevice(type, url, data) {
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
            .then(type_device_info => {
                return dispatch(getTypeDeviceSuccess(type, type_device_info));
            })
    }
}

export function deleteTypeDevice(type, url, data) {
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
            .then(type_device_info => dispatch(
                getTypeDeviceSuccess(type,  type_device_info))
            )
    }
}

export function updateTypeDevice(type, url, id,data) {
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
            .then(type_device_info => dispatch(
                getTypeDeviceSuccess(type, type_device_info))
            )
    }
}