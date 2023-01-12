import React, { Component } from 'react';
import PageFooter from '../../footer/PageFooter';
import {connect} from "react-redux";
import {
    addNewLine,
    deleteRoom,
    getAllRoom,
    setRoom,
    updateRoom
} from "../../../action_creator/room_creator/room_creator";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {getUserSelect} from "../../../action_creator/user_creator/user_creator";
import {getNodesSelect} from "../../../action_creator/network_creator/nodes_creator";
import {setStatusShowDialog} from "../../../action_creator/action_users_creator";

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state ={};
    }
    componentDidMount() {
        this.props.fetchRoom("http://localhost:8080/Room/RoomlAll");
    }

    room_table(){
        return <DataTable value= {this.props.room_info} responsive={true} scrollable={true}>
            <Column field="name_room" header="Наименование комнаты" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_room)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_name_room" defaultValue={value.name_room} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.name_room}
                            </div>
                        }
                    }}></Column>
            <Column field="type_room" header="Тип помещения" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_room)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_type_room" defaultValue={value.type_room} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.type_room}
                            </div>
                        }
                    }}></Column>
            <Column field="name_nodes" header="Комутационный центр" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_room)
                        {
                            const nodes = this.props.nodes_info.map((index)=>{
                                return {label: index.name_nodes, value: index.id_nodes, name: index.name_nodes}
                            });
                            return <div>
                                <Dropdown  value={[this.props.selectNodesValue.label]} options={nodes} filter={true} editable ={true}
                                           id = "update_nodes_name"  style={{textAlign:'center'}}
                                           className={'p-dropdown'}
                                           onChange={(e)=>{
                                               let label;
                                               let value;
                                               let data = this.props.nodes_info;
                                               for(let i = 0 ; i<= data.length; i++) {
                                                   if (data[i].id_nodes === e.value) {
                                                       label = data[i].name_nodes;
                                                       value = data[i].id_nodes;
                                                       break;
                                                   }
                                               }
                                               this.props.NodesUpdateValue({label: label, value: value})
                                           }}
                                />
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
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_room)
                        {
                            const fioUserOtv = this.props.user_info.map((index)=>{
                                return {label: index.fioUser, value: index.user_id, name: index.fioUser}
                            });
                            return <div>
                                <Dropdown  value={[this.props.selectUserValue.label]} options={fioUserOtv} filter={true} editable ={true}
                                           id = "update_type_device"  style={{textAlign:'center'}}
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


            <Column style={{width:'8%'}} field="id_room" header="Действие" body={(value) => {
                if(value.id_room!==-1){
                    return <div>
                        <center>
                        <Button className="p-button-warning p-button-rounded" icon='pi pi-fw pi-pencil' onClick={() => {
                            if(this.props.updateVisible.visible === true){
                                const updateRoom = {
                                    id_room: Number(value.id_room),
                                    name_room: document.getElementById("update_name_room").value,
                                    id_user_otv: Number(this.props.selectUserValue.value),
                                    user_otv: this.props.selectUserValue.label,
                                    type_room: document.getElementById("update_type_room").value,
                                    id_nodes: Number(this.props.selectNodesValue.value),
                                    name_nodes: this.props.selectNodesValue.label
                                };

                                const firstRoom = {
                                    id_room: Number(value.id_room),
                                    name_room: value.name_room,
                                    id_user_otv: value.id_user_otv,
                                    user_otv: value.user_otv,
                                    type_room: value.type_room,
                                    id_nodes: value.id_nodes,
                                    name_nodes: value.name_nodes
                                };

                                if(JSON.stringify(firstRoom) === JSON.stringify(updateRoom)){
                                    alert("Информация не изменилась!");
                                    this.props.visibleUpdate(false, null);
                                }
                                else{
                                    this.props.updateRoom("http://localhost:8080/Room/UpdateRoom/", Number(value.id_room), updateRoom)
                                    this.props.visibleUpdate(false, null);
                                }
                            }
                            else {
                                this.props.visibleUpdate(true, value.id_room);
                                this.props.NodesUpdateValue({value: value.id_nodes, label: value.name_nodes});
                                this.props.UserOtvUpdateValue({value: value.id_user_otv, label: value.user_otv});
                            }
                        }}></Button> <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-trash' onClick={()=>{
                            if(window.confirm("Вы уверены, что хотите удалить запись?")){
                                this.props.deleteRoom("http://localhost:8080/Room/DeleteRoom/", value.id_room);
                            }
                            else{
                            }
                        }}>
                        </Button>
                            </center>
                    </div>
                }
                else {
                    return <div>
                            <center>
                                <Button className="p-button-success p-button-rounded" icon='pi pi-fw pi-plus' onClick={() => {
                                    const createRoom = {
                                        id_room: 0,
                                        name_room: document.getElementById("update_name_room").value,
                                        id_user_otv: this.props.selectUserValue.value,
                                        user_otv: this.props.selectUserValue.label,
                                        type_room: document.getElementById("update_type_room").value,
                                        id_nodes: this.props.selectNodesValue.value,
                                        name_nodes: this.props.selectNodesValue.label
                                     };
                                    this.props.setRoom("http://localhost:8080/Room/CreateRoom",createRoom);
                                    this.props.visibleUpdate(false, null);

                                }}></Button>
                                 <span> </span>
                                <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-minus' onClick={() => {
                                 this.props.deleteNewLine(this.props.room_info);
                                 this.props.visibleUpdate(false, null);
                                }}>
                                </Button>
                              </center>
                    </div>
                }}}></Column>
        </DataTable>
    }

    addNewLine(){
        return <Button  style={{width:'8%'}} label={"Добавить"} className="p-button-secondary p-button-severities" icon='pi pi-fw pi-plus' onClick={() => {
                if(this.props.updateVisible.str === -1){

                }
                else {
                    this.props.addNewLine(this.props.room_info);
                    this.props.visibleUpdate(true, -1);
                }
        }}></Button>
    }

    render() {
        return (
            <div>
                <PageFooter />
                    {this.room_table(this)}
                <div align = "right">
                    {this.addNewLine(this)}
                </div>
            </div>
        );
    }
}
const  mapStateToProps  = state => {
    return {
        room_info: state.room_reduser.room_info,
        nodes_info: state.nodes_reduser.nodes_info,
        visible_dialog: state.action_visible.visible.visible,
        deleteVisible: state.action_visible.deleteVisible.visible,
        updateVisible: state.action_visible.updateVisible,
        user_info: state.user_reduser.user_info,
        selectUserValue: state.user_reduser.selectUserValue,
        selectNodesValue: state.nodes_reduser.selectNodesValue
    };
};
const  mapDispatchToProps = dispatch =>{
    return {
        fetchRoom: url => dispatch(getAllRoom("all",url)),
        NodesUpdateValue: (data) => dispatch(getNodesSelect("selectNodesValue", data)),
        UserOtvUpdateValue: (data) => dispatch(getUserSelect("selectUserValue", data)),
        visibleUpdate: (status,id) => dispatch(setStatusShowDialog("updateVisible",status,id)),
        deleteRoom: (url, data)  => dispatch(deleteRoom("all",url,data)),
        setRoom: (url, data) => dispatch(setRoom("all",url, data)),
        updateRoom: (url, id, data) => dispatch(updateRoom("all",url, id, data)),
        addNewLine: (data) => dispatch(addNewLine("addNewLine", data)),
        deleteNewLine: (data) => dispatch(addNewLine("deleteNewLine", data))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Rooms)