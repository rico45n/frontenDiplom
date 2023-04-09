import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function EditNodes(){
    const {id}=useParams()

    const [node, setNodes] = useState({
        idUserOtv: 0,
        nameNodes: ""
    })
    const {idUserOtv,nameNodes} = node
    const onInputChange = (e) => {
        setNodes({...node, [e.target.name]: e.target.value})
    };

    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers();
    }, []);
    useEffect(() => {
        loadNodes();
    }, []);
    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/User/AllUser")
        setUsers(result.data)
    }

    const options = users.map((user, index) => {
        return <option value={user.userId}  key={index}>{user.fioUser}</option>;
    });


    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/Nodes/UpdateNodes/${id}` , node)
        window.location.assign('http://localhost:3000/Nodes')
    }

    const loadNodes = async () =>{
        const result = await  axios.get(`http://localhost:8080/Nodes/${id}`)
        setNodes(result.data)
    }

    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Обновление коммутационного центра</h2>
                <form onSubmit={(e) => onSubmit(e)} >
                    <div className="mb-3">
                        <label htmlFor="nameNodes" className="form-label">
                            Наименование коммутационного центра
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите название коммутационного центра"
                            name="nameNodes"
                            value={nameNodes}
                            onChange={(e) => onInputChange(e)}
                            required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idUserOtv" className="form-label" placeholder="Выберите ответственного">
                            Ответственный
                        </label>
                        <select className="form-control" name="idUserOtv" type="text" onChange={(e) => onInputChange(e)}>
                            {options}
                        </select>

                    </div>

                    <button type="submit" className="btn btn-success">Добавить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/Nodes">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
}