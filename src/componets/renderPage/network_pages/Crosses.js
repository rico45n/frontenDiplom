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
    deleteCrosses,
    getAllCrosses,
    setCrosses,
    updateCrosses,
    addNewLine
} from "../../../action_creator/network_creator/crosses_creator";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {setStatusShowDialog} from "../../../action_creator/action_users_creator";

class Crosses extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchAllCrosses("http://localhost:8080/Crosses/CrossesAll");
    }

    crosses_table() {
        return <DataTable value={this.props.crosses_info} responsive={true} scrollable={true}>
            <Column field="id_crosses_first" header="Начальная кроссировка" autoLayout={true}
                    style={{textAlign: 'center', size: 'auto'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_crosses) {
                            return <div>
                                <span className="p-float-label">
                                    <InputText id="update_id_crosses_first" defaultValue={value.id_crosses_first}
                                               style={{textAlign: 'center'}}/>
                                </span>
                            </div>
                        } else {
                            return <div>
                                {value.id_crosses_first}
                            </div>
                        }
                    }}></Column>

            <Column field="id_crosses_end" header="Последующая кроссировка" autoLayout={true}
                    style={{textAlign: 'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_crosses) {
                            return <div>
                                <span className="p-float-label">
                                    <InputText id="update_id_crosses_end" defaultValue={value.id_crosses_end}
                                               style={{textAlign: 'center'}}/>
                                </span>
                            </div>
                        } else {
                            return <div>
                                {value.id_crosses_end}
                            </div>
                        }
                    }}></Column>

            <Column field="shkaf" header="Шкаф" autoLayout={true}
                    style={{textAlign: 'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_crosses) {
                            return <div>
                                <span className="p-float-label">
                                    <InputText id="update_shkaf" defaultValue={value.shkaf}
                                               style={{textAlign: 'center'}}/>
                                </span>
                            </div>
                        } else {
                            return <div>
                                {value.shkaf}
                            </div>
                        }
                    }}></Column>

            <Column field="slot" header="Слот подключения" autoLayout={true}
                    style={{textAlign: 'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_crosses) {
                            return <div>
                                <span className="p-float-label">
                                    <InputText id="update_slot" defaultValue={value.slot}
                                               style={{textAlign: 'center'}}/>
                                </span>
                            </div>
                        } else {
                            return <div>
                                {value.slot}
                            </div>
                        }
                    }}></Column>

            <Column field="port" header="Порт подключения" autoLayout={true}
                    style={{textAlign: 'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_crosses) {
                            return <div>
                                <span className="p-float-label">
                                    <InputText id="update_port" defaultValue={value.port}
                                               style={{textAlign: 'center'}}/>
                                </span>
                            </div>
                        } else {
                            return <div>
                                {value.port}
                            </div>
                        }
                    }}></Column>


            <Column style={{width: '6%'}} field="id_devices" header="Действие" body={(value) => {
                if (value.id_crosses !== -1) {
                    return <div><center>
                        <Button className="p-button-warning p-button-rounded" icon='pi pi-fw pi-pencil' onClick={() => {
                            if (this.props.updateVisible.visible === true) {
                                const updateCrosses = {
                                    id_crosses: value.id_crosses,
                                    id_crosses_end: document.getElementById("update_id_crosses_end").value,
                                    id_crosses_first: document.getElementById("update_id_crosses_first").value,
                                    port: document.getElementById("update_port").value,
                                    shkaf: document.getElementById("update_shkaf").value,
                                    slot: document.getElementById("update_slot").value
                                };
                                this.props.updateCrosses("http://localhost:8080/Crosses/UpdateCrosses/", Number(value.id_crosses), updateCrosses)
                                this.props.visibleUpdate(false, null);
                            } else {
                                this.props.visibleUpdate(true, value.id_crosses);
                            }
                        }}></Button>
                        <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-trash' onClick={() => {
                            if (window.confirm("Вы уверены, что хотите удалить запись?")) {
                                this.props.deleteCrosses("http://localhost:8080/Crosses/DeleteCrosses/", value.id_crosses);
                            } else {
                            }
                        }}>
                        </Button>
                    </center>
                    </div>
                } else {
                    return <div><center><Button className="p-button-success p-button-rounded" icon='pi pi-fw pi-plus'
                                   onClick={() => {
                                       if (this.props.updateVisible.visible === true) {
                                           const createCrosses = {
                                               id_crosses: 0,
                                               id_crosses_end: document.getElementById("update_id_crosses_end").value,
                                               id_crosses_first: document.getElementById("update_id_crosses_first").value,
                                               port: document.getElementById("update_port").value,
                                               shkaf: document.getElementById("update_shkaf").value,
                                               slot: document.getElementById("update_slot").value
                                           };
                                           this.props.setCrosses("http://localhost:8080/Crosses/CreateCrosses", createCrosses);
                                           this.props.visibleUpdate(false, null);
                                       } else {
                                           this.props.visibleUpdate(true, value.id_crosses);
                                       }
                                   }}></Button> <span> </span>
                    <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-minus' onClick={() => {
                        this.props.deleteNewLine(this.props.crosses_info);
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
                this.props.addNewLine(this.props.crosses_info);
                this.props.visibleUpdate(true, -1);
            }
        }}></Button>
    }

    render() {
        return (
            <div><PageFooter/>
                <Panel header="Кроссировки" />
                    {this.crosses_table(this)}
                    <div align={'right'}>
                        {this.addNewLine(this)}
                    </div>
            </div>
        );
    }
}

const  mapStateToProps  = state => {
    return {
        crosses_info: state.crosses_reduser.crosses_info,
        updateVisible: state.action_visible.updateVisible
    };
};
const  mapDispatchToProps = dispatch =>{
    return {
        fetchAllCrosses: url => dispatch( getAllCrosses("all",url)),
        visibleUpdate: (status,id) => dispatch(setStatusShowDialog("updateVisible",status,id)),
        setCrosses: (url, data) => dispatch(setCrosses("all", url, data)),
        updateCrosses: (url, id, new_data ) => dispatch(updateCrosses("all", url, id, new_data )),
        deleteCrosses: (url, id) => dispatch(deleteCrosses("all", url, id)),
        addNewLine: (data) => dispatch(addNewLine("addNewLine", data)),
        deleteNewLine: (data) => dispatch(addNewLine("deleteNewLine", data))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Crosses)