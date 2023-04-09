import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import PageFooter from "../../footer/PageFooter";


export default function DHCP(){
    const [DHCPs, setDHCP] = useState([])

    const {DHCPId} = useParams()

    useEffect(() => {
        loadDHCP()
    }, []);

    const loadDHCP = async () => {
        const result = await axios.get("http://localhost:8080/DHCP/DHCPAll")
        setDHCP(result.data)
    }

    const deleteS = async (DHCPId) => {
        await axios.delete(`http://localhost:8080/DHCP/DeleteDHCP/${DHCPId}`)
        loadDHCP()
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
                            <th className="text-center" scope="col">Начальный адрес</th>
                            <th className="text-center" scope="col">Конечный адрес</th>
                            <td className="text-center">
                                <Link className="btn btn-success mx-2"
                                      to="/addDHCP">Добавить протокол DHCP</Link>
                            </td>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            DHCPs.map((DHCPUses, index) => (
                                <tr>
                                    <th className="text-center" scope="row" key={index}>{index + 1}</th>
                                    <td className="text-center" >{DHCPUses.addressStart}</td>
                                    <td className="text-center" >{DHCPUses.addressEnd}</td>
                                    <td className="text-center" >
                                        <Link className="btn btn-outline-primary mx-2"
                                              to={`/editDHCP/${DHCPUses.idDhcpPool}`}>Обновить</Link>
                                        <button className="btn btn-danger mx-2"
                                                onClick={() => deleteS(DHCPUses.idDhcpPool)}>Удалить
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
