import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function AddCrosses() {


    const [crosse, setCrosses] = useState({
        idCrossesFirst: "",
        idCrossesEnd: "",
        shkaf: "",
        slot:"",
        port: "",
    })
    const {idCrossesFirst, idCrossesEnd, shkaf, slot, port} = crosse
    const onInputChange = (e) => {
        setCrosses({...crosse, [e.target.name]: e.target.value})
    };

    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/Crosses/CreateCrosses" , crosse)
        window.location.assign('http://localhost:3000/Crosses')
    }
    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Создание кроссировки</h2>
                <form onSubmit={(e) => onSubmit(e)} >
                    <div className="mb-3">
                        <label htmlFor="idCrossesFirst" className="form-label">
                            Начальная кроссировка
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите начальную кроссировку"
                            name="idCrossesFirst"
                            value={idCrossesFirst}
                            onChange={(e) => onInputChange(e)}
                            required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idCrossesEnd" className="form-label">
                            Последующая кроссировка
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите последующую кроссировку"
                            name="idCrossesEnd"
                            value={idCrossesEnd}
                            onChange={(e) => onInputChange(e)}
                            required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="shkaf" className="form-label">
                            Шкаф
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите шкаф"
                            name="shkaf"
                            value={shkaf}
                            onChange={(e) => onInputChange(e)}
                            required/>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="slot" className="form-label">
                            Слот
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите слот"
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
                            type="text"
                            className="form-control"
                            placeholder="Введите порт"
                            name="port"
                            value={port}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Добавить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/Crosses">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
}