import React, {Component} from 'react';
import './Auth.css';
import {getUser} from "../../../action_creator/user_creator/user_creator";
import {connect} from "react-redux";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';

class FormAuth extends Component {
    constructor(user_inf) {
        super(user_inf);
        this.open_ok = this.open_ok.bind(this);
    }


    async open_ok() {

        let userLogin = document.getElementById("formControlLg").value; //получить значение из поля по ид
        let userPass = document.getElementById("password").value;

        await this.props.fetchData("http://localhost:8080/User/loginUser?userLogin=" + userLogin + "&userPassword=" + userPass);

        let userLoginJs = this.props.user_auth_info.userLogin
        let userPassJs = this.props.user_auth_info.userPassword

        if (userLogin === userLoginJs && userPass === userPassJs) {
            window.location.assign('http://localhost:3000/userpage');
        } else {
            alert("Не верный логин или пароль! Повторите ввод.");
        }

    }

    render() {
        return (
            <div className="avtorizaria">
                <h3 id="footerPage">Автоматизированная система учета изменений информационно-телекоммуникационной
                    системы</h3>
                <MDBContainer fluid className="p-3 my-5">
                    <MDBRow>
                        <MDBCol col='10' md='6'>
                            <img alt="logo"
                                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                 className="img-fluid" alt="Phone image"/>
                        </MDBCol>
                        <MDBCol className="mainAut" col='4' md='6'>
                            <MDBInput wrapperClass='mb-4' label='Логин' id='formControlLg' type='login' size="lg"/>
                            <MDBInput wrapperClass='mb-4' label='Пароль' id='password' type='password' size="lg"/>
                            <div className="d-flex justify-content-between mx-4 mb-4">
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Запомнить меня'/>
                            </div>
                            <button className="mb-4 w-100" size="lg" onClick={this.open_ok}>Войти</button>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user_auth_info: state.user_reduser.user_auth_info
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(getUser("auth", url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAuth);
