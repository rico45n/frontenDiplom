import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function EditDHCP(){
    const {id} = useParams()
    const [DHCPs, setDHCP] = useState({
        addressStart: "",
        addressEnd: "",
    })
    const {addressStart,addressEnd} = DHCPs
    const onInputChange = (e) => {
        setDHCP({...DHCPs, [e.target.name]: e.target.value})
    };

    useEffect(()=>{
        loadDHCP()
    },[])


    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/DHCP/UpdateDHCP/${id}` , DHCPs)
        window.location.assign('http://localhost:3000/DHCP')
    }

    const loadDHCP = async () =>{
        const result = await  axios.get(`http://localhost:8080/DHCP/${id}`)
        setDHCP(result.data)
    }
    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Обновление DHCP</h2>
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
                    <button type="submit" className="btn btn-success">Обновить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/DHCP">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
}