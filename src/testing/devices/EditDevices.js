import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function EditDevices(){
    const {id} = useParams()
    const [devices, setDevices] = useState({
        idTypeDevices: 0,
        idUserOtv: 0,
        hostName: "",
        macAddress: "",
        inventarNumber: "",
        idRoom: 0,
        countEthernetPort: "",
        countOptPort:"",
    })
    const {idTypeDevices, idUserOtv, hostName, macAddress, inventarNumber,idRoom,countEthernetPort,countOptPort} = devices
    const onInputChange = (e) => {
        setDevices({...devices, [e.target.name]: e.target.value})
    };

    useEffect(()=>{
        loadDevices()
    },[])


    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/Devices/UpdateDevices/${id}` ,devices)
        window.location.assign('http://localhost:3000/Devices')
    }

    const loadDevices = async () =>{
        const result = await axios.get(`http://localhost:8080/Devices/${id}`)
        setDevices(result.data)
    }

    const [typeDevice, setTypeDevice] = useState([])
    useEffect(() => {
        loadTypeDevice();
    }, []);

    const loadTypeDevice = async () => {
        const result = await axios.get("http://localhost:8080/TypeDevices/TypeDevicesAll")
        setTypeDevice(result.data)
    }

    const options = typeDevice.map((typeDev, index) => {
        return <option value={typeDev.idTypeDev}  key={index}>{typeDev.nameTypeDev}</option>;
    });


    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/User/AllUser")
        setUsers(result.data)
    }

    const optionsUsers = users.map((user, index) => {
        return <option value={user.userId}  key={index}>{user.fioUser}</option>;
    });



    const [rooms, setRooms] = useState([])

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        const result = await axios.get("http://localhost:8080/Room/RoomlAll")
        setRooms(result.data)
    }

    const optionsRooms = rooms.map((room, index) => {
        return <option value={room.idRoom}  key={index}>{room.nameRoom}</option>;
    });

    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Обновить устройство организации</h2>
                <form onSubmit={(e) => onSubmit(e)} >
                    <div className="mb-3">
                        <label htmlFor="idTypeDevices" className="form-label" placeholder="Выберите тип устройста">
                            Тип устройста
                        </label>
                        <select className="form-control" name="idTypeDevices" type="text" onChange={(e) => onInputChange(e)}>
                            {options}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="hostName" className="form-label">
                            Имя хоста
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите hostname"
                            name="hostName"
                            value={hostName}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="macAddress" className="form-label">
                            MAC-адрес
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите MAC-адрес"
                            name="macAddress"
                            value={macAddress}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inventarNumber" className="form-label">
                            Инвентарный номер
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Введите инвентарный номер"
                            name="inventarNumber"
                            value={inventarNumber}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="countEthernetPort" className="form-label">
                            Кол-во Ethernet портов
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Введите кол-во Ethernet портов"
                            name="countEthernetPort"
                            value={countEthernetPort}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="countOptPort" className="form-label">
                            Кол-во портов под оптоволокно
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Введите кол-во портов под оптоволокно"
                            name="countOptPort"
                            value={countOptPort}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idRoom" className="form-label" placeholder="Выберите тип устройста">
                            Помещение
                        </label>
                        <select className="form-control" name="idRoom" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsRooms}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idUserOtv" className="form-label" placeholder="Выберите тип устройста">
                            Ответственный
                        </label>
                        <select className="form-control" name="idUserOtv" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsUsers}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success">Добавить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/Devices">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
}