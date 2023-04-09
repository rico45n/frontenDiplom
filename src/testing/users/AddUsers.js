import React, {useState} from "react";
import axios from "axios";
import {Link, Route, useNavigate} from "react-router-dom";

export default function AddUsers() {


    const [user, setUser] = useState({
        lastName: "",
        firstName: "",
        middleName: "",
        email: "",
        phone: "",
        userLogin: "",
        userPassword: "",
        userRole: "",
    })
    const {lastName, firstName, middleName, email, phone, userLogin, userPassword, userRole} = user
    const onInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    };

    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/User/AddUser" , user)
        window.location.assign('http://localhost:3000/Users')
    }
    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Создание пользователя</h2>
                <form onSubmit={(e) => onSubmit(e)} >
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Фамилия
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите фамилию"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => onInputChange(e)}
                            required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            Имя
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите имя"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => onInputChange(e)}
                            required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="middleName" className="form-label">
                            Отчество
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите отчество"
                            name="middleName"
                            value={middleName}
                            onChange={(e) => onInputChange(e)}
                            required/>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите email"
                            name="email"
                            value={email}
                            onChange={(e) => onInputChange(e)}
                            />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Телефон
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите номер телефона"
                            name="phone"
                            value={phone}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userLogin" className="form-label">
                            Логин
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите логин"
                            name="userLogin"
                            value={userLogin}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userPassword" className="form-label">
                            Пароль
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Введите пароль"
                            name="userPassword"
                            value={userPassword}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userRole" className="form-label">
                            Роль
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Введите роль"
                            name="userRole"
                            value={userRole}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Добавить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/Users">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
}