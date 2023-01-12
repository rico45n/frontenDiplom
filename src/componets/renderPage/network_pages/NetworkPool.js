import React, { Component } from 'react';
import PageFooter from '../../footer/PageFooter';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';

import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {connect} from "react-redux";
import {
    getAllNetworkPool,
    setNetworkPool,
    updateNetworkPool
} from "../../../action_creator/network_creator/network_pool_creator";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {setStatusShowDialog} from "../../../action_creator/action_users_creator";
import {getStatusSelect} from "../../../action_creator/status_creator";
import {InputTextarea} from "primereact/inputtextarea";
import {addNewLine} from "../../../action_creator/network_creator/pool_creator";

class NetworkPool extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchAllNetworkPool("http://localhost:8080/Pool/PoolAll");
        this.props.visibleUpdate(false, null);
    }
    tableNetworkPool(){
        return <DataTable value={this.props.network_pool} responsive={true} scrollable={true}>

            <Column field="name_pool" header="Начальный адрес" autoLayout={true}
                    style={{ textAlign: 'center' }} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_pool_address) {
                            return <div>
                            <span className="p-float-label">
                                <InputTextarea autoResize={true} id="update_name_pool" defaultValue={value.name_pool} style={{ textAlign: 'center' }} />
                            </span>
                            </div>
                        }
                        else {
                            return <div>
                                {value.name_pool}
                            </div>
                        }
                    }}></Column>

            <Column field="ip_addres_end" header="Начальный адрес" autoLayout={true}
                    style={{ textAlign: 'center' }} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_pool_address) {
                            return <div>
                            <span className="p-float-label">
                                <InputText id="update_ip_addres_start" defaultValue={value.ip_addres_start} style={{ textAlign: 'center' }} />
                            </span>
                            </div>
                        }
                        else {
                            return <div>
                                {value.ip_addres_start}
                            </div>
                        }
                    }}></Column>

            <Column field="ip_addres_end" header="Конечный адрес" autoLayout={true}
                    style={{ textAlign: 'center' }} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_pool_address) {
                            return <div>
                            <span className="p-float-label">
                                <InputText id="update_ip_addres_end" defaultValue={value.ip_addres_end} style={{ textAlign: 'center' }} />
                            </span>
                            </div>
                        }
                        else {
                            return <div>
                                {value.ip_addres_end}
                            </div>
                        }
                    }}></Column>

            <Column field="user_reg" header="Пользователь создавший запись" autoLayout={true}
                    style={{ textAlign: 'center' }} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        return <div>
                            {value.user_reg}
                        </div>
                    }}></Column>

            <Column field="date_reg" header="Дата регистрации" autoLayout={true}
                    style={{ textAlign: 'center' }} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        return <div>
                            {value.date_reg}
                        </div>
                    }}></Column>

            <Column field="user_old" header="Пользователь изменивший запись" autoLayout={true}
                    style={{ textAlign: 'center', size: 'auto' }} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (value.id_user_old === 0) {
                            return <div>
                            </div>
                        } else {
                            return <div>
                                {value.user_old}
                            </div>
                        }
                    }}></Column>

            <Column field="date_old" header="Дата изменения" autoLayout={true}
                    style={{ textAlign: 'center' }} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        return <div>
                            {value.date_old}
                        </div>
                    }}></Column>

            <Column field="name_status" header="Статус" autoLayout={true}
                    style={{ textAlign: 'center', width: "100px" }} sortable={true} filter={true} filterPlaceholder={"Активна/Удалена"} filterField={"Активна"} filterMatchMode="contains"
                    body={(value) => {
                        return <div>
                            {value.name_status}
                        </div>

                    }}></Column>

            <Column style={{ width: '6%' }} field="id_pool_address" header="Действие" body={(value) => {
                if (value.id_pool_address !== -1) {
                    return <div><center>
                        <Button className="p-button-warning p-button-rounded" icon='pi pi-fw pi-pencil' onClick={() => {
                            if (this.props.updateVisible.visible === true) {
                                let firstNetworkPoll = {
                                    id_pool_address: value.id_pool_address,
                                    name_pool: value.name_pool,
                                    ip_addres_start: value.ip_addres_start,
                                    ip_addres_end: value.ip_addres_end,
                                    date_reg: value.date_reg,
                                    date_old: null,
                                    user_old: null,
                                    id_user_old: this.props.user_auth_info.user_id,
                                    user_reg: null,
                                    id_user_reg: 0,
                                    id_status: 2,
                                    name_status: null
                                };

                                let lastNetworkPool = {
                                    id_pool_address: value.id_pool_address,
                                    name_pool: document.getElementById("update_name_pool").value,
                                    ip_addres_start: document.getElementById("update_ip_addres_start").value,
                                    ip_addres_end: document.getElementById("update_ip_addres_end").value,
                                    date_reg: value.date_reg,
                                    date_old: null,
                                    user_old: null,
                                    id_user_old: this.props.user_auth_info.user_id,
                                    user_reg: null,
                                    id_user_reg: 0,
                                    id_status: 2,
                                    name_status: null
                                };

                                if (JSON.stringify(firstNetworkPoll) === JSON.stringify(lastNetworkPool)) {
                                    alert("Информация не изменилась!");
                                    this.props.visibleUpdate(false, null);
                                } else {
                                    this.props.visibleUpdate(false, null);
                                    this.props.updateNetworkPool("http://localhost:8080/Pool/UpdatePool/", Number(value.id_pool_address), lastNetworkPool);
                                }
                            }
                            else {
                                this.props.visibleUpdate(true, value.id_pool_address);

                            }
                        }}></Button>
                        <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-trash' onClick={() => {
                            if (window.confirm("Вы уверены, что хотите удалить запись?")) {
                                let deleteNetworkPool = {
                                    id_pool_address: value.id_pool_address,
                                    name_pool: value.name_pool,
                                    ip_addres_start: value.ip_addres_start,
                                    ip_addres_end: value.ip_addres_end,
                                    date_reg: value.date_reg,
                                    date_old: null,
                                    user_old: null,
                                    id_user_old: this.props.user_auth_info.user_id,
                                    user_reg: null,
                                    id_user_reg: 0,
                                    id_status: 2,
                                    name_status: null
                                };
                                this.props.deleteNetworkPool("http://localhost:8080/Pool/DeletePool/", value.id_pool_address, deleteNetworkPool);
                            }
                            else {
                            }
                        }}>
                        </Button>
                    </center>
                    </div>
                }
                else {
                    return <div><center><Button className="p-button-success p-button-rounded" icon='pi pi-fw pi-plus' onClick={() => {
                        if (this.props.updateVisible.visible === true) {
                            const createNetworkPool = {
                                id_pool_address: value.id_pool_address,
                                name_pool: document.getElementById("update_name_pool").value,
                                ip_addres_start: document.getElementById("update_ip_addres_start").value,
                                ip_addres_end: document.getElementById("update_ip_addres_end").value,
                                date_reg: value.date_reg,
                                date_old: null,
                                user_old: null,
                                id_user_old: 0,
                                user_reg: null,
                                id_user_reg: this.props.user_auth_info.user_id,
                                id_status: 2,
                                name_status: null
                            };
                            console.log(createNetworkPool);
                            this.props.setNetworkPool("http://localhost:8080/Pool/CreatePool", createNetworkPool);
                            this.props.visibleUpdate(false, null);
                        }
                        else {
                            this.props.visibleUpdate(true, value.id_pool_address);
                        }
                    }}></Button> <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-minus' onClick={() => {
                            this.props.deleteNewLine(this.props.network_pool);
                            this.props.visibleUpdate(false, null);
                        }}>
                        </Button>
                    </center>
                    </div>
                }
            }}></Column>
        </DataTable>
    }

    addNewLine() {
        return <Button style={{ width: '6%' }} label={"Добавить"} className="p-button-secondary p-button-severities" icon='pi pi-fw pi-plus' onClick={() => {
            if (this.props.updateVisible.str === -1) {
                this.props.visibleUpdate(true, false);
            }
            else {
                this.props.addNewLine(this.props.network_pool);
                this.props.visibleUpdate(true, -1);
            }
        }}></Button>
    }

    render() {
        return (
            <div><PageFooter/>
                <Panel header="Выделенные пулы сети" />
                    {this.tableNetworkPool(this)}
                <div align={'right'}>
                    {this.addNewLine(this)}
                </div>
            </div>
        );
    }
}
const  mapStateToProps  = state => {
    return {
        network_pool: state.networ_pool_reduser.network_pool,
        selectUserValue: state.user_reduser.selectUserValue,
        user_auth_info: state.user_reduser.user_auth_info,
        updateVisible: state.action_visible.updateVisible,
        selectStatus: state.status_reduser.selectStatus
    };
};
const  mapDispatchToProps = dispatch =>{
    return {
        fetchAllNetworkPool: url => dispatch(getAllNetworkPool("all",url)),
        visibleUpdate: (status, id) => dispatch(setStatusShowDialog("updateVisible", status, id)),
        StatusUpdateValue: (data) => dispatch(getStatusSelect("selectStatusValue", data)),
        updateNetworkPool: (url, id, data) => dispatch(updateNetworkPool("all",url, id, data)),
        deleteNetworkPool: (url, id, data) => dispatch(updateNetworkPool("all",url, id, data)),
        addNewLine: (data) => dispatch(addNewLine("addNewLine", data)),
        deleteNewLine: (data) => dispatch(addNewLine("deleteNewLine", data)),
        setNetworkPool: (url, data) => dispatch(setNetworkPool("all", url, data))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(NetworkPool)