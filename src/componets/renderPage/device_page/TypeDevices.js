import React, {Component, useEffect, useState} from 'react';
import PageFooter from '../../footer/PageFooter';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

export default function TypeDevices() {

    const [typeDevices, setTypeDevices] = useState([])

    const {typeDevicesId} = useParams()



    useEffect(() => {
        loadTypeDevices()
    }, []);

    const loadTypeDevices = async () => {
        const result = await axios.get("http://localhost:8080/TypeDevices/TypeDevicesAll")
        setTypeDevices(result.data)
    }


    const [user ,readUse] = useState([])

    const readUs = async (id) => {
        const result = await axios.get(`http://localhost:8080/TypeDevices/${id}`)
        readUse(result.data)
    }

    const deleteTypeDevice = async (id) => {
        await axios.delete(`http://localhost:8080/TypeDevices/DeleteTypeDevices/${id}`)
        loadTypeDevices()

        if (await readUs(id) !== null){
            alert("От этого тип устройства зависят другие поля")
        }
    }
    return (
        <div>
            <PageFooter/>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th className="text-center" scope="col">#</th>
                            <th className="text-center" scope="col">Тип устройства</th>
                            <td className="text-center">
                                <Link className="btn btn-success mx-2"
                                      to="/addTypeDevices">Добавить устройство</Link>
                            </td>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            typeDevices.map((tDevice, index) => (
                                <tr>
                                    <th className="text-center" scope="row" key={index}>{index + 1}</th>
                                    <td className="text-center" >{tDevice.nameTypeDev}</td>
                                    <td className="text-center" >
                                        <Link className="btn btn-outline-primary mx-2"
                                              to={`/editTypeDevices/${tDevice.idTypeDev}`}>Обновить</Link>
                                        <button className="btn btn-danger mx-2"
                                                onClick={() => deleteTypeDevice(tDevice.idTypeDev)}>Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}