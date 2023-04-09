import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, Route, useParams} from "react-router-dom";


export default function EditTypeDevices(){
    const {idTypeDev} = useParams();
    const [typeDev, setTypeDev] = useState({
        nameTypeDev: "",
    })
    const {nameTypeDev} = typeDev

    const onInputChange = (e) => {
        setTypeDev({...typeDev, [e.target.name]: e.target.value})
    };

    useEffect(()=>{
        loadTypeDev()
    },[])
    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/TypeDevices/UpdateTypeDevices/${idTypeDev}` , typeDev)
        window.location.assign('http://localhost:3000/TypeDevices')
    }

    const loadTypeDev = async () =>{
        const result = await  axios.get(`http://localhost:8080/TypeDevices/${idTypeDev}`)
        setTypeDev(result.data)
    }
    return( <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Обновить данные типа устройства</h2>
                <form onSubmit={(e) => onSubmit(e)}>
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
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-primary">Обновить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/TypeDevices">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
    )
}