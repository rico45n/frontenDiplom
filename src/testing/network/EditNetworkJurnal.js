import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function EditNetworkJurnal(){
    const {id}=useParams()

    const [networksJur, setNetworksJur] = useState({
        idNetwork: "",
        dnsZone: "",
        ipAddress: "",
        idUserReg: "",
        idUserOld: "",
        idDevices: "",
    })
    const {idNetwork, dnsZone, ipAddress, idUserReg, idUserOld, idDevices} = networksJur

    const onInputChange = (e) => {
        setNetworksJur({...networksJur, [e.target.name]: e.target.value})
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

    const loadNetworksJur = async () =>{
        const result = await  axios.get(`http://localhost:8080/NetworkJournal/${id}`)
        setNetworksJur(result.data)
    }
    useEffect(() => {
        loadNetworksJur();
    }, []);

    const [net, setNet] = useState([])
    const loadNet = async () => {
        const result = await axios.get("http://localhost:8080/Network/NetworkAll")
        setNet(result.data)
    }
    useEffect(() => {
        loadNet();
    }, []);
    const optionsNet = net.map((n, index) => {
        return <option value={n.idNetwork} key={index}>{n.ipAndMask}</option>;
    });

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/NetworkJournal/UpdateNetworkJournal/${id}`, networksJur)
        window.location.assign('http://localhost:3000/NetworkJournal')
    }

    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Обновление записи в журнале</h2>
                <form onSubmit={(e) => onSubmit(e)}>

                    <div className="mb-3">
                        <label htmlFor="idNetwork" className="form-label">
                            ip-адрес сети / маска
                        </label>
                        <select className="form-control" name="idNetwork" type="text"
                                onChange={(e) => onInputChange(e)}>
                            {optionsNet}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="ipAddress" className="form-label">
                            ip-адрес
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите ip-адресс"
                            name="ipAddress"
                            value={ipAddress}
                            onChange={(e) => onInputChange(e)}
                            required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dnsZone" className="form-label">
                            DNS зона
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите маску сети"
                            name="dnsZone"
                            value={dnsZone}
                            onChange={(e) => onInputChange(e)}
                            required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idDevices" className="form-label">
                            Hostname устройства
                        </label>
                        <select className="form-control" name="idDevices" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsDev}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idUserReg" className="form-label" placeholder="Комутационный центр">
                            Пользователь создавший запись
                        </label>
                        <select className="form-control" name="idUserReg" type="text"
                                onChange={(e) => onInputChange(e)}>
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
                    <button type="submit" className="btn btn-success">Обновть</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/NetworkJournal">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
}