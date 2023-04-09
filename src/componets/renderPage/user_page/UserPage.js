import React, {Component} from 'react';
import PageFooter from '../../footer/PageFooter';
import "./user.css";
import {connect} from "react-redux";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import {Panel} from "primereact/panel";

class UserPage extends Component {
    render() {
        return (
            <div className="text-center">
                <div>
                    <PageFooter/>
                    <div className="container">
                        <div className="py-5">

                            <Card style={{width: '18rem'}}>
                                <Card.Img variant="top"
                                          src="https://cdn.dribbble.com/users/1787323/screenshots/6371250/lazy_programmer_dribbble-02.png"/>
                                <Card.Body>
                                    <div className="text-center">
                                        <Card.Title>{this.props.user_auth_info.fioUser}</Card.Title>
                                    </div>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Логин: {this.props.user_auth_info.userLogin}</ListGroup.Item>
                                    <ListGroup.Item>Номер телефона: {this.props.user_auth_info.phone}</ListGroup.Item>
                                    <ListGroup.Item>Почта: {this.props.user_auth_info.email}</ListGroup.Item>
                                    <ListGroup.Item>Роль: {this.props.user_auth_info.userRole}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <div className="text-center">
                                        <Card.Link href={`/editUser/${this.props.user_auth_info.userId}`}>Изменить
                                            данные</Card.Link>
                                    </div>
                                </Card.Body>
                            </Card>

                        </div>
                    </div>
                </div>
                <div className="card-body border-left">
                    <h5 className="card-title">Версия сайта 1.0</h5>
                    <h6 className="card-subtitle mb-2 text-muted">В данной версии реализован следущий функционал:</h6>
                    <p className="card-text">
                        - Добавление/просмотр пользователей
                    </p>
                    <p className="card-text">
                        - Ведение информации во всех разделах
                    </p>
                    <p className="card-text">
                        - Подсказки при заполнении таблиц
                    </p>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        user_auth_info: state.user_reduser.user_auth_info

    };
};

export default connect(mapStateToProps, null)(UserPage);
