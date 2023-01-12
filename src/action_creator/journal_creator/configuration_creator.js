const defaultConfig = {
    id_config: -1,
    id_device: "",
    host_name: "",
    config_first: "",
    config_last: "",
    deference: "",
    id_user_reg: "",
    user_reg: "",
    id_user_old: 0,
    user_old: "",
    date_reg: "",
    date_old: "",
    id_status: "",
    name_status: ""
};

export function getConfigurationSuccess(type, config_dev_info){
    switch (type) {
        case "all":
            return {
                type: "get_all_configuration_success",
                config_dev_info: config_dev_info
            };
        case "addNewLine":
            config_dev_info.push(defaultConfig);
            return {
                type: "get_all_configuration_success",
                config_dev_info: config_dev_info
            };
        case "deleteNewLine":
            config_dev_info.pop();
            return {
                type: "get_all_configuration_success",
                config_dev_info: config_dev_info
            };
        default: return [];
    }
}

export function addNewLine(type, data){
    return (dispatch) =>{ dispatch( getConfigurationSuccess(type ,data))
    }
}

export function getAllConfiguration(type,url){
    return (dispatch) =>{
        fetch(url)
            .then(response =>{
                if(response.status!==200){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(config_dev_info => dispatch(
                getConfigurationSuccess(type,config_dev_info))
            )
    }
}

export function setConfiguration(type, url, data) {
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
            .then(config_dev_info => {
                return dispatch(getConfigurationSuccess(type, config_dev_info));
            })
    }
}

export function updateConfiguration(type, url, id, data) {
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
            .then(config_dev_info => dispatch(
                getConfigurationSuccess(type, config_dev_info))
            )
    }
}