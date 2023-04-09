import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function AddCrossesDev(){
    const [crossDev, setCrossDev] = useState({
        idDevicesFirst:"",
        idDevicesEnd: "",
        idUserOtv: "",
        idUserOld: "",
        idNetworkJournal: "",
        description: "",
        idVlan: "",
        idCrosses: "",
    })

    const {idDevicesFirst,idDevicesEnd, idUserOtv, idVlan, idNetworkJournal,idCrosses,description} = crossDev

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

    const [lans, setLans] = useState([])
    const loadLans = async () => {
        const result = await axios.get("http://localhost:8080/Vlan/VlanAll")
        setLans(result.data)
    }
    useEffect(() => {
        loadLans();
    }, []);

    const optionsLan = lans.map((lan, index) => {
        return <option value={lan.idVlan} key={index}>{lan.vlanName}</option>;
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
    const optionsDev2 = dev.map((d, index) => {
        return <option value={d.idDevices} key={index}>{d.inventarNumber}</option>;
    });

    const [journals, setJournals] = useState([])
    useEffect(() => {
        loadJournals()
    }, []);
    const loadJournals = async () => {
        const result = await axios.get("http://localhost:8080/NetworkJournal/NetworkJournalAll")
        setJournals(result.data)
    }
    const optionsNetJu = journals.map((d, index) => {
        return <option value={d.idNetworkJournal} key={index}>{d.ipAddress}</option>;
    });

    const [cross, setcross] = useState([])
    const loadcross = async () => {
        const result = await axios.get("http://localhost:8080/Crosses/")
        setcross(result.data)
    }
    useEffect(() => {
        loadcross();
    }, []);
    const optionscross = cross.map((d, index) => {
        return <option value={d.idCrosses} key={index}>{d.infoCrosses}</option>;
    });

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/CrossDevices/CreateCrossDevices" , crossDev)
        window.location.assign('http://localhost:3000/CrossesDevice')
    }
    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Создание</h2>
                <form onSubmit={(e) => onSubmit(e)}>

                    <div className="mb-3">
                        <label htmlFor="idDevicesFirst" className="form-label">
                            Hostname начального уст-ва
                        </label>
                        <select className="form-control" name="idDevicesFirst" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsDev}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idDevicesEnd" className="form-label">
                            Hostname подключаемого устройства
                        </label>
                        <select className="form-control" name="idDevicesEnd" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsDev}
                        </select>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="idNetworkJournal" className="form-label">
                            Назначеный Ip-адрес
                        </label>
                        <select className="form-control" name="idNetworkJournal" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsNetJu}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idPoolAddress" className="form-label">
                            Инфентарный нормер подключаемого устройства
                        </label>
                        <select className="form-control" name="idPoolAddress" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsDev2}
                        </select>
                    </div>



                    <div className="mb-3">
                        <label htmlFor="idUserOtv" className="form-label">
                            Ответственный за устр-во
                        </label>
                        <select className="form-control" name="idUserOtv" type="text" onChange={(e) => onInputChange(e)}>
                            {options}
                        </select>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Причина изменения
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите description"
                            name="description"
                            value={description}
                            onChange={(e) => onInputChange(e)}
                            />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="idVlan" className="form-label">
                            Наименование VLAN
                        </label>
                        <select className="form-control" name="idVlan" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsLan}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="idCrosses" className="form-label">
                            Информация о подключении
                        </label>
                        <select className="form-control" name="idCrosses" type="text" onChange={(e) => onInputChange(e)}>
                            {optionscross}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idUserOtv" className="form-label">
                            Пользователь создавший запись
                        </label>
                        <select className="form-control" name="idUserOtv" type="text" onChange={(e) => onInputChange(e)}>
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
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/CrossesDevice">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
}