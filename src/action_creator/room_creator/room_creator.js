const startRoom = {
    id_room: -1,
    name_room: "",
    id_user_otv: 0,
    user_otv: "",
    type_room: "",
    id_nodes: 0,
    name_nodes: ""
};

export function getRoomSuccess(type, room_info){
    switch (type) {
        case "all":
            return {
                type: "get_all_room_success",
                room_info: room_info
            };
        case "addNewLine":
            room_info.push(startRoom);
            return {
                type: "get_all_room_success",
                room_info: room_info
            };
        case "deleteNewLine":
            room_info.pop();
            return {
                type: "get_all_room_success",
                room_info: room_info
            };
        default: return [];
    }
}

export function getRoomSelect(type, data){
    switch (type) {
        case "selectRoomValue":
            return {
                type: "selectRoomValue",
                selectRoomValue: data
            };
        default: return [];
    }
}

export function addNewLine(type, data){
    return (dispatch) =>{ dispatch( getRoomSuccess(type ,data))
    }
}

export function getAllRoom(type, url){
    return (dispatch) =>{
        fetch(url)
            .then(response =>{
                if(response.status!==200){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(room_info => dispatch(
                getRoomSuccess(type ,room_info))
            )
    }
}

export function setRoom(type, url, data) {
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
            .then(room_info => {
                return dispatch(getRoomSuccess(type, room_info));
            })
    }
}

export function deleteRoom(type, url, data) {
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
            .then(room_info => dispatch(
                getRoomSuccess(type,  room_info))
            )
    }
}

export function updateRoom(type, url, id,data) {
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
            .then(room_info => dispatch(
                getRoomSuccess(type, room_info))
            )
    }
}