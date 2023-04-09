import React, {Component, useEffect, useState} from 'react';
import PageFooter from '../../footer/PageFooter';
import {Link, useParams} from "react-router-dom";
import axios from "axios";


export default function Room() {
    const [rooms, setRoom] = useState([])

    const {idRoom} = useParams()

    const [user ,readUse] = useState([])

    useEffect(() => {
        loadRoom();
    }, []);

    const loadRoom = async () => {
        const result = await axios.get("http://localhost:8080/Room/RoomlAll")
        setRoom(result.data)
    }
    const readUs = async (idRoom) => {
        const result = await axios.get(`http://localhost:8080/Room/${idRoom}`)
        readUse(result.data)
    }

    const deleteRoom = async (id_room) => {
        await axios.delete(`http://localhost:8080/Room/DeleteRoom/${id_room}`)
        loadRoom()
        if (await readUs(id_room) !== null){
            alert("От этой комнаты зависят другие поля")
        }
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
                            <th className="text-center" scope="col">Наименование комнаты</th>
                            <th className="text-center" scope="col">Тип помещения</th>
                            <th className="text-center" scope="col">Комутационный центр</th>
                            <th className="text-center" scope="col">Ответственный</th>
                            <td className="text-center">
                                <Link className="btn btn-success mx-2"
                                      to="/addRoom">Добавить помещение</Link>
                            </td>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            rooms.map((room, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td className="text-center">{room.nameRoom}</td>
                                    <td className="text-center">{room.typeRoom}</td>
                                    <td className="text-center">{room.nameNodes}</td>
                                    <td className="text-center">{room.userOtv}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-outline-primary mx-2"
                                              to={`/editRoom/${room.idRoom}`}>Обновить</Link>
                                        <button className="btn btn-danger mx-2"
                                                onClick={() => deleteRoom(room.idRoom)}>Удалить
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