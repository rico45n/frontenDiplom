export function getUserSuccess(type, user_info){
    switch (type) {
        case "auth":
            return {
                type: "get_user_auth_success",
                user_auth_info: user_info
            };
        case "all":
            return {
                type: "get_all_user_success",
                user_info: user_info
            };
        default: return [];
    }

}
export function getUserSelect(type, data){
    switch (type) {
        case "selectUserValue":
            return {
                type: "selectUserValue",
                selectUserValue: data
            };
        default: return [];
    }
}
export function getOldUserSelect(type, data){
    switch (type) {
        case "selectOldUserValue":
            return {
                type: "selectOldUserValue",
                selectOldUserValue: data
            };
        default: return [];
    }
}

 export function getUser(type,url) {
     return async (dispatch) => {
         await fetch(url)
             .then(response => {
                 if (response.status !== 200) {
                     throw new Error(response.statusText)
                 }
                 return response;
             })
             .then(response => response.json())
             .then(user_info => dispatch(
                 getUserSuccess(type, user_info))
             )
     }
 }

export function setUser(type, url, data) {
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
            .then(user_info => {
                return dispatch(getUserSuccess(type, user_info));
            })
    }
}

export function deleteUser(type, url, data) {
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
            .then(user_info => dispatch(
                getUserSuccess(type, user_info))
            )
    }
}

export function updateUser(type, url, id,data) {
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
            .then(user_info => dispatch(
                getUserSuccess(type, user_info))
            )
    }
}
