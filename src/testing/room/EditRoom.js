import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function EditRoom() {
    const {id}=useParams()

    const [room, setRoom] = useState({
        nameRoom: "",
        idUserOtv: "",
        typeRoom: "",
        idNodes: "",
    })
    const {nameRoom, idUserOtv, typeRoom, idNodes} = room

    const onInputChange = (e) => {
        setRoom({...room, [e.target.name]: e.target.value})
    };

    useEffect(()=>{
        loadRoom()
    },[])

    useEffect(() => {
        loadUsers();
    }, []);
    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/User/AllUser")
        setUsers(result.data)
    }
    useEffect(() => {
        loadNodes();
    }, []);
    const loadNodes = async () => {
        const result = await axios.get("http://localhost:8080/Nodes/NodesAll")
        setNodes(result.data)
    }

    const [users, setUsers] = useState([])

    const options = users.map((user, index) => {
        return <option value={user.userId}  key={index}>{user.fioUser}</option>;
    });

    const [nodes, setNodes] = useState([])
    const optionsNodes = nodes.map((node, index) => {
        return <option value={node.idNodes} key={index}>{node.nameNodes}</option>;
    });


    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/Room/UpdateRoom/${id}` , room)
        window.location.assign('http://localhost:3000/Rooms')
    }

    const loadRoom = async () =>{
        const result = await  axios.get(`http://localhost:8080/Room/${id}`)
        setRoom(result.data)
    }

    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Обновить данные комнаты</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="nameRoom" className="form-label">
                            Наименование комнаты
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите название комнаты"
                            name="nameRoom"
                            value={nameRoom}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="typeRoom" className="form-label">
                            Тип помещения
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите тип помещения"
                            name="typeRoom"
                            value={typeRoom}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idNodes" className="form-label" placeholder="Комутационный центр">
                            Комутационный центр
                        </label>
                        <select className="form-control" name="idNodes" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsNodes}
                        </select>

                    </div>


                    <div className="mb-3">
                        <label htmlFor="idUserOtv" className="form-label" placeholder="Выберите ответственного">
                            Ответственный
                        </label>
                        <select className="form-control" name="idUserOtv" type="text" onChange={(e) => onInputChange(e)}>
                            {options}
                        </select>

                    </div>
                    <button type="submit" className="btn btn-outline-primary">Обновить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/Rooms">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
}