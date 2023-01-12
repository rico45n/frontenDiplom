const defaultPool = {
    id_pool_address: -1,
    name_pool: null,
    ip_addres_start: null,
    ip_addres_end: null,
    date_reg: null,
    date_old: null,
    user_old: null,
    id_user_old: null,
    user_reg: null,
    id_user_reg: null,
    id_status: null,
    name_status: null
};

export function getPoolSuccess(type, pool_info){
    switch (type) {
        case "all":
            return {
                type: "get_all_pool_success",
                pool_info: pool_info
            };
        case "addNewLine":
            pool_info.push(defaultPool);
            return {
                type: "get_all_pool_success",
                pool_info: pool_info
            };
        case "deleteNewLine":
            pool_info.pop();
            return {
                type: "get_all_pool_success",
                pool_info: pool_info
            };
        default: return [];
    }
}

export function getPoolSelect(type, data){
    switch (type) {
        case "selectPoolValue":
            return {
                type: "selectPoolValue",
                selectPoolValue: data
            };
        default: return [];
    }
}

export function addNewLine(type, data){
    return (dispatch) =>{ dispatch( getPoolSuccess(type ,data))
    }
}

export function getAllPool(type, url){
    return (dispatch) =>{
        fetch(url)
            .then(response =>{
                if(response.status!==200){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(pool_info => dispatch(
                getPoolSuccess(type,pool_info))
            )
    }
}


export function setPool(type, url, data) {
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
            .then(pool_info => {
                return dispatch(getPoolSuccess(type, pool_info));
            })
    }
}

export function deletePool(type, url, data) {
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
            .then(pool_info => dispatch(
                getPoolSuccess(type,  pool_info))
            )
    }
}

export function updatePool(type, url, id,data) {
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
            .then(pool_info => dispatch(
                getPoolSuccess(type, pool_info))
            )
    }
}