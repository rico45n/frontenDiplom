import React, { Component } from 'react';
import PageFooter from '../../footer/PageFooter';
import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {connect} from "react-redux";
import {
    getAllConfiguration,
    setConfiguration,
    updateConfiguration,
    addNewLine
} from "../../../action_creator/journal_creator/configuration_creator";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {getDeviceSelect} from "../../../action_creator/device_creator/device_creator";
import {setStatusShowDialog} from "../../../action_creator/action_users_creator";
import {getStatusSelect} from "../../../action_creator/status_creator";

class ConfigurationDevices extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
         this.props.fetchAllConfiguration("http://localhost:8080/Configuration/ConfigurationAll");
    }

    configuration_table(){
        return <DataTable value= {this.props.config_dev_info} responsive={true} scrollable={true}>
            <Column field="host_name" header="Hostname устройства" autoLayout = {true}
                    style={{textAlign:'center', size: 'auto'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_config)
                        {

                            const device_info = this.props.device_info.map((index)=>{
                                return {label: index.hostname, value: index.id_devices, name: index.hostname}
                            });

                            return <div>
                                <Dropdown  value={[this.props.selectDeviceValue.label]} options={device_info} editable ={true}
                                           id = "update_host_name"  style={{textAlign:'center'}} filter={true}
                                           className={'p-dropdown'}
                                           onChange={(e)=>{
                                               let label;
                                               let value;
                                               let data = this.props.device_info;
                                               for(let i = 0 ; i<= data.length; i++) {
                                                   if (data[i].id_devices === e.value) {
                                                       label = data[i].hostname;
                                                       value = data[i].id_devices;
                                                       break;
                                                   }
                                               }
                                               this.props.DeviceUpdateValue({label: label, value: value})
                                           }}
                                />
                            </div>
                        }
                        else{
                            return <div>
                                {value.host_name}
                            </div>
                        }
                    }}></Column>

            <Column field="config_first" header="Начальная конфигурация" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_config)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_config_first" defaultValue={value.config_first} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.config_first}
                            </div>
                        }
                    }}></Column>

            <Column field="config_last" header="Конфигурация после изменений" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_config)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_config_last" defaultValue={value.config_last} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.config_last}
                            </div>
                        }
                    }}></Column>

            <Column field="deference" header="Разница" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.config)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_deference" defaultValue={value.deference} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.deference}
                            </div>
                        }
                    }}></Column>

            <Column field="user_reg" header="Пользователь создавший запись" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                            return <div>
                                {value.user_reg}
                            </div>
                    }}></Column>

            <Column field="date_reg" header="Дата регистрации" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                            return <div>
                                {value.date_reg}
                            </div>
                    }}></Column>

            <Column field="user_old" header="Пользователь изменивший запись" autoLayout = {true}
                    style={{textAlign:'center', size: 'auto'}} sortable={true} filter={true} filterMatchMode="contains"
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

            <Column field="date_old" header="Дата изменения" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                            return <div>
                               {value.date_old}
                            </div>
                    }}></Column>

            <Column field="name_status" header="Статус" autoLayout = {true}
                    style={{textAlign:'center'}} sortable={true} filter={true} filterPlaceholder={"Активна/Удалена"} filterField = {"Активна"} filterMatchMode="contains"
                    body={(value) => {
                            return <div>
                                {value.name_status}
                            </div>
                    }}></Column>

            <Column style={{width:'6%'}} field="id_devices" header="Действие" body={(value) => {
                if(value.id_config!==-1){
                    return <div><center>
                        <Button className="p-button-warning p-button-rounded" icon='pi pi-fw pi-pencil' onClick={() => {
                            if(this.props.updateVisible.visible === true){
                                const updateConfiguration = {
                                    id_config: value.id_config,
                                    id_device: this.props.selectDeviceValue.value,
                                    host_name: this.props.selectDeviceValue.label,
                                    config_first: value.config_first,
                                    config_last: document.getElementById("update_config_last").value,
                                    deference: value.deference,
                                    id_user_reg: value.id_user_reg,
                                    user_reg: value.user_reg,
                                    id_user_old: this.props.user_auth_info.user_id,
                                    user_old: this.props.user_auth_info.fioUser,
                                    date_reg: (new Date(value.date_reg)).toLocaleDateString(),
                                    date_old: (new Date()).toLocaleDateString(),
                                    id_status: 2,
                                    name_status: ""
                                };
                                let lastValue = {
                                    id_config: value.id_config,
                                    id_device: value.id_device,
                                    host_name: value.host_name,
                                    config_first: value.config_first,
                                    config_last: "",
                                    deference: value.deference,
                                    id_user_reg: value.id_user_reg,
                                    user_reg: value.user_reg,
                                    id_user_old: this.props.user_auth_info.user_id,
                                    user_old: this.props.user_auth_info.fioUser,
                                    date_reg: (new Date(value.date_reg)).toLocaleDateString(),
                                    date_old: (new Date()).toLocaleDateString(),
                                    id_status: 2,
                                    name_status: ""
                                };

                                if(JSON.stringify(updateConfiguration) === JSON.stringify(lastValue)){
                                    alert("Информация не изменилась!");
                                    this.props.visibleUpdate(false, null);
                                }else {
                                    this.props.updateConfiguration("http://localhost:8080/Configuration/UpdateConfiguration/", Number(value.id_config), updateConfiguration);
                                    this.props.visibleUpdate(false, null);
                                }
                            }
                            else {
                                this.props.visibleUpdate(true, value.id_config);
                                this.props.DeviceUpdateValue({value: value.id_device, label: value.host_name});
                                this.props.StatusUpdateValue({value: value.id_status, label: value.name_status});

                            }
                        }}></Button>
                        <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-trash' onClick={()=>{
                            if(window.confirm("Вы уверены, что хотите удалить запись?")){
                                const deleteConfiguration = {
                                    id_config: value.id_config,
                                    id_device: 0,
                                    host_name:"",
                                    config_first: "",
                                    config_last: null,
                                    deference: "",
                                    id_user_reg: 0,
                                    user_reg: "",
                                    id_user_old: this.props.user_auth_info.user_id,
                                    user_old: "",
                                    date_reg: (new Date()).toLocaleDateString(),
                                    date_old: null,
                                    id_status: 1,
                                    name_status: ""
                                };
                                this.props.updateConfiguration("http://localhost:8080/Configuration/DeleteConfiguration/", value.id_config, deleteConfiguration);
                            }
                            else{
                            }
                        }}>
                        </Button>
                    </center>
                    </div>
                }
                else {
                    return <div><center><Button className="p-button-success p-button-rounded" icon='pi pi-fw pi-plus' onClick={() => {
                        if(this.props.updateVisible.visible === true){
                            const createConfiguration = {
                                id_config: 0,
                                id_device: this.props.selectDeviceValue.value,
                                host_name: this.props.selectDeviceValue.label,
                                config_first: document.getElementById("update_config_first").value,
                                config_last: null,
                                deference: "",
                                id_user_reg: this.props.user_auth_info.user_id,
                                user_reg: this.props.user_auth_info.fioUser,
                                id_user_old: 0,
                                user_old: "",
                                date_reg: (new Date()).toLocaleDateString(),
                                date_old: null,
                                id_status: 1,
                                name_status: ""
                            };
                            this.props.setConfiguration("http://localhost:8080/Configuration/CreateConfiguration", createConfiguration);
                            this.props.visibleUpdate(false, null);
                        }
                        else {
                            this.props.visibleUpdate(true, value.id_config);
                            this.props.DeviceUpdateValue({value: value.id_device, label: value.host_name});
                            this.props.StatusUpdateValue({value: value.id_status, label: value.name_status});
                        }
                    }}></Button>
                        <span> </span>
                    <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-minus' onClick={() => {
                        this.props.deleteNewLine(this.props.config_dev_info);
                        this.props.visibleUpdate(false, null);
                    }}>
                    </Button>
                    </center>
                    </div>
                }}}></Column>
        </DataTable>
    }
    addNewLine(){
        return <Button  style={{width:'6%'}} label={"Добавить"} className="p-button-secondary p-button-severities" icon='pi pi-fw pi-plus' onClick={() => {
            if(this.props.updateVisible.str === -1){

            }
            else {
                this.props.addNewLine(this.props.config_dev_info);
                this.props.visibleUpdate(true, -1);
            }
        }}></Button>
    }

    render() {
        return (
            <div><PageFooter/>
                <Panel header="Журнал конфигурации телекоммуникационного оборудования"/>
                    {this.configuration_table(this)}
                    <div align={"right"}>
                        {this.addNewLine(this)}
                    </div>
            </div>
        );
    }
}
const  mapStateToProps  = state => {
    return {
        config_dev_info: state.configuration_reduser.config_dev_info,
        device_info: state.device_reduser.device_info,
        updateVisible: state.action_visible.updateVisible,
        selectStatus: state.status_reduser.selectStatus,
        status_action: state.status_reduser.status_action,
        selectDeviceValue: state.device_reduser.selectDeviceValue,
        selectUserValue: state.user_reduser.selectUserValue,
        user_auth_info: state.user_reduser.user_auth_info,


        deleteVisible: state.action_visible.deleteVisible.visible


    };
};
const  mapDispatchToProps = dispatch =>{
    return {
        visibleUpdate: (status,id) => dispatch(setStatusShowDialog("updateVisible",status,id)),
        fetchAllConfiguration: async url => dispatch( await getAllConfiguration("all", url)),
        DeviceUpdateValue: (data) => dispatch(getDeviceSelect("selectDeviceValue", data)),
        StatusUpdateValue: (data) => dispatch(getStatusSelect("selectStatusValue", data)),
        updateConfiguration: (url, id, data) => dispatch(updateConfiguration("all",url, id, data)),
        setConfiguration: (url, data) => dispatch(setConfiguration("all",url, data)),
        addNewLine: (data) => dispatch(addNewLine("addNewLine", data)),
        deleteNewLine: (data) => dispatch(addNewLine("deleteNewLine", data))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ConfigurationDevices)