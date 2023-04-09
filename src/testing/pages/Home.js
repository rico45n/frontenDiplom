import React, {useEffect, useState} from "react";
import axios from "axios"
import {Link, useParams} from "react-router-dom";
import PageFooter from "../../componets/footer/PageFooter";

export default function Home() {

    const [users, setUsers] = useState([])

    const {userId} = useParams()

    const [user ,readUse] = useState([])

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/User/AllUser")
        setUsers(result.data)
    }

    const readUs = async (userId)=>{
        const result = await axios.get(`http://localhost:8080/User/${userId}`)
        readUse(result.data)
    }


    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:8080/User/DeleteUser/${userId}`)
        loadUsers()
        if (await readUs(userId) !== null){
            alert("От пользователя зависят другие поля")
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
                            <th scope="col">#</th>
                            <th scope="col">Фамилия</th>
                            <th scope="col">Имя</th>
                            <th scope="col">Отчество</th>
                            <th scope="col">Телефон</th>
                            <th scope="col">Логин</th>
                            <th scope="col">Почта</th>
                            <th scope="col">Роль</th>
                            <td>
                                <Link className="btn btn-success mx-2"
                                      to="/addUser">Добавить пользователя</Link>
                            </td>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{user.lastName}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.middleName}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.userLogin}</td>
                                    <td>{user.email}</td>
                                    <td>{user.userRole}</td>
                                    <td>
                                        <Link className="btn btn-outline-primary mx-2"
                                              to={`/editUser/${user.userId}`}>Обновить</Link>
                                        <button className="btn btn-danger mx-2"
                                                onClick={() => deleteUser(user.userId)}>Удалить
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