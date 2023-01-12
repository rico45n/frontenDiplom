import React, { Component } from 'react';
import PageFooter from '../../footer/PageFooter';
import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {connect} from "react-redux";
import {
    deleteDevice,
    getAllDevice, getDeviceSelect,
    setDevice,
    updateDevice, addNewLine
} from "../../../action_creator/device_creator/device_creator";
import {Button} from "primereact/button";
import {setStatusShowDialog} from "../../../action_creator/action_users_creator";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {getUserSelect} from "../../../action_creator/user_creator/user_creator";
import {getRoomSelect} from "../../../action_creator/room_creator/room_creator";
import {getStatusSelect} from "../../../action_creator/status_creator";

class Devices extends Component {
    constructor(props) {
        super(props);
        this.state= {};
    }
    componentDidMount() {
        this.props.fetchAllDevice("http://localhost:8080/Devices/DevicesAll");
        this.props.visible(false, null);
        this.props.visibleUpdate(false,null);
    }

    table_devices(){
        return <DataTable value= {this.props.device_info} responsive={true} scrollable={true}>
            <Column field="type_device" header="Тип устройства" autoLayout = {true}
                    style={{textAlign:'center', size: 'auto'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_devices)
                        {
                            const type_device_info = this.props.type_device_info.map((index)=>{
                                return {label: index.name_type_dev, value: index.id_type_dev, name: index.name_type_dev}
                            });
                            return <div>
                                <Dropdown  value={[this.props.selectDeviceValue.label]} options={type_device_info} editable ={true}
                                           id = "update_type_device"  style={{textAlign:'center'}} filter={true}
                                           className={'p-dropdown'}
                                           onChange={(e)=>{
                                               let label;
                                               let value;
                                               let data = this.props.type_device_info;
                                               for(let i = 0 ; i<= data.length; i++) {
                                                   if (data[i].id_type_dev === e.value) {
                                                       label = data[i].name_type_dev;
                                                       value = data[i].id_type_dev;
                                                       break;
                                                   }
                                               }
                                              this.props.TypeDeviceUpdateValue({label: label, value: value})
                                           }}
                                />
                        </div>
                        }
                        else{
                            return <div>
                                {value.type_device}
                            </div>
                        }
                    }}></Column>
            <Column field="hostname" header="Hostname" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_devices)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_hostname" defaultValue={value.hostname} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.hostname}
                            </div>
                        }
                    }}></Column>
            <Column field="mac_address" header="MAC-адрес" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_devices)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_mac_address" defaultValue={value.mac_address} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.mac_address}
                            </div>
                        }
                    }}></Column>
            <Column field="inventar_number" header="Интвентарный номер" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_devices)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_inventar_number" defaultValue={value.inventar_number} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.inventar_number}
                            </div>
                        }
                    }}></Column>
            <Column field="countEthernetPort" header="Кол-во Ethernet портов" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_devices)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_countEthernetPort" defaultValue={value.countEthernetPort} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.countEthernetPort}
                            </div>
                        }
                    }}></Column>
            <Column field="countOptPort" header="Кол-во портов под оптоволокно" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_devices)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_countOptPort" defaultValue={value.countOptPort} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.countOptPort}
                            </div>
                        }
                    }}></Column>
            <Column field="room" header="Помещение" autoLayout = {true}
                    style={{textAlign:'center', size: 'auto'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_devices)
                        {
                            const room_info = this.props.room_info.map((index)=>{
                                return {label: index.name_room, value: index.id_room, name: index.name_room}
                            });
                                return <div>
                                    <Dropdown value={[this.props.selectRoomValue.label]} options={room_info} filter={true}
                                              editable={true}
                                              id="update_room" style={{textAlign: 'center'}}
                                              className={'p-dropdown'}
                                              onChange={(e) => {
                                                  let label;
                                                  let value;
                                                  let data = this.props.room_info;
                                                  for (let i = 0; i <= data.length; i++) {
                                                      if (data[i].id_room === e.value) {
                                                          label = data[i].name_room;
                                                          value = data[i].id_room;
                                                          break;
                                                      }
                                                  }
                                                  this.props.RoomUpdateValue({label: label, value: value})
                                              }}/>
                                </div>
                            } else{
                            return <div>
                                {value.room}
                            </div>
                        }
                    }}></Column>
            <Column field="user_otv" header="Ответственный" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_devices)
                        {
                            const fioUserOtv = this.props.user_info.map((index)=>{
                                return {label: index.fioUser, value: index.user_id, name: index.fioUser}
                            });
                            return <div>
                                <Dropdown  value={[this.props.selectUserValue.label]} options={fioUserOtv} filter={true} editable ={true}
                                           id = "update_user_otv"  style={{textAlign:'center'}}
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
            <Column field="name_status" header="Статус" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterPlaceholder={"Активна/Удалена"} filterField = {"Активна"} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_devices)
                        {
                            const Status = this.props.status_action.map((index)=>{
                                return {label: index.name_status, value: index.id_status, name: index.name_status}
                            });
                            return <div>
                                <Dropdown value={[this.props.selectStatus.label]} options={Status} filter={true}  editable ={true} placeholder={"Активна"}
                                           id = "update_is_status"  style={{textAlign:'center'}}
                                           className={'p-dropdown'}
                                           onChange={(e)=>{
                                               let label;
                                               let value;
                                               let data = this.props.status_action;
                                               for(let i = 0 ; i<= data.length; i++) {
                                                   if (data[i].id_status === e.value) {
                                                       label = data[i].name_status;
                                                       value = data[i].id_status;
                                                       break;
                                                   }
                                               }
                                               this.props.StatusUpdateValue({label: label, value: value})
                                           }}/>
                            </div>
                            }
                        else{
                                return <div>
                                    {value.name_status}
                                 </div>
                        }
                    }}></Column>

            <Column style={{width:'6%'}} field="id_devices" header="Действие" body={(value) => {
                if(value.id_devices!==-1){
                return <div><center>
                    <Button className="p-button-warning p-button-rounded" icon='pi pi-fw pi-pencil' onClick={() => {
                        if(this.props.updateVisible.visible === true){
                            const updateDevice = {
                                id_devices: Number(value.id_devices),
                                id_type_devices: this.props.selectDeviceValue.value,
                                type_device: this.props.selectDeviceValue.label,
                                id_user_otv: this.props.selectUserValue.value,
                                user_otv: this.props.selectUserValue.label,
                                hostname: document.getElementById("update_hostname").value,
                                mac_address: document.getElementById("update_mac_address").value,
                                inventar_number: document.getElementById("update_inventar_number").value,
                                id_room: this.props.selectRoomValue.value,
                                room: this.props.selectRoomValue.label,
                                id_props_port: Number(value.id_props_port),
                                countOptPort: Number(document.getElementById("update_countOptPort").value),
                                countEthernetPort: Number(document.getElementById("update_countEthernetPort").value),
                                id_status: this.props.selectStatus.value,
                                name_status: this.props.selectStatus.label

                            };

                            const firstDevice = {
                                id_devices: Number(value.id_devices),
                                id_type_devices: value.id_type_devices,
                                type_device: value.type_device,
                                id_user_otv: value.id_user_otv,
                                user_otv: value.user_otv,
                                hostname: value.hostname,
                                mac_address: value.mac_address,
                                inventar_number: value.inventar_number,
                                id_room: value.id_room,
                                room: value.room,
                                id_props_port: value.id_props_port,
                                countOptPort: value.countOptPort,
                                countEthernetPort: value.countEthernetPort,
                                id_status: value.id_status,
                                name_status: value.name_status

                            };
                            if(JSON.stringify(updateDevice) === JSON.stringify(firstDevice)){
                                alert("Информация не изменилась!");
                                this.props.visibleUpdate(false, null);
                            }else {
                                this.props.updateDevice("http://localhost:8080/Devices/UpdateDevices/", Number(value.id_devices), updateDevice)
                                this.props.visibleUpdate(false, null);
                            }
                        }
                        else {
                            this.props.visibleUpdate(true, value.id_devices);
                            this.props.TypeDeviceUpdateValue({value: value.id_type_devices, label: value.type_device});
                            this.props.UserOtvUpdateValue({value: value.id_user_otv, label: value.user_otv});
                            this.props.RoomUpdateValue({value: value.id_room, label: value.room});
                            this.props.StatusUpdateValue({value: value.id_status, label: value.name_status});
                        }
                    }}></Button>
                    <span> </span>
                    <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-trash' onClick={()=>{
                        if(window.confirm("Вы уверены, что хотите удалить запись?")){
                            this.props.deleteDevice("http://localhost:8080/Devices/DeleteDevices/", value.id_devices, this.props.user_auth_info.user_id);
                        }
                        else{
                        }
                    }}>
                    </Button>
                    </center>
                </div>
            }
            else {
                     return <div><center> <Button className="p-button-success p-button-rounded" icon='pi pi-fw pi-plus' onClick={() => {
                             const createDevice = {
                                  id_devices: 0,
                                  id_type_devices: this.props.selectDeviceValue.value,
                                  type_device: this.props.selectDeviceValue.label,
                                  id_user_otv: this.props.selectUserValue.value,
                                  user_otv: this.props.selectUserValue.label,
                                  hostname: document.getElementById("update_hostname").value,
                                  mac_address: document.getElementById("update_mac_address").value,
                                  inventar_number: document.getElementById("update_inventar_number").value,
                                  id_room: this.props.selectRoomValue.value,
                                  room: this.props.selectRoomValue.label,
                                  id_props_port: 0,
                                  countOptPort: Number(document.getElementById("update_countOptPort").value),
                                  countEthernetPort: Number(document.getElementById("update_countEthernetPort").value),
                                  id_status: this.props.selectStatus.value,
                                  name_status: this.props.selectStatus.label
                              };
                             this.props.setDevice("http://localhost:8080/Devices/CreateDevices", createDevice);
                             this.props.visibleUpdate(false, null);
                    }}></Button>
                        <span> </span>
                    <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-minus' onClick={() => {
                        this.props.deleteNewLine(this.props.device_info);
                        this.props.visibleUpdate(false, null);
                    }}>
                    </Button>
                    </center>
                </div>
            }}} >

            </Column>
        </DataTable>
    }

    addNewLine(){
        return <Button  style={{width:'6%'}} label={"Добавить"} className="p-button-secondary p-button-severities" icon='pi pi-fw pi-plus' onClick={() => {
            if(this.props.updateVisible.str === -1){
            }
            else {
                this.props.addNewLine(this.props.device_info);
                this.props.visibleUpdate(true, -1);
            }
        }}></Button>
    }

    render() {
        return (
            <div><PageFooter/>
                <Panel header="Оборудование организации" />
                    {this.table_devices(this)}
                <div align = "right">
                    {this.addNewLine(this)}
                </div>
            </div>
        );
    }
}

const  mapStateToProps  = state => {
    return {
        device_info: state.device_reduser.device_info,
        visible_dialog: state.action_visible.visible.visible,
        deleteVisible: state.action_visible.deleteVisible.visible,
        updateVisible: state.action_visible.updateVisible,
        user_info: state.user_reduser.user_info,
        user_auth_info: state.user_reduser.user_auth_info,
        type_device_info: state.type_device_reduser.type_device_info,
        selectDeviceValue: state.device_reduser.selectDeviceValue,
        selectUserValue: state.user_reduser.selectUserValue,
        room_info: state.room_reduser.room_info,
        selectRoomValue: state.room_reduser.selectRoomValue,
        selectStatus: state.status_reduser.selectStatus,
        status_action: state.status_reduser.status_action
    };
};
const  mapDispatchToProps = dispatch =>{
    return {
        fetchAllDevice: url => dispatch(getAllDevice("all",url)),
        deleteDevice: (url, data, id_user)  => dispatch(deleteDevice("all",url,data,id_user)),
        setDevice: (url, data) => dispatch(setDevice("all",url, data)),
        updateDevice: (url, id, data) => dispatch(updateDevice("all",url, id, data)),
        visible: status => dispatch(setStatusShowDialog("showDialog",status)),
        visibleUpdate: (status,id) => dispatch(setStatusShowDialog("updateVisible",status,id)),
        TypeDeviceUpdateValue: (data) => dispatch(getDeviceSelect("selectDeviceValue", data)),
        UserOtvUpdateValue: (data) => dispatch(getUserSelect("selectUserValue", data)),
        RoomUpdateValue: (data) => dispatch(getRoomSelect("selectRoomValue", data)),
        StatusUpdateValue: (data) => dispatch(getStatusSelect("selectStatusValue", data)),
        addNewLine: (data) => dispatch(addNewLine("addNewLine", data)),
        deleteNewLine: (data) => dispatch(addNewLine("deleteNewLine", data))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Devices)