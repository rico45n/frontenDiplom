import React, { Component } from 'react';
import PageFooter from '../../footer/PageFooter';

import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {connect} from "react-redux";
import {
    getAllNetworkJournal,
    addNewLine, setNetworkJournal, updateNetworkJournal
} from "../../../action_creator/journal_creator/networkJoural_creator";
import {Button} from "primereact/button";
import {setStatusShowDialog} from "../../../action_creator/action_users_creator";
import {Dropdown} from "primereact/dropdown";
import {getAllDevice, getDeviceSelect} from "../../../action_creator/device_creator/device_creator";
import {InputText} from "primereact/inputtext";
import {
    getAllNetwork, getIpAddressFilter,
    getIPSelect,
    getNetworkSelect
} from "../../../action_creator/network_creator/network_creator";

class NetworkJournal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchAllNetworkJournal("http://localhost:8080/NetworkJournal/NetworkJournalAll");
        //this.props.visibleUpdate(false, null);
        if(this.props.device_info.length === 0){
            this.props.fetchAllDevice("http://localhost:8080/Devices/DevicesAll");
        }
        if(this.props.all_network.length === 0){
            this.props.fetchAllNetwork("http://localhost:8080/Network/NetworkAll");
        }
    }

    networkJournal_table(){
        return <DataTable value={this.props.network_journal_info} responsive={true} scrollable={true}>

            <Column field="network" header="Сеть" autoLayout = {true}
                    style={{textAlign:'center', size: 'auto'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_network_journal)
                        {
                            const data = this.props.all_network.map((index)=>{
                                    return {
                                        label: (index.ip_address_network + "/" + index.networkMask),
                                        value: index.id_network,
                                        name: (index.ip_address_network + "/" + index.networkMask),
                                        status: index.id_status
                                    }
                            });

                           const network_info = data.filter(e => e.status === 1);

                            return <div>
                                <Dropdown  value={[this.props.selectNetwork.label]} options={network_info} editable ={true}
                                           id = "update_network"  style={{textAlign:'center'}} filter={true}
                                           className={'p-dropdown'}
                                           onChange={async (e)=>{
                                               let label;
                                               let value;
                                               let data = this.props.all_network;
                                              for(let i = 0 ; i<= data.length; i++) {
                                                   if (data[i].id_network === e.value) {
                                                       label = (data[i].ip_address_network +"/" + data[i].networkMask);
                                                       value = data[i].id_network;
                                                       break;
                                                   }
                                               }
                                               await this.props.NetworkUpdateValue({label: label, value: value});
                                               await this.props.getIpAddressFilter("http://localhost:8080/NetworkJournal/NetworkJournalIpFilter/", value);
                                               this.props.IPSelect({label: "", value: 0});
                                           }}
                                />
                            </div>
                        }
                        else{
                            return <div>
                                {value.network}
                            </div>
                        }
                    }}
                   ></Column>

            <Column field="ip_address" header="IP-адресс" autoLayout = {true}
                    style={{textAlign:'center', width: '250px'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_network_journal)
                        {
                            let i = -1;
                            const data = this.props.selectIpAddress.map((index)=>{
                                i++;
                                return {
                                    label: (index.ip_address),
                                    value: i,
                                    name: (index.ip_address)
                                }
                            });
                            return <div>
                                <Dropdown  value={[this.props.selectIP.label]} options={data} editable ={true}
                                     id = "update_network"  style={{textAlign:'center', width: '230px'}} filter={true}
                                    className={'p-dropdown'}
                                    onChange={(e)=>{
                                    let label;
                                    let value;
                                    let data = this.props.selectIpAddress;

                                    for(let i = 0 ; i<= data.length; i++) {
                                            if (data[i].id === e.value) {
                                            label = data[i].ip_address;
                                            value = data[i].id;
                                            break;
                                    }
                            }
                            this.props.IPSelect({label: label, value: value});
                        }}
                            />
                        </div>
                        }
                        else {
                            return <div>
                                {value.ip_address}
                            </div>
                        }
                    }}></Column>

            <Column field="DNS_zone" header="DNS зона" autoLayout = {true}
                    style={{textAlign:'center', size: 'auto'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_network_journal)
                        {
                            return <InputText id = "update_DNS_zone" defaultValue={value.DNS_zone}></InputText>
                        }
                        else {
                            return <div>
                                {value.DNS_zone}
                            </div>
                        }
                    }}></Column>

            <Column field="hostname" header="Hostname устройства" autoLayout = {true}
                    style={{textAlign:'center', size: 'auto'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_network_journal)
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
                                {value.hostname}
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
                        if(value.id_user_old === 0){
                            return <div>
                            </div>
                        }else{
                            return <div>
                                {value.user_old}
                            </div>}
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

            <Column style={{width:'8%'}} field="id_network_journal" header="Действие" body={(value) => {
                if(value.id_network_journal !== -1){
                    return <div><center>
                        <Button className="p-button-warning p-button-rounded" icon='pi pi-fw pi-pencil' onClick={() => {
                            if(this.props.updateVisible.visible === true){
                                let DNS_zone;
                                if(value.DNS_zone === undefined){
                                    DNS_zone = "";
                                }
                                else {
                                    DNS_zone = value.DNS_zone;
                                }
                                let updateNetworkJournalInfo = {
                                    id_network_journal: value.id_network_journal,
                                    id_network: this.props.selectNetwork.value,
                                    network: this.props.selectNetwork.label,
                                    DNS_zone: document.getElementById("update_DNS_zone").value,
                                    date_reg: value.date_reg,
                                    date_old: new Date().toDateString(),
                                    ip_address: this.props.selectIP.label,
                                    id_user_reg: value.id_user_reg,
                                    user_reg: value.user_reg,
                                    id_user_old: this.props.user_auth_info.user_id,
                                    user_old: this.props.user_auth_info.fioUser,
                                    id_devices: this.props.selectDeviceValue.value,
                                    devices: this.props.selectDeviceValue.label,
                                    id_status: 1,
                                    name_status: ""
                                };
                                let firstNetworkJournalInfo = {
                                    id_network_journal: value.id_network_journal,
                                    id_network: value.id_network,
                                    network: value.network,
                                    DNS_zone: DNS_zone,
                                    date_reg: value.date_reg,
                                    date_old: new Date().toDateString(),
                                    ip_address: value.ip_address,
                                    id_user_old: this.props.user_auth_info.user_id,
                                    user_old: this.props.user_auth_info.fioUser,
                                    id_devices: value.id_devices,
                                    devices: value.devices,
                                    id_status: 1,
                                    name_status: ""
                                };
                                if(JSON.stringify(updateNetworkJournalInfo)=== JSON.stringify(firstNetworkJournalInfo)){
                                    alert("Информация не изменилась!");
                                    this.props.visibleUpdate(false, null);
                                }else {
                                    this.props.updateNetworkJournal("http://localhost:8080/NetworkJournal/UpdateNetworkJournal/", Number(value.id_network_journal), updateNetworkJournalInfo);
                                    this.props.visibleUpdate(false, null);
                                }
                            }
                            else {
                                this.props.visibleUpdate(true, value.id_network_journal);
                                this.props.DeviceUpdateValue({value: value.id_device, label: value.hostname});
                                this.props.NetworkUpdateValue({value: value.id_network, label: value.network});
                            }
                        }}></Button>
                        <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-trash' onClick={()=>{
                            if(window.confirm("Вы уверены, что хотите удалить запись?")){
                                const deleteNetworkJournal = {
                                    id_network_journal: value.id_network_journal,
                                    id_network: value.id_network,
                                    network: value.network,
                                    DNS_zone: value.DNS_zone,
                                    date_reg: value.date_reg,
                                    date_old: value.date_old,
                                    ip_address: value.ip_address,
                                    id_user_reg: value.id_user_reg,
                                    user_reg: value.user_reg,
                                    id_user_old: this.props.user_auth_info.id_user_old,
                                    user_old: this.props.user_auth_info.fioUser,
                                    id_devices: value.id_devices,
                                    hostname: value.hostname,
                                    id_status: 2,
                                    name_status: ""
                                };
                                this.props.updateNetworkJournal("http://localhost:8080/NetworkJournal/DeleteNetworkJournal/", value.id_network_journal, deleteNetworkJournal);
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
                            const createNetworkJournal = {
                                id_network_journal: 1,
                                id_network: this.props.selectNetwork.value,
                                network: this.props.selectNetwork.label,
                                DNS_zone: document.getElementById("update_DNS_zone").value,
                                date_reg: "",
                                date_old: "",
                                ip_address:this.props.selectIP.label,
                                id_user_reg: this.props.user_auth_info.user_id,
                                user_reg: this.props.user_auth_info.fioUser,
                                id_user_old: 0,
                                user_old: "",
                                id_devices: this.props.selectDeviceValue.value,
                                hostname: this.props.selectDeviceValue.label,
                                id_status: 1,
                                name_status: ""
                            };
                            this.props.setNetworkJournal("http://localhost:8080/NetworkJournal/CreateNetworkJournal", createNetworkJournal);
                            this.props.visibleUpdate(false, null);
                        }
                        else {
                            this.props.visibleUpdate(true, -1);
                            this.props.DeviceUpdateValue({value: value.id_device, label: value.hostname});
                            this.props.NetworkUpdateValue({value: value.id_network, label: value.network });
                        }
                    }}></Button>
                        <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-minus' onClick={() => {
                            this.props.deleteNewLine(this.props.network_journal_info);
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
                this.props.visibleUpdate(true, false);
                this.props.IPSelect({label: "", value: 0});
            }
            else {
                this.props.addNewLine(this.props.network_journal_info);
                this.props.visibleUpdate(true, -1);
                this.props.IPSelect({label: "", value: 0});
            }
        }}></Button>
    }

    render() {
        return (
            <div><PageFooter/>
                <Panel header="Журнал ip-адресного пространства" />
                    {this.networkJournal_table(this)}
                <div align={'right'}>
                    {this.addNewLine(this)}
                </div>
            </div>
        );
    }
}
const  mapStateToProps  = state => {
    return {
        network_journal_info: state.networkJournal_reduser.network_journal_info,
        updateVisible: state.action_visible.updateVisible,
        user_auth_info: state.user_reduser.user_auth_info,
        device_info: state.device_reduser.device_info,
        selectDeviceValue: state.device_reduser.selectDeviceValue,
        all_network: state.network_reduser.all_network,
        selectNetwork: state.network_reduser.selectNetwork,
        selectIpAddress: state.network_reduser.selectIpAddress,
        selectIP: state.network_reduser.selectIP

    };
};
const  mapDispatchToProps = dispatch =>{
    return {
        fetchAllNetworkJournal: url => dispatch(getAllNetworkJournal("all",url)),
        visibleUpdate: (status,id) => dispatch(setStatusShowDialog("updateVisible",status,id)),
        addNewLine: (data) => dispatch(addNewLine("addNewLine", data)),
        deleteNewLine: (data) => dispatch(addNewLine("deleteNewLine", data)),
        DeviceUpdateValue: (data) => dispatch(getDeviceSelect("selectDeviceValue", data)),
        NetworkUpdateValue: (data) => dispatch(getNetworkSelect("selectNetworkValue", data)),
        fetchAllDevice: url => dispatch(getAllDevice("all",url)),
        fetchAllNetwork: url => dispatch(getAllNetwork("all",url)),
        setNetworkJournal: (url, data) => dispatch(setNetworkJournal("all",url, data)),
        updateNetworkJournal: (url, id, data) => dispatch(updateNetworkJournal("all", url,id, data)),
        getIpAddressFilter: (url, id) => dispatch(getIpAddressFilter("all", url,id)),
        IPSelect: (data) => dispatch(getIPSelect("selectIPValue", data))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(NetworkJournal)