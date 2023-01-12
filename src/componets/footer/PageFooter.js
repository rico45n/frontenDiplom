import 'bootstrap/dist/css/bootstrap.min.css';
import './pagef.css'
import React, { Component } from 'react';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap'

class Jurnal extends Component {
    render() {
        return (
            <NavDropdown title="Журналы">
                <NavDropdown.Item href="/NetworkJournal">Журнал ip-адресного пространста</NavDropdown.Item>
                <NavDropdown.Item href="/CrossesDevice">Журнал подключений телекоммуникационного оборудования</NavDropdown.Item>
                <NavDropdown.Item href="/ConfigurationDevices">Журнал изменений в конфигурации телекоммуникационного оборудования</NavDropdown.Item>
            </NavDropdown>
        );
    }
}

class Network extends Component {
    render() {
        return (
            <NavDropdown title="Сеть">
                <NavDropdown.Item href="/AnalysisIP">Анализ ip - адресного пространства</NavDropdown.Item>
                <NavDropdown.Item href="/NetworkPool">Пулы сети</NavDropdown.Item>
                <NavDropdown.Item href="/Network">Сети</NavDropdown.Item>
                <NavDropdown.Item href="/VLAN">VLAN</NavDropdown.Item>
                <NavDropdown.Item href="/DHCP">DHCP пулы</NavDropdown.Item>
                <NavDropdown.Item href="/Nodes">Коммутационные центры</NavDropdown.Item>
            </NavDropdown>
        );
    }
}

class Device extends Component {
    render() {
        return (
            <NavDropdown title="Устройства">
                <NavDropdown.Item href="/Devices">Устройства организации</NavDropdown.Item>
                <NavDropdown.Item href="/TypeDevices">Справочник типов устройств</NavDropdown.Item>
            </NavDropdown>
        );
    }
}
class Topologi extends Component {
    render() {
        return (
            <Nav.Link href="/Topologi">Топология сети</Nav.Link>
        );
    }
}

class Users extends Component {
    render() {
        return (
            <Nav.Link href="/Users"> Пользователи </Nav.Link>
        );
    }
}

class Crosses extends Component {
    render() {
        return (
            <Nav.Link href="/Crosses"> Кроссировки </Nav.Link>
        );
    }
}

class Rooms extends Component {
    render() {
        return (
            <Nav.Link href="/Rooms"> Помещения </Nav.Link>
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
    datetime () {
        setInterval(() => {
            this.setState({ timeser: (new Date()).toLocaleString()});     
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
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Jurnal></Jurnal>
                    <Network></Network>
                    <Device></Device>
                    <Crosses></Crosses>
                    <Topologi></Topologi>
                    <Rooms></Rooms>
                    <Users></Users>
                </Nav>
                <Nav>
                    <Nav.Link href="/userpage">На главную
                    <Clock></Clock>
                    </Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default class PageFut extends Component {
    render() {
        return (
            <div><ElementFooter />
            </div>
        );
    }
}
