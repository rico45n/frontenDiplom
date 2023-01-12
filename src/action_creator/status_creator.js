export function getStatusSuccess(type, status_info){
    switch (type) {
        case "all":
            return {
                type: "get_status",
                status_info: status_info
            };
        default: return [];
    }
}

export function getStatusSelect(type, data){
    switch (type) {
        case "selectStatusValue":
            return {
                type: "selectStatusValue",
                selectStatus: data
            };
        default: return [];
    }
}

export function getRefStatus(type,url) {
    return async (dispatch) => {
        await fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(status_info => dispatch(
                getStatusSuccess(type, status_info))
            )
    }
}