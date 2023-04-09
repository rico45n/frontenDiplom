import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import PageFooter from "../../footer/PageFooter";

export default function Devices(){
    const [devices, setDevices] = useState([])

    const {devicesId} = useParams()


    useEffect(() => {
        loadDevices()
    }, []);

    const loadDevices = async () => {
        const result = await axios.get("http://localhost:8080/Devices/DevicesAll")
        setDevices(result.data)
    }

    const deleteDevice = async (devicesId , idUserOtv) => {
        await axios.delete(`http://localhost:8080/Devices/DeleteDevices/${devicesId}?${idUserOtv}`)
        loadDevices()
    }
    return (
        <div>
            <PageFooter/>
            <div className="container-fluid">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th className="text-center" scope="col">#</th>
                            <th className="text-center" scope="col">Тип устройства</th>
                            <th className="text-center" scope="col">Hostname</th>
                            <th className="text-center" scope="col">MAC-адрес</th>
                            <th className="text-center" scope="col">Интвентарный номер</th>
                            <th className="text-center" scope="col">Кол-во Ethernet портов</th>
                            <th className="text-center" scope="col">Кол-во портов под оптоволокно</th>
                            <th className="text-center" scope="col">Помещение</th>
                            <th className="text-center" scope="col">Ответственный</th>
                            <td className="text-center">
                                <Link className="btn btn-success mx-2"
                                      to="/addDevices">Добавить устройство</Link>
                            </td>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            devices.map((devises, index) => (
                                <tr>
                                    <th className="text-center" scope="row" key={index}>{index + 1}</th>
                                    <td className="text-center" >{devises.typeDevice}</td>
                                    <td className="text-center" >{devises.hostName}</td>
                                    <td className="text-center" >{devises.macAddress}</td>
                                    <td className="text-center" >{devises.inventarNumber}</td>
                                    <td className="text-center" >{devises.countEthernetPort}</td>
                                    <td className="text-center" >{devises.countOptPort}</td>
                                    <td className="text-center" >{devises.room}</td>
                                    <td className="text-center" >{devises.userOtv}</td>
                                    <td className="text-center" >
                                        <Link className="btn btn-outline-primary mx-2"
                                              to={`/editDevice/${devises.idDevices}`}>Обновить</Link>
                                        <button className="btn btn-danger mx-2"
                                                onClick={() => deleteDevice(devises.idDevices , devises.idUserOtv)}>Удалить
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
