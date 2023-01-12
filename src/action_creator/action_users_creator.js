
export function setActionUsers(type, status, id, value){
    switch (type) {
        case "showDialog":
            return {
                type: "showDialog",
                info: {visible: status,
                    str: null}
            };
        case "deleteDialog":
            return {
                type: "deleteDialog",
                info: {visible: status,
                    str: null}
            };
        case "updateVisible":
            return {
                type: "updateVisible",
                info: {
                    visible: status,
                    str: id,
                    value: value
                }};
        default: return [];
    }

}

export function setStatusShowDialog(type, status,id){
    let value = "";
    if(id===null){
        value = "Изменить";
    }
    else{
        value = "Сохранить";
    }
    return (dispatch) => dispatch(setActionUsers(type, status,id,value))
}

