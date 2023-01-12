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
    addNewLine,
    deleteDHCP,
    getAllDHCP,
    setDHCP,
    updateDHCP
} from "../../../action_creator/network_creator/DHCP_creator";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {setStatusShowDialog} from "../../../action_creator/action_users_creator";
import {getStatusSelect} from "../../../action_creator/status_creator";

class DHCP extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchAllDhcp("http://localhost:8080/DHCP/DHCPAll");
    }

    dhcp_table(){
        return <DataTable value= {this.props.dhcp_info}  responsive={true} scrollable={true}>
            <Column field="address_start" header="Начальный адрес" autoLayout = {true}
                    style={{textAlign:'center', width: '160px'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_DHCP_pool)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_address_start" defaultValue={value.address_start} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                <label>{value.address_start}</label>
                            </div>
                        }
                    }}></Column>
            <Column field="address_end" header="Конечный адрес" autoLayout = {true}
                    style={{textAlign:'center', width: '160px'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_DHCP_pool)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_address_end" defaultValue={value.address_end} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                <label>{value.address_end}</label>
                            </div>
                        }
                    }}></Column>
            <Column field="is_status" header="Статус"
                    style={{textAlign:'center', width: '60px'}} sortable={true} filter={true} filterPlaceholder={"Активна/Удалена"} filterField = {"Активна"} filterMatchMode="contains"
                    body={(value) => {
                            return <div>
                                {value.is_status.name_status}
                            </div>
                    }}></Column>

            <Column style={{ width: '60px' }} field="id_pool_address" header="Действие" body={(value) => {
                if (value.id_DHCP_pool !== -1) {
                    return <div><center>
                        <Button className="p-button-warning p-button-rounded" icon='pi pi-fw pi-pencil' onClick={() => {
                            if (this.props.updateVisible.visible === true) {
                                let firstDHCP= {
                                    id_DHCP_pool: value.id_DHCP_pool,
                                    address_start: value.address_start,
                                    address_end: value.address_end,
                                    is_status: {
                                        id_status: value.is_status.id_status,
                                        name_status: value.is_status.name_status
                                    }
                                };

                                let lastDHCP = {
                                    id_DHCP_pool: value.id_DHCP_pool,
                                    address_start: document.getElementById("update_address_start").value,
                                    address_end: document.getElementById("update_address_end").value,
                                    is_status: {
                                        id_status: value.is_status.id_status,
                                        name_status: value.is_status.name_status
                                    }
                                };

                                if (JSON.stringify(firstDHCP) === JSON.stringify(lastDHCP)) {
                                    alert("Информация не изменилась!");
                                    this.props.visibleUpdate(false, null);
                                } else {
                                    this.props.visibleUpdate(false, null);
                                    this.props.updateDHCP("http://localhost:8080/DHCP/UpdateDHCP/", Number(value.id_DHCP_pool), lastDHCP);
                                }
                            }
                            else {
                                this.props.visibleUpdate(true, value.id_vlan);

                            }
                        }}></Button>
                        <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-trash' onClick={() => {
                            if (window.confirm("Вы уверены, что хотите удалить запись?")) {
                                this.props.deleteDHCP("http://localhost:8080/DHCP/DeleteDHCP/", value.id_DHCP_pool);
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
                            const createDHCP = {
                                id_DHCP_pool: -2,
                                address_start: document.getElementById("update_address_start").value,
                                address_end: document.getElementById("update_address_end").value,
                                is_status: {
                                    id_status: 1,
                                    name_status: null
                                }
                            };
                            this.props.setDHCP("http://localhost:8080/DHCP/CreateDHCP", createDHCP);
                            this.props.visibleUpdate(false, null);
                        }
                        else {
                            this.props.visibleUpdate(true, value.id_dhcp_pool);
                        }
                    }}></Button> <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-minus' onClick={() => {
                            this.props.deleteNewLine(this.props.dhcp_info);
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
        return <Button style={{ width: '13.5%' }} label={"Добавить"} className="p-button-secondary p-button-severities" icon='pi pi-fw pi-plus' onClick={() => {
            if (this.props.updateVisible.str === -1) {
                this.props.visibleUpdate(true, false);
            }
            else {
                this.props.addNewLine(this.props.dhcp_info);
                this.props.visibleUpdate(true, -1);
            }
        }}></Button>
    }
    render() {
        return (
            <div><PageFooter/>
                <Panel header="Выделенные DHCP пулы сети"/>
                    {this.dhcp_table(this)}
                <div align={'right'}>
                    {this.addNewLine(this)}
                </div>
                
            </div>
        );
    }
}
const  mapStateToProps  = state => {
    return {
        dhcp_info: state.dhcp_reduser.dhcp_info,
        updateVisible: state.action_visible.updateVisible,
        selectStatus: state.status_reduser.selectStatus,
        status_action: state.status_reduser.status_action
    };
};
const  mapDispatchToProps = dispatch =>{
    return {
        fetchAllDhcp: url => dispatch(getAllDHCP("all",url)),
        visibleUpdate: (status,id) => dispatch(setStatusShowDialog("updateVisible",status,id)),
        StatusUpdateValue: (data) => dispatch(getStatusSelect("selectStatusValue", data)),
        updateDHCP: (url, id, data) => dispatch(updateDHCP("all",url, id, data)),
        deleteDHCP: (url, id, data) => dispatch(deleteDHCP("all",url, id)),
        setDHCP:(url, data) => dispatch(setDHCP("all", url, data)),
        addNewLine: (data) => dispatch(addNewLine("addNewLine", data)),
        deleteNewLine: (data) => dispatch(addNewLine("deleteNewLine", data))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(DHCP)