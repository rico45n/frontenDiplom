
const defaultNodes = {
    id_nodes: -1,
    id_user_otv: 0,
    name_nodes: "",
    usert_otv: ""
};

export function getNodesSuccess(type, nodes_info){
    switch (type) {
        case "all":
            return {
                type: "get_all_nodes_success",
                nodes_info: nodes_info
            };
        case "addNewLine":
            nodes_info.push(defaultNodes);
            return {
                type: "get_all_nodes_success",
                nodes_info: nodes_info
            };
        case "deleteNewLine":
            nodes_info.pop();
            return {
                type: "get_all_nodes_success",
                nodes_info: nodes_info
            };
        default: return [];
    }
}

export function addNewLine(type, data){
    return (dispatch) =>{ dispatch( getNodesSuccess(type ,data))
    }
}

export function getNodesSelect(type, data){
    switch (type) {
        case "selectNodesValue":
            return {
                type: "selectNodesValue",
                selectNodesValue: data
            };
        default: return [];
    }
}

export function getAllNodes(type, url){
    return (dispatch) =>{
        fetch(url)
            .then(response =>{
                if(response.status!==200){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(nodes_info => dispatch(
                getNodesSuccess(type ,nodes_info))
            )
    }
}


export function setNodes(type, url, data) {
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
            .then(nodes_info => {
                return dispatch(getNodesSuccess(type, nodes_info));
            })
    }
}

export function deleteNodes(type, url, data) {
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
            .then(nodes_info => dispatch(
                getNodesSuccess(type,  nodes_info))
            )
    }
}

export function updateNodes(type, url, id,data) {
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
            .then(nodes_info => dispatch(
                getNodesSuccess(type, nodes_info))
            )
    }
}