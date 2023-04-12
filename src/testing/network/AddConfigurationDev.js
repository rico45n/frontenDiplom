import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function AddConfigurationDev(){
    const [crossDev, setCrossDev] = useState({
        configFirst: "",
        configLast: "",
        deference: "",
        idDevice: "",
        idUserReg: "",
        idUserOld: "",
    })

    const {configFirst,configLast, deference, idDevice, idUserReg,idUserOld} = crossDev
    const onInputChange = (e) => {
        setCrossDev({...crossDev, [e.target.name]: e.target.value})
    };
    const [users, setUsers] = useState([])
    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/User/AllUser")
        setUsers(result.data)
    }
    useEffect(() => {
        loadUsers();
    }, []);
    const options = users.map((user, index) => {
        return <option value={user.userId} key={index}>{user.fioUser}</option>;
    });

    const [dev, setDev] = useState([])
    const loadDev = async () => {
        const result = await axios.get("http://localhost:8080/Devices/DevicesAll")
        setDev(result.data)
    }
    useEffect(() => {
        loadDev();
    }, []);
    const optionsDev = dev.map((d, index) => {
        return <option value={d.idDevices} key={index}>{d.hostName}</option>;
    });

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/Configuration/CreateConfiguration" , crossDev)
        window.location.assign('http://localhost:3000/ConfigurationDevices')
    }

    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Создание</h2>
                <form onSubmit={(e) => onSubmit(e)}>

                    <div className="mb-3">
                        <label htmlFor="idDevice" className="form-label">
                            Hostname устройства
                        </label>
                        <select className="form-control" name="idDevice" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsDev}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="configFirst" className="form-label">
                            Начальная конфигурация
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите configFirst"
                            name="configFirst"
                            value={configFirst}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="configLast" className="form-label">
                            Конфигурация после изменений
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите configFirst"
                            name="configLast"
                            value={configLast}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="configLast" className="form-label">
                            Разница
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите deference"
                            name="deference"
                            value={deference}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idUserReg" className="form-label">
                            Пользователь создавший запись
                        </label>
                        <select className="form-control" name="idUserReg" type="text" onChange={(e) => onInputChange(e)}>
                            {options}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idUserOld" className="form-label">
                            Пользователь изменивший запись
                        </label>
                        <select className="form-control" name="idUserOld" type="text" onChange={(e) => onInputChange(e)}>
                            {options}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success">Добавить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/ConfigurationDevices">Отмена</Link>
                </form>
            </div>

        </div>
    </div>

}