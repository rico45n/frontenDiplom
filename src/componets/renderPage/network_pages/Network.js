import React, { Component } from 'react';
import PageFooter from '../../footer/PageFooter';
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { connect } from "react-redux";
import {
    addNewLine,
    getAllNetwork,
    setNetwork,
    updateNetwork
} from "../../../action_creator/network_creator/network_creator";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { setStatusShowDialog } from "../../../action_creator/action_users_creator";
import { getStatusSelect } from "../../../action_creator/status_creator";
import { getAllVlan, getVlanSelect } from "../../../action_creator/network_creator/vlan_creator";
import { getAllNetworkPool, getNetworkPoolSelect } from "../../../action_creator/network_creator/network_pool_creator";
import { getAllDHCP, getDHCPSelect} from "../../../action_creator/network_creator/DHCP_creator";
import {ProgressBar} from "primereact/progressbar";

class Network extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchAllNetwork("http://localhost:8080/Network/NetworkAll");
        this.props.visibleUpdate(false, null);
    }

    network_table() {
        return <DataTable value={this.props.all_network} responsive={true} scrollable={true}>
            <Column field="pool_address" header="Пул сети" autoLayout={true}
                style={{ textAlign: 'center', size: 'auto', width: "240px" }} sortable={true} filter={true} filterMatchMode="contains"
                body={(value) => {
                    if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_network) {
                        if (this.props.network_pool.length === 0) {
                            this.props.fetchAllNetworkPool("http://localhost:8080/Pool/PoolAll");
                        } else { }
                        const device_info = this.props.network_pool.map((index) => {
                            return { label: index.name_pool, value: index.id_pool_address, name: index.name_pool}
                        });

                        return <div>
                            <Dropdown value={[this.props.selectNetwork_pool.label]} options={device_info} editable={true}
                                id="update_pool_address" style={{ textAlign: 'center', width: "220px" }} filter={true}
                                className={'p-dropdown'}
                                onChange={(e) => {
                                    let label;
                                    let value;
                                    let data = this.props.network_pool;
                                    for (let i = 0; i <= data.length; i++) {
                                        if (data[i].id_pool_address === e.value) {
                                            label = data[i].name_pool;
                                            value = data[i].id_pool_address;
                                            break;
                                        }
                                    }
                                    this.props.NetworkPoolUpdateValue({ label: label, value: value })
                                }}
                            />
                        </div>
                    }
                    else {
                        return <div>
                            {value.pool_address}
                        </div>
                    }
                }}></Column>

            <Column field="ip_address_network" header="ip-адресс сети / маска" autoLayout={true}
                style={{ textAlign: 'center', width: '160px' }} sortable={true} filter={true} filterMatchMode="contains"
                body={(value) => {
                    if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_network) {
                        return <div>
                            <span className="p-float-label">
                                <InputText id="update_ip_address_network" defaultValue={value.ip_address_network + "/" + value.networkMask} style={{ textAlign: 'center', width: '140px' }} />
                            </span>
                        </div>
                    }
                    else {
                        return <div>
                            {value.ip_address_network + "/" + value.networkMask}
                        </div>
                    }
                }}></Column>

            <Column field="defaultGeteway" header="Default Geteway" autoLayout={true}
                style={{ textAlign: 'center' }} sortable={true} filter={true} filterMatchMode="contains"
                body={(value) => {
                    if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_network) {
                        return <div>
                            <span className="p-float-label">
                                <InputText id="update_defaultGeteway" defaultValue={value.defaultGeteway} style={{ textAlign: 'center', width: '120px' }} />
                            </span>
                        </div>
                    }
                    else {
                        return <div>
                            {value.defaultGeteway}
                        </div>
                    }
                }}></Column>

            <Column field="vlan" header="Наименование VLAN" autoLayout={true}
                style={{ textAlign: 'center', size: 'auto' }} sortable={true} filter={true} filterMatchMode="contains"
                body={(value) => {
                    if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_network) {
                        if (this.props.network_pool.length === 0) {
                            this.props.fetchAllVLAN("http://localhost:8080/Vlan/VlanAll");
                        }
                        else {

                        }
                        const vlan_info = this.props.vlan_info.map((index) => {
                            return { label: "[" + index.vlan_number + "] " + index.vlan_name, value: index.id_vlan, name: "[" + index.vlan_number + "] " + index.vlan_name }
                        });

                        return <div>
                            <Dropdown value={[this.props.selectVlan.label]} options={vlan_info} editable={true}
                                id="update_host_name" style={{ textAlign: 'center' }} filter={true}
                                className={'p-dropdown'}
                                onChange={(e) => {
                                    let label;
                                    let value;
                                    let data = this.props.vlan_info;
                                    for (let i = 0; i <= data.length; i++) {
                                        if (data[i].id_vlan === e.value) {
                                            label = "[" + data[i].vlan_number + "] " + data[i].vlan_name;
                                            value = data[i].id_vlan;
                                            break;
                                        }
                                    }
                                    this.props.VlanUpdateValue({ label: label, value: value })
                                }}
                            />
                        </div>
                    }
                    else {
                        return <div>
                            {value.vlan}
                        </div>
                    }
                }}></Column>

            <Column field="dhcp_pool" header="DHCP пул" autoLayout={true}
    style={{textAlign: 'center', width: "240px"}} sortable={true} filter={true} filterMatchMode="contains"
    body={(value) => {
        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.id_network) {
            if (this.props.dhcp_info.length === 0) {
                this.props.fetchAllDhcp("http://localhost:8080/DHCP/DHCPAll");
            } else {
            }
            const dhcp_info = this.props.dhcp_info.map((index) => {
                return {
                    label: index.address_start + "-" + index.address_end,
                    value: index.id_DHCP_pool,
                    name: index.address_start + "-" + index.address_end
                }
            });
            return <div align={'left'}>
                    <Dropdown value={[this.props.selectDhcp.label]} options={dhcp_info} editable={true}
                              id="update_host_name" style={{textAlign: 'center', width: '220px'}}
                              filter={true}
                              className={'p-dropdown'}
                              onChange={(e) => {
                                  let label;
                                  let value;
                                  let data = this.props.dhcp_info;
                                  for (let i = 0; i <= data.length; i++) {
                                      if (data[i].id_DHCP_pool === e.value) {
                                          label = data[i].address_start + "-" + data[i].address_end;
                                          value = data[i].id_DHCP_pool;
                                          break;
                                      }
                                  }
                                  this.props.dhcpUpdateValue({label: label, value: value});
                              }}
                              />
            </div>
        } else {
            return <div>
                {value.dhcp_pool}
            </div>
        }
    }}/>

            <Column field="status_network" header="Назначенных хостов" autoLayout={true}
                    style={{ textAlign: 'center', width: "150px" }} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if(value.id_status === 1) {
                            return <div>
                                <ProgressBar value={value.status_network} />
                                <div>{value.name_stat_network}</div>

                            </div>
                        }else{
                            return <div></div>
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

            <Column style={{ width: '6%' }} field="id_network" header="Действие" body={(value) => {
                if (value.id_network !== -1) {
                    return <div><center>
                        <Button className="p-button-warning p-button-rounded" icon='pi pi-fw pi-pencil' onClick={() => {
                            let defaultGeteway;
                            if (this.props.updateVisible.visible === true) {
                                if (value.defaultGeteway === null || value.defaultGeteway === undefined) {
                                    defaultGeteway = "";
                                }
                                else {
                                    defaultGeteway = value.defaultGeteway;
                                }

                                let firstNetworkInfo = {
                                    id_network: value.id_network,
                                    pool_address: value.pool_address,
                                    id_pool_address: value.id_pool_address,
                                    user_reg: value.user_reg,
                                    id_user_reg: value.id_user_reg,
                                    user_old: "",
                                    id_user_old: this.props.user_auth_info.user_id,
                                    vlan: value.vlan,
                                    id_vlan: value.id_vlan,
                                    dhcp_pool: value.dhcp_pool,
                                    id_dhcp_pool: value.id_dhcp_pool,
                                    ip_address_network: value.ip_address_network,
                                    networkMask: value.networkMask,
                                    defaultGeteway: defaultGeteway,
                                    date_reg: value.date_reg,
                                    date_old: null,
                                    id_status: value.id_status,
                                    name_status: value.name_status,
                                    status_network: 0,
                                    name_stat_network: ""
                                };

                                let lastNetworkInfo = {
                                    id_network: value.id_network,
                                    pool_address: this.props.selectNetwork_pool.label,
                                    id_dhcp_pool: this.props.selectDhcp.value,
                                    user_reg: value.user_reg,
                                    id_user_reg: value.id_user_reg,
                                    user_old: "",
                                    id_user_old: this.props.user_auth_info.user_id,
                                    vlan: this.props.selectVlan.label,
                                    id_vlan: this.props.selectVlan.value,
                                    dhcp_pool: this.props.selectDhcp.label,
                                    id_pool_address: this.props.selectNetwork_pool.value,
                                    ip_address_network: document.getElementById("update_ip_address_network").value,
                                    networkMask: value.networkMask,
                                    defaultGeteway: document.getElementById("update_defaultGeteway").value,
                                    date_reg: value.date_reg,
                                    date_old: null,
                                    id_status: value.id_status,
                                    name_status: value.name_status,
                                    status_network: 0,
                                    name_stat_network: ""
                                };

                                if (JSON.stringify(firstNetworkInfo) === JSON.stringify(lastNetworkInfo)) {
                                    alert("Информация не изменилась!");
                                    this.props.visibleUpdate(false, null);
                                } else {
                                    this.props.visibleUpdate(false, null);
                                    this.props.updateNetwork("http://localhost:8080/Network/UpdateNetwork/", Number(value.id_network), lastNetworkInfo);
                                }
                            }
                            else {
                                this.props.visibleUpdate(true, value.id_network);
                                this.props.VlanUpdateValue({ label: value.vlan, value: value.id_vlan });
                                this.props.dhcpUpdateValue({ label: value.dhcp_pool, value: value.id_dhcp_pool });
                                this.props.NetworkPoolUpdateValue({ label: value.pool_address, value: value.id_pool_address })
                            }
                        }}></Button>
                        <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-trash' onClick={() => {
                            if (window.confirm("Вы уверены, что хотите удалить запись?")) {
                                let defaultGeteway;
                                if (value.defaultGeteway === null || value.defaultGeteway === undefined) {
                                    defaultGeteway = "";
                                }
                                else {
                                    defaultGeteway = value.defaultGeteway;
                                }

                                let deleteNetwork = {
                                    id_network: value.id_network,
                                    pool_address: value.pool_address,
                                    id_pool_address: value.id_pool_address,
                                    user_reg: value.user_reg,
                                    id_user_reg: value.id_user_reg,
                                    user_old: "",
                                    id_user_old: this.props.user_auth_info.user_id,
                                    vlan: value.vlan,
                                    id_vlan: value.id_vlan,
                                    dhcp_pool: value.dhcp_pool,
                                    id_dhcp_pool: value.id_dhcp_pool,
                                    ip_address_network: value.ip_address_network,
                                    networkMask: value.networkMask,
                                    defaultGeteway: defaultGeteway,
                                    date_reg: "",
                                    date_old: "",
                                    id_status: value.id_status,
                                    name_status: value.name_status,
                                    status_network: 0,
                                    name_stat_network: ""
                                };

                                this.props.deleteNetwork("http://localhost:8080/Network/DeleteNetwork/", value.id_network, deleteNetwork);
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
                            const createNetwork = {
                                id_network: 0,
                                pool_address: this.props.selectNetwork_pool.label,
                                id_pool_address: this.props.selectNetwork_pool.value,
                                user_reg: value.user_reg,
                                id_user_reg: this.props.user_auth_info.user_id,
                                user_old: "",
                                id_user_old: 0,
                                vlan: this.props.selectVlan.label,
                                id_vlan: this.props.selectVlan.value,
                                dhcp_pool: this.props.selectDhcp.label,
                                id_dhcp_pool: this.props.selectDhcp.value,
                                ip_address_network: document.getElementById("update_ip_address_network").value,
                                networkMask: 24,
                                defaultGeteway: document.getElementById("update_defaultGeteway").value,
                                date_reg: null,
                                date_old: null,
                                id_status: 1,
                                name_status: "",
                                status_network: 0,
                                name_stat_network: ""
                            };

                            this.props.setNetwork("http://localhost:8080/Network/CreateNetwork", createNetwork);
                            this.props.visibleUpdate(false, null);
                        }
                        else {
                            this.props.visibleUpdate(true, value.id_network);
                            this.props.StatusUpdateValue({ value: value.id_status, label: value.name_status });
                            this.props.VlanUpdateValue({ label: value.name_vlan, value: value.id_vlan });
                        }
                    }}></Button> <span> </span>
                        <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-minus' onClick={() => {
                            this.props.deleteNewLine(this.props.all_network);
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
                this.props.addNewLine(this.props.all_network);
                this.props.visibleUpdate(true, -1);
            }
        }}></Button>
    }

    render() {
        return (
            <div><PageFooter />
                <Panel header="Сети" />
                {this.network_table(this)}
                <div align={"right"}>
                    {this.addNewLine(this)}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        all_network: state.network_reduser.all_network,
        selectUserValue: state.user_reduser.selectUserValue,
        user_auth_info: state.user_reduser.user_auth_info,
        vlan_info: state.vlan_reduser.vlan_info,
        updateVisible: state.action_visible.updateVisible,
        selectStatus: state.status_reduser.selectStatus,
        status_action: state.status_reduser.status_action,
        network_pool: state.networ_pool_reduser.network_pool,
        selectNetwork_pool: state.networ_pool_reduser.selectNetwork_pool,
        device_info: state.device_reduser.device_info,
        selectDeviceValue: state.device_reduser.selectDeviceValue,
        selectVlan: state.vlan_reduser.selectVlan,
        selectDhcp: state.dhcp_reduser.selectDhcpValue,
        dhcp_info: state.dhcp_reduser.dhcp_info,
        checkDHCP: state.dhcp_reduser.checkDHCP
    };
};
const mapDispatchToProps = dispatch => {
    return {
        fetchAllNetwork: url => dispatch(getAllNetwork("all", url)),
        visibleUpdate: (status, id) => dispatch(setStatusShowDialog("updateVisible", status, id)),
        StatusUpdateValue: (data) => dispatch(getStatusSelect("selectStatusValue", data)),
        VlanUpdateValue: (data) => dispatch(getVlanSelect("selectVlanValue", data)),
        NetworkPoolUpdateValue: (data) => dispatch(getNetworkPoolSelect("selectNetwork_poolValue", data)),
        addNewLine: (data) => dispatch(addNewLine("addNewLine", data)),
        deleteNewLine: (data) => dispatch(addNewLine("deleteNewLine", data)),
        fetchAllNetworkPool: url => dispatch(getAllNetworkPool("all", url)),
        fetchAllVLAN: url => dispatch(getAllVlan("all", url)),
        fetchAllDhcp: url => dispatch(getAllDHCP("all", url)),
        dhcpUpdateValue: (data) => dispatch(getDHCPSelect("selectDHCPValue", data)),
        updateNetwork: (url, id, data) => dispatch(updateNetwork("all",url, id, data)),
        deleteNetwork: (url, id, data) => dispatch(updateNetwork("all",url, id, data)),
        setNetwork:(url, data) => dispatch(setNetwork("all", url, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Network)