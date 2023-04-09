import React, {Component, useEffect, useState} from 'react';
import PageFooter from '../../footer/PageFooter';

import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

export default function Crosses() {

    const [crosses, setCrosses] = useState([])

    const {crossesId} = useParams()


    useEffect(() => {
        loadCrosses()
    }, []);

    const loadCrosses = async () => {
        const result = await axios.get("http://localhost:8080/Crosses/")
        setCrosses(result.data)
    }

    const deleteCrosse = async (crosseId) => {
        await axios.delete(`http://localhost:8080/Crosses/DeleteCrosses/${crosseId}`)
        loadCrosses()
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
                            <th className="text-center" scope="col">Начальная кроссировка</th>
                            <th className="text-center" scope="col">Последующая кроссировка</th>
                            <th className="text-center" scope="col">Шкаф</th>
                            <th className="text-center" scope="col">Слот</th>
                            <th className="text-center" scope="col">Порт</th>
                            <td className="text-center">
                                <Link className="btn btn-success mx-2"
                                      to="/addCrosses">Добавить кроссировку</Link>
                            </td>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            crosses.map((cross, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td className="text-center" >{cross.idCrossesFirst}</td>
                                    <td className="text-center" >{cross.idCrossesEnd}</td>
                                    <td className="text-center" >{cross.shkaf}</td>
                                    <td className="text-center" >{cross.slot}</td>
                                    <td className="text-center" >{cross.port}</td>
                                    <td className="text-center" >
                                        <Link className="btn btn-outline-primary mx-2"
                                              to={`/editCrosse/${cross.idCrosses}`}>Обновить</Link>
                                        <button className="btn btn-danger mx-2"
                                                onClick={() => deleteCrosse(cross.idCrosses)}>Удалить
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