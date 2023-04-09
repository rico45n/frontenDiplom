import 'bootstrap/dist/css/bootstrap.min.css';
import './pagef.css'
import React, {Component} from 'react';
import {NavDropdown, Navbar, Nav, Dropdown, DropdownButton, ButtonGroup} from 'react-bootstrap'
import {Link} from "react-router-dom";


class Jurnal extends Component {
    render() {
        return (
            // <NavDropdown title="Журналы">
            //     <NavDropdown.Item href="/NetworkJournal">Журнал ip-адресного пространста</NavDropdown.Item>
            //     <NavDropdown.Item href="/CrossesDevice">Журнал подключений телекоммуникационного
            //         оборудования</NavDropdown.Item>
            //     <NavDropdown.Item href="/ConfigurationDevices">Журнал изменений в конфигурации телекоммуникационного
            //         оборудования</NavDropdown.Item>
            // </NavDropdown>

        <div className="navbar navbar-expand-lg">
            <div className="container-fluid">
                {['Warning'].map(
                    (variant) => (
                        <DropdownButton
                            as={ButtonGroup}
                            key={variant}
                            id={`dropdown-variants-${variant}`}
                            variant={variant.toLowerCase()}
                            title="Журналы"
                        >
                            <Dropdown.Item href="/NetworkJournal">Журнал ip-адресного пространства</Dropdown.Item>
                            <Dropdown.Item href="/CrossesDevice">Журнал подключений телекоммуникационного
                                оборудования</Dropdown.Item>
                            <Dropdown.Item href="/ConfigurationDevices">Журнал изменений в конфигурации телекоммуникационного
                                оборудования</Dropdown.Item>
                        </DropdownButton>
                    ),
                )}
            </div>
        </div>



        );
    }
}

class Network extends Component {
    render() {
        return (

            <div className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    {['Warning'].map(
                        (variant) => (
                            <DropdownButton
                                as={ButtonGroup}
                                key={variant}
                                id={`dropdown-variants-${variant}`}
                                variant={variant.toLowerCase()}
                                title="Сеть"
                            >
                                <Dropdown.Item href="/NetworkPool">Пулы сети</Dropdown.Item>
                                <Dropdown.Item href="/Network">Сети</Dropdown.Item>
                                <Dropdown.Item href="/VLAN">VLAN</Dropdown.Item>
                                <Dropdown.Item href="/DHCP">DHCP пулы</Dropdown.Item>
                                <Dropdown.Item href="/Nodes">Коммутационные центры</Dropdown.Item>
                            </DropdownButton>
                        ),
                    )}
                </div>
            </div>



        );
    }
}

class Device extends Component {
    render() {
        return (

            <div className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    {['Warning'].map(
                        (variant) => (
                            <DropdownButton
                                as={ButtonGroup}
                                key={variant}
                                id={`dropdown-variants-${variant}`}
                                variant={variant.toLowerCase()}
                                title="Устройства"
                            >
                                <Dropdown.Item href="/Devices">Устройства организации</Dropdown.Item>
                                <Dropdown.Item href="/TypeDevices">Справочник типов устройств</Dropdown.Item>
                            </DropdownButton>
                        ),
                    )}
                </div>
            </div>

        );
    }
}

class Users extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-primary , navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button"/>
                    <Link className="btn btn-outline-light" to="/Users">Пользователи</Link>
                </div>
            </nav>
        );
    }
}

class Crosses extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-primary , navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button"/>
                    <Link className="btn btn-outline-light" to="/Crosses">Кроссировки</Link>
                </div>
            </nav>
        );
    }
}

class Rooms extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-primary , navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button"/>
                    <Link className="btn btn-outline-light" to="/Rooms">Помещения</Link>
                </div>
            </nav>
        );
    }
}

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeser: (new Date()).toLocaleString()
        }
        this.datetime()
    }

    datetime() {
        setInterval(() => {
            this.setState({timeser: (new Date()).toLocaleString()});
        }, 1000)
    }

    render() {
        return (
            <div>
                {this.state.timeser}
            </div>
        );
    }
}

class ElementFooter extends Component {

    render() {
        return (

            <Navbar className="navbar navbar-expand-lg bg-primary , navbar-dark">
                <Nav className="mr-auto">
                    <div className="container-fluid">
                        <Jurnal></Jurnal>
                        <Network></Network>
                        <Device></Device>
                        <Crosses></Crosses>
                        <Rooms></Rooms>
                        <Users></Users>
                    </div>
                </Nav>


                <nav className="navbar navbar-expand-lg bg-primary , navbar-dark">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button"/>
                        <Link className="btn btn-outline-light" to="/userpage">На главную
                            <Clock></Clock>
                        </Link>
                        <Link className="btn btn-danger mx-2" to="/auth">Выход
                        </Link>
                    </div>
                </nav>
            </Navbar>
        );
    }
}

export default class PageFut extends Component {
    render() {
        return (
            <div><ElementFooter/>
            </div>
        );
    }
}
