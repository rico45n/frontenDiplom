import React, { Component } from 'react';
import PageFooter from '../../footer/PageFooter';
import {connect} from "react-redux";
import {
    getAllNodes,
    setNodes,
    updateNodes,
    addNewLine,
    deleteNodes
} from "../../../action_creator/network_creator/nodes_creator";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import {setStatusShowDialog} from "../../../action_creator/action_users_creator";
import {getStatusSelect} from "../../../action_creator/status_creator";
import {getUserSelect} from "../../../action_creator/user_creator/user_creator";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";

class Nodes extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.fetchNodes("http://localhost:8080/Nodes/NodesAll");
    }

    nodes_table(){
        return <DataTable value={this.props.nodes_info} responsive={true} scrollable={true}>

            <Column field="name_nodes" header="Наименование коммутационного центра" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_nodes)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_name_nodes" defaultValue={value.name_nodes} style={{textAlign:'center', width: '300px'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.name_nodes}
                            </div>
                        }
                    }}></Column>

            <Column field="user_otv" header="Ответственный" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_nodes)
                        {
                            const fioUserOtv = this.props.user_info.map((index)=>{
                                return {label: index.fioUser, value: index.user_id, name: index.fioUser}
                            });
                            return <div>
                                <Dropdown  value={[this.props.selectUserValue.label]} options={fioUserOtv} filter={true} editable ={true}
                                           id = "update_type_device"  style={{textAlign:'center', width: '300px'}}
                                           className={'p-dropdown'}
                                           onChange={(e)=>{
                                               let label;
                                               let value;
                                               let data = this.props.user_info;
                                               for(let i = 0 ; i<= data.length; i++) {
                                                   if (data[i].user_id === e.value) {
                                                       label = data[i].fioUser;
                                                       value = data[i].user_id;
                                                       break;
                                                   }
                                               }
                                               this.props.UserOtvUpdateValue({label: label, value: value})
                                           }}
                                />
                            </div>
                        }
                        else{
                            return <div>
                                {value.user_otv}
                            </div>
                        }
                    }}></Column>

            <Column style={{ width: '6%' }} field="id_pool_address" header="Действие" body={(value) => {
                if (value.id_nodes !== -1) {
                    return <div><center>
                        <Button className="p-button-warning p-button-rounded" icon='pi pi-fw pi-pencil' onClick={() => {
                            if (this.props.updateVisible.visible === true) {
                                let firstNodes = {
                                    id_nodes: value.id_nodes,
                                    id_user_otv: value.id_user_otv,
                                    name_nodes: value.name_nodes,
                                    user_otv: value.user_otv
                                };

                                let lastNodes = {
                                    id_nodes: value.id_nodes,
                                    id_user_otv: this.props.selectUserValue.value,
                                    name_nodes: document.getElementById("update_name_nodes").value,
                                    user_otv: this.props.selectUserValue.label
                                };

                                if (JSON.stringify(firstNodes) === JSON.stringify(lastNodes)) {
                                    alert("Информация не изменилась!");
                                    this.props.visibleUpdate(false, null);
                                } else {
                                    this.props.visibleUpdate(false, null);
                                    this.props.updateNodes("http://localhost:8080/Nodes/UpdateNodes/", Number(value.id_nodes), lastNodes);
                                }
                            }
                            else {
                                this.props.visibleUpdate(true, value.id_nodes);

                            }
                        }}></Button>
                        <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-trash' onClick={() => {
                            if (window.confirm("Вы уверены, что хотите удалить запись?")) {
                                this.props.deleteNodes("http://localhost:8080/Nodes/DeleteNodes/", value.id_nodes);
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
                            const createNodes = {
                                id_nodes: 0,
                                id_user_otv: this.props.selectUserValue.value,
                                name_nodes: document.getElementById("update_name_nodes").value,
                                user_otv: this.props.selectUserValue.label
                            };

                            this.props.setNodes("http://localhost:8080/Nodes/CreateNodes", createNodes);
                            this.props.visibleUpdate(false, null);
                        }
                        else {
                            this.props.visibleUpdate(true, value.id_nodes);
                            this.props.UserOtvUpdateValue({label: value.user_old, value: value.id_user_otv});
                        }
                    }}></Button> <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-minus' onClick={() => {
                            this.props.deleteNewLine(this.props.nodes_info);
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
                this.props.addNewLine(this.props.nodes_info);
                this.props.visibleUpdate(true, -1);
            }
        }}></Button>
    }
    render() {
        return (
            <div>
                <PageFooter />
                <Panel header="Коммутационные центры" />
                    {this.nodes_table(this)}
                <div align={'right'}>
                    {this.addNewLine(this)}
                </div>
            </div>
        );
    }
}

const  mapStateToProps  = state => {
    return {
        nodes_info: state.nodes_reduser.nodes_info,
        updateVisible: state.action_visible.updateVisible,
        selectStatus: state.status_reduser.selectStatus,
        user_auth_info: state.user_reduser.user_auth_info,
        selectUserValue: state.user_reduser.selectUserValue,
        user_info: state.user_reduser.user_info
    };
};
const  mapDispatchToProps = dispatch =>{
    return {
        fetchNodes: url => dispatch(getAllNodes("all",url)),
        updateNodes: (url, id, data) => dispatch(updateNodes("all",url, id, data)),
        deleteNodes: (url, id) => dispatch(deleteNodes("all",url, id)),
        setNodes:(url, data) => dispatch(setNodes("all", url, data)),
        visibleUpdate: (status, id) => dispatch(setStatusShowDialog("updateVisible", status, id)),
        StatusUpdateValue: (data) => dispatch(getStatusSelect("selectStatusValue", data)),
        addNewLine: (data) => dispatch(addNewLine("addNewLine", data)),
        UserOtvUpdateValue: (data) => dispatch(getUserSelect("selectUserValue", data)),
        deleteNewLine: (data) => dispatch(addNewLine("deleteNewLine", data))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Nodes)