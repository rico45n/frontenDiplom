import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


export default function AddTypeDevices(){
    const [typeDevice, setDevice] = useState({
        nameTypeDev: "",
    })
    const {nameTypeDev} = typeDevice
    const onInputChange = (e) => {
        setDevice({...typeDevice, [e.target.name]: e.target.value})
    };

    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/TypeDevices/CreateTypeDevices" , typeDevice)
        window.location.assign('http://localhost:3000/TypeDevices')
    }
    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Создание типа устройства</h2>
                <form onSubmit={(e) => onSubmit(e)} >
                    <div className="mb-3">
                        <label htmlFor="nameTypeDev" className="form-label">
                            Тип устройства
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите тип устройства"
                            name="nameTypeDev"
                            value={nameTypeDev}
                            onChange={(e) => onInputChange(e)}
                            required/>
                    </div>
                    <button type="submit" className="btn btn-success">Добавить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/TypeDevices">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
}