import React, { Component } from 'react';
import './Auth.css';
import {getUser} from "../../../action_creator/user_creator/user_creator";
import {connect} from "react-redux";

class FormAuth extends Component{
    constructor(user_inf) {
        super(user_inf);
        this.open_ok = this.open_ok.bind(this);
    }

    async open_ok (){
        let user_login = document.getElementById("login").value; //получить значение из поля по ид
        let user_pass = document.getElementById("password").value;
        await this.props.fetchData("http://localhost:8080/User/loginUser?user_login="+user_login+"&user_password="+user_pass);

        if (user_login === this.props.user_auth_info.user_login && user_pass === this.props.user_auth_info.user_password) {
            window.location.assign('http://localhost:3000/userpage');
        }
        else {
            alert("Не верный логин или пароль! Повторите ввод.");
        }
    }
    render()
    {
        return (
            <div>
                <h3 id="footerPage">Автоматизированная система учета изменений информационно-телекоммуникационной
                    системы</h3>
                <div id="app-form-auth">
                    <h3 id="headerForm">Авторизация</h3>
                    <div>
                        <span id="auth_log1">Логин: </span>
                        <input className="textAuth" type='text' name="textboxLogin" id="login"
                               placeholder="Логин"></input>
                        <br/>
                        <span id="auth_pass2">Пароль:</span>
                        <input className="textAuth" type='password' name="textboxPassword" id="password"
                               placeholder="Пароль"></input>
                    </div>
                    <div>
                        <input type="checkbox" name="multiVxod" id="multiVxod"/>
                        <span id="span_multy">Остаться в системе</span>
                    </div>
                    <div>
                        <button id='buttonVxod' name="buttonVxod" onClick={this.open_ok}>Войти</button>
                    </div>
                </div>
            </div>
        );
    }
}
const  mapStateToProps = state =>{
    return {
        user_auth_info: state.user_reduser.user_auth_info
    };
};

const  mapDispatchToProps = dispatch =>{
    return {
        fetchData: url => dispatch(getUser("auth",url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAuth);
