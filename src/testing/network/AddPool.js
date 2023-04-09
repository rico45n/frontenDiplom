import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function AddPool() {
    const [pools, setPools] = useState({
        namePool: "",
        ipAddresStart: "",
        ipAddresEnd: "",
        idUserOld: "",
        idUserReg: "",
    })
    const {namePool, ipAddresStart, ipAddresEnd, idUserOld, idUserReg} = pools

    const [users, setUsers] = useState([])
    const onInputChange = (e) => {
        setPools({...pools, [e.target.name]: e.target.value})
    };
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/User/AllUser")
        setUsers(result.data)
    }

    const options = users.map((user, index) => {
        return <option value={user.userId} key={index}>{user.fioUser}</option>;
    });
    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/Pool/CreatePool" , pools)
        window.location.assign('http://localhost:3000/NetworkPool')
    }

    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Создание пула сети</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="namePool" className="form-label">
                            Названия пула
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите название пула"
                            name="namePool"
                            value={namePool}
                            onChange={(e) => onInputChange(e)}
                            required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="ipAddresStart" className="form-label">
                            Начальный адрес
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите начальный адрес"
                            name="ipAddresStart"
                            value={ipAddresStart}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ipAddresEnd" className="form-label">
                            Конечный адрес
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите конечный адрес"
                            name="ipAddresEnd"
                            value={ipAddresEnd}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="idUserReg" className="form-label" placeholder="Комутационный центр">
                            Пользователь создавший запись
                        </label>
                        <select className="form-control" name="idUserReg" type="text" onChange={(e) => onInputChange(e)}>
                            {options}
                        </select>

                    </div>

                    <div className="mb-3">
                        <label htmlFor="idUserOld" className="form-label" placeholder="Выберите ответственного">
                            Пользователь изменивший запись
                        </label>
                        <select className="form-control" name="idUserOld" type="text"
                                onChange={(e) => onInputChange(e)}>
                            {options}
                        </select>

                    </div>

                    <button type="submit" className="btn btn-success">Добавить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/NetworkPool">Отмена</Link>
                </form>
            </div>

        </div>
    </div>

}