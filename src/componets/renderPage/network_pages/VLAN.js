import React, { Component } from 'react';
import PageFooter from '../../footer/PageFooter';
import {connect} from "react-redux";
import {
    addNewLine,
    getAllVlan,
    setVlan,
    updateVlan
} from "../../../action_creator/network_creator/vlan_creator";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Panel} from "primereact/panel";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {setStatusShowDialog} from "../../../action_creator/action_users_creator";
import {getStatusSelect} from "../../../action_creator/status_creator";

class VLAN extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchAllVLAN("http://localhost:8080/Vlan/VlanAll");
    }

    vlan_table (){
        return <DataTable value={this.props.vlan_info} responsive={true} scrollable={true}>

            <Column field="vlan_name" header="Наименование VLAN" autoLayout={true}
                    style={{ textAlign: 'center' }} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_vlan) {
                            return <div>
                            <span className="p-float-label">
                                <InputText id="update_vlan_name" defaultValue={value.vlan_name} style={{ textAlign: 'center' }} />
                            </span>
                            </div>
                        }
                        else {
                            return <div>
                                {value.vlan_name}
                            </div>
                        }
                    }}></Column>

            <Column field="vlan_number" header="Номер VLAN" autoLayout={true}
                    style={{ textAlign: 'center' }} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_vlan) {
                            return <div>
                            <span className="p-float-label">
                                <InputText id="update_vlan_number" defaultValue={value.vlan_number} style={{ textAlign: 'center' }} />
                            </span>
                            </div>
                        }
                        else {
                            return <div>
                                {value.vlan_number}
                            </div>
                        }
                    }}></Column>

            <Column field="is_status" header="Статус" autoLayout={true}
                    style={{ textAlign: 'center', width: "100px" }} sortable={true} filter={true} filterPlaceholder={"Активна/Удалена"} filterField={"Активна"} filterMatchMode="contains"
                    body={(value) => {
                        return <div>
                            {value.is_status.name_status}
                        </div>
                    }}></Column>

            <Column style={{ width: '6%' }} field="id_pool_address" header="Действие" body={(value) => {
                if (value.id_vlan !== -1) {
                    return <div><center>
                        <Button className="p-button-warning p-button-rounded" icon='pi pi-fw pi-pencil' onClick={() => {
                            if (this.props.updateVisible.visible === true) {
                                let firstVlan = {
                                    id_vlan: value.id_vlan,
                                    vlan_name: value.vlan_name,
                                    vlan_number: value.vlan_number,
                                    is_status: {
                                        id_status: value.is_status.id_status,
                                        name_status: value.is_status.name_status
                                    }
                                };

                                let lastVlan = {
                                    id_vlan: value.id_vlan,
                                    vlan_name: document.getElementById("update_vlan_name").value,
                                    vlan_number: document.getElementById("update_vlan_number").value,
                                    is_status: {
                                        id_status: value.is_status.id_status,
                                        name_status: value.is_status.name_status
                                    }
                                };

                                if (JSON.stringify(firstVlan) === JSON.stringify(lastVlan)) {
                                    alert("Информация не изменилась!");
                                    this.props.visibleUpdate(false, null);
                                } else {
                                    this.props.visibleUpdate(false, null);
                                    this.props.updateVlan("http://localhost:8080/Vlan/UpdateVlan/", Number(value.id_vlan), lastVlan);
                                }
                            }
                            else {
                                this.props.visibleUpdate(true, value.id_vlan);

                            }
                        }}></Button>
                        <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-trash' onClick={() => {
                            if (window.confirm("Вы уверены, что хотите удалить запись?")) {
                                let deleteVlan = {
                                    id_vlan: value.id_vlan,
                                    vlan_name: value.vlan_name,
                                    vlan_number: value.vlan_number,
                                    is_status: {
                                        id_status: value.is_status.id_status,
                                        name_status: value.is_status.name_status
                                    }
                                };
                                this.props.deleteVlan("http://localhost:8080/Vlan/DeleteVlan/", value.id_vlan, deleteVlan);
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
                            const createVlan = {
                                id_vlan: 0,
                                vlan_name: document.getElementById("update_vlan_name").value,
                                vlan_number: document.getElementById("update_vlan_number").value,
                                is_status: {
                                    id_status: 1,
                                    name_status: null
                                }
                            };
                            console.log(createVlan);
                            this.props.setVlan("http://localhost:8080/Vlan/CreateVlan", createVlan);
                            this.props.visibleUpdate(false, null);
                        }
                        else {
                            this.props.visibleUpdate(true, value.id_vlan);
                        }
                    }}></Button> <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-minus' onClick={() => {
                            this.props.deleteNewLine(this.props.vlan_info);
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
                this.props.addNewLine(this.props.vlan_info);
                this.props.visibleUpdate(true, -1);
            }
        }}></Button>
    }
    render() {
        return (
            <div>
                <PageFooter />
                <Panel header="VLAN" />
                    {this.vlan_table(this)}
                    <div align={'right'}>
                        {this.addNewLine(this)}
                    </div>
            </div>
        );
    }
}
const  mapStateToProps  = state => {
    return {
        vlan_info: state.vlan_reduser.vlan_info,
        updateVisible: state.action_visible.updateVisible,
        selectStatus: state.status_reduser.selectStatus,
        user_auth_info: state.user_reduser.user_auth_info
    };
};
const  mapDispatchToProps = dispatch =>{
    return {
        fetchAllVLAN: url => dispatch(getAllVlan("all",url)),
        updateVlan: (url, id, data) => dispatch(updateVlan("all",url, id, data)),
        deleteVlan: (url, id, data) => dispatch(updateVlan("all",url, id, data)),
        setVlan:(url, data) => dispatch(setVlan("all", url, data)),
        visibleUpdate: (status, id) => dispatch(setStatusShowDialog("updateVisible", status, id)),
        StatusUpdateValue: (data) => dispatch(getStatusSelect("selectStatusValue", data)),
        addNewLine: (data) => dispatch(addNewLine("addNewLine", data)),
        deleteNewLine: (data) => dispatch(addNewLine("deleteNewLine", data))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(VLAN)