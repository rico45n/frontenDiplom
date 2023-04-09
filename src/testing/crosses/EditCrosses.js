import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, Route, useParams} from "react-router-dom";

export default function EditCrosses() {
    const {id}=useParams()

    const [crosses, setCrosses] = useState({
        idCrossesFirst: "",
        idCrossesEnd: "",
        shkaf: "",
        slot: "",
        port: "",

    })
    const {idCrossesFirst, idCrossesEnd, shkaf, slot, port} = crosses

    const onInputChange = (e) => {
        setCrosses({...crosses, [e.target.name]: e.target.value})
    };

    useEffect(()=>{
        loadCrosses()
    },[])


    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/Crosses/UpdateCrosses/${id}` , crosses)
        window.location.assign('http://localhost:3000/Crosses')
    }

    const loadCrosses = async () =>{
        const result = await axios.get(`http://localhost:8080/Crosses/${id}`)
        setCrosses(result.data)
    }

    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Обновить данные кроссировки</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="idCrossesFirst" className="form-label">
                            Начальная кроссировка
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="idCrossesFirst"
                            value={idCrossesFirst}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="idCrossesEnd" className="form-label">
                            Последующая кроссировка
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="idCrossesEnd"
                            value={idCrossesEnd}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="shkaf" className="form-label">
                            Шкаф
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="shkaf"
                            value={shkaf}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="slot" className="form-label">
                            Слот
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="slot"
                            value={slot}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="port" className="form-label">
                            Порт
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="port"
                            value={port}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-primary">Обновить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/Crosses">Отмена</Link>
                </form>
            </div>
        </div>
    </div>
}