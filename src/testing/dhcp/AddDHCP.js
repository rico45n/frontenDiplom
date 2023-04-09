import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function AddDHCP(){
    const [DHCPs, setDHCP] = useState({
        addressStart: "",
        addressEnd: "",
    })
    const {addressStart,addressEnd} = DHCPs

    const onInputChange = (e) => {
        setDHCP({...DHCPs, [e.target.name]: e.target.value})
    };
    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/DHCP/CreateDHCP" , DHCPs)
        window.location.assign('http://localhost:3000/DHCP')
    }
    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Создание DHCP</h2>
                <form onSubmit={(e) => onSubmit(e)} >

                    <div className="mb-3">
                        <label htmlFor="addressStart" className="form-label">
                            Начальный адрес
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите начальный адрес"
                            name="addressStart"
                            value={addressStart}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="addressEnd" className="form-label">
                            Конечный адрес
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите конечный адрес"
                            name="addressEnd"
                            value={addressEnd}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Добавить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/DHCP">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
}