import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function EditVlan(){
    const {id} = useParams()

    const [vlans, setVlans] = useState({
        vlanName: "",
        vlanNumber: "",
    })
    const {vlanName,vlanNumber} = vlans
    const onInputChange = (e) => {
        setVlans({...vlans, [e.target.name]: e.target.value})
    };

    useEffect(()=>{
        loadVlan()
    },[])


    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/Vlan/UpdateVlan/${id}` , vlans)
        window.location.assign('http://localhost:3000/VLAN')
    }

    const loadVlan = async () =>{

        const result = await  axios.get(`http://localhost:8080/Vlan/${id}`)
        setVlans(result.data)
    }
    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Обновить VLAN</h2>
                <form onSubmit={(e) => onSubmit(e)} >

                    <div className="mb-3">
                        <label htmlFor="vlanName" className="form-label">
                            Наименование VLAN
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите наименование VLAN"
                            name="vlanName"
                            value={vlanName}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="vlanNumber" className="form-label">
                            Номер VLAN
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите номер VLAN"
                            name="vlanNumber"
                            value={vlanNumber}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Обновить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/VLAN">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
}