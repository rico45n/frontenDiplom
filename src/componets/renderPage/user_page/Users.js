import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import PageFooter from '../../footer/PageFooter';


import {connect} from "react-redux";
import {deleteUser, getUser, setUser, updateUser} from "../../../action_creator/user_creator/user_creator";
import {Button} from "primereact/button";
import {setStatusShowDialog} from "../../../action_creator/action_users_creator";

class Users extends Component {
    constructor(props) {
        super(props);
        this.items = [
            {
                label: 'Добавить',
                icon: 'pi pi-fw pi-plus',
                command: () => {this.props.visible(true)}
            }
        ];
    }
    componentDidMount() {
        this.props.fetchAllUser("http://localhost:8080/User/AllUser");
        this.props.visible(false, null);
        this.props.visibleUpdate(false,null);

    }

    tableUsers(){
        return <DataTable value= {this.props.user_info} responsive={true} scrollable={true}>
            <Column field="last_name" header="Фамилия"
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.user_id)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_last_name" defaultValue={value.last_name} style={{textAlign:'center'}} />
                                </span>
                               </div>
                        }
                        else{
                            return <div>
                                {value.last_name}
                            </div>
                        }
                    }}
            ></Column>
            <Column field="first_name" header="Имя"
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.user_id)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_first_name" defaultValue={value.first_name} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.first_name}
                            </div>
                        }
                    }}></Column>
            <Column field="middle_name" header="Отчество"
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.user_id)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_middle_name" defaultValue={value.middle_name} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.middle_name}
                            </div>
                        }
                    }}></Column>
            <Column field="email" header="Email"
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.user_id)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_email" defaultValue={value.email} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.email}
                            </div>
                        }
                    }}></Column>
            <Column field="phone" header="Номер телефона"
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.user_id)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_phone" defaultValue={value.phone} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.phone}
                            </div>
                        }
                    }}></Column>
            <Column field="user_login" header="Логин"
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.user_id)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_user_login" defaultValue={value.user_login} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.user_login}
                            </div>
                        }
                    }}></Column>
           
            <Column field="user_role" header="Роль"
                    style={{textAlign:'center'}} sortable={true} filter={true} filterMatchMode="contains"
                    body={(value) => {
                        if (this.props.updateVisible.visible === true && this.props.updateVisible.str === value.user_id)
                        {return <div>
                                <span className="p-float-label">
                                    <InputText id = "update_user_role" defaultValue={value.user_role} style={{textAlign:'center'}} />
                                </span>
                        </div>
                        }
                        else{
                            return <div>
                                {value.user_role}
                            </div>
                        }
                    }}></Column>

            <Column style={{width:'6%'}} field="user_id" header="Действие" body={(value) => {
                return <div>
                    <Button className="p-button-warning p-button-rounded" icon='pi pi-fw pi-pencil' onClick={() => {
                        if(this.props.updateVisible.visible === true){
                            const lastUser = {
                                user_id: value.user_id,
                                user_login: document.getElementById("update_user_login").value,
                                user_password: document.getElementById("update_user_password").value,
                                last_name: document.getElementById("update_last_name").value,
                                first_name: document.getElementById("update_first_name").value,
                                middle_name: document.getElementById("update_middle_name").value,
                                email: document.getElementById("update_email").value,
                                phone: document.getElementById("update_phone").value,
                                user_role: document.getElementById("update_user_role").value
                            };
                            this.props.updateUser("http://localhost:8080/User/UpdateUser/",value.user_id,lastUser)
                            this.props.visibleUpdate(false, null);
                        }
                        else {
                            this.props.visibleUpdate(true, value.user_id);
                            console.log(value);
                        }

                    }}></Button>  <span> </span>
                    <Button className="p-button-rounded p-button-danger" icon='pi pi-fw pi-trash' onClick={()=>{
                        if(window.confirm("Вы уверены, что хотите удалить запись?")){
                            this.props.deleteUser("http://localhost:8080/User/DeleteUser/", value.user_id);
                        }
                        else{
                        }
                    }}>
                    </Button>
                </div>
            }}
            ></Column>
        </DataTable>
    }

    createUser() {
        return <Dialog header="Создание пользователя"  visible={ this.props.visible_dialog}  style={{ width: '80%' }} modal={true} onHide={() => this.props.visible(false)}>
                          <span className="p-float-label">
                              <InputText id = "user_login" />
                              <label htmlFor="user_login">Логин</label>
                          </span>
              <br/>
              <span className="p-float-label">
                              <InputText id = "user_password"/>
                              <label htmlFor="user_password">Пароль</label>
                          </span>
              <br/>
              <span className="p-float-label">
                              <InputText id = "last_name" />
                              <label htmlFor="last_name">Фамилия</label>
                          </span>
              <br/>
              <span className="p-float-label">
                              <InputText id = "first_name"/>
                              <label htmlFor="first_name">Имя</label>
                          </span>
              <br/>
              <span className="p-float-label">
                              <InputText id = "middle_name" />
                              <label htmlFor="middle_name">Отчество</label>
                          </span>
              <br/>
              <span className="p-float-label">
                              <InputText id = "email"/>
                              <label htmlFor="email">Email</label>
                          </span>
              <br/>
              <span className="p-float-label">
                              <InputText id = "phone" />
                              <label htmlFor="phone">Телефон</label>
                          </span>
              <br/>
              <span className="p-float-label">
                              <InputText id = "user_role" />
                              <label htmlFor="user_role">Роль</label>
              </span>

              <Button label="Click" icon="pi pi-check" onClick = {() =>{
                  const addUserJson = {
                      user_login: document.getElementById("user_login").value,
                      user_password: document.getElementById("user_password").value,
                      last_name: document.getElementById("last_name").value,
                      first_name: document.getElementById("first_name").value,
                      middle_name: document.getElementById("middle_name").value,
                      email: document.getElementById("email").value,
                      phone: document.getElementById("phone").value,
                      user_role: document.getElementById("user_role").value
                  }
                  let countFirst = this.props.user_info.length;
                  this.props.setUser("http://localhost:8080/User/AddUser", addUserJson);
                  let countLast = this.props.user_info.length;

                  if(countFirst === countLast){
                      alert("Ошибка при добавлении! Проверьте данные!")
                  }
                  else{
                      alert("Запись добавлена!");
                      this.props.visible(false);
                  }
              }} />
          </Dialog>

    }
    render() {
        return (
            <div><PageFooter/>
                <Menubar model={this.items}/>
                <Panel header="Пользователи системы">
                    {this.tableUsers(this)}
                </Panel>
                    {this.createUser(this)}
            </div>
        );
    };
}

const  mapStateToProps  = state => {
    return {
        user_info: state.user_reduser.user_info,
        user_auth_info: state.user_reduser.user_auth_info,
        visible_dialog: state.action_visible.visible.visible,
        deleteVisible: state.action_visible.deleteVisible.visible,
        updateVisible: state.action_visible.updateVisible
    };
};
const  mapDispatchToProps = dispatch =>{
    return {
        fetchAllUser: url => dispatch(getUser("all",url)),
        deleteUser: (url, data)  => dispatch(deleteUser("all",url,data)),
        setUser: (url, data) => dispatch(setUser("all",url,data)),
        updateUser: (url, user_id, data) => dispatch(updateUser("all",url, user_id, data)),
        visible: status => dispatch(setStatusShowDialog("showDialog",status)),
        visibleUpdate: (status,id) => dispatch(setStatusShowDialog("updateVisible",status,id))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Users)



