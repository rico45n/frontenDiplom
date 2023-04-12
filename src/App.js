import React, {Component} from 'react';
import './App.css';


import FormAuth from './componets/renderPage/auth_page/Auth.js';
import UserPage from './componets/renderPage/user_page/UserPage.js';


import Devices from './componets/renderPage/device_page/Devices.js';
import TypeDevices from './componets/renderPage/device_page/TypeDevices.js';

import Room from './componets/renderPage/room_page/Room.js';


import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Home from "./testing/pages/Home";
import AddUsers from "./testing/users/AddUsers";
import EditUsers from "./testing/users/EditUser";
import AddRoom from "./testing/room/AddRoom";
import EditRoom from "./testing/room/EditRoom"
import AddNodes from "./testing/nodes/AddNodes";
import AddCrosses from "./testing/crosses/AddCrosses";
import EditCrosses from "./testing/crosses/EditCrosses";
import AddTypeDevices from "./testing/typeDevices/AddTypeDevices";
import EditTypeDevices from "./testing/typeDevices/EditTypeDevices";
import Crosses from "./componets/renderPage/crosses/Crosses";
import AddDevices from "./testing/devices/AddDevices";
import Nodes from "./componets/renderPage/nodes/Nodes";
import EditDevices from "./testing/devices/EditDevices";
import EditNodes from "./testing/nodes/EditNodes";
import DHCP from "./componets/renderPage/dhcp/DHCP";
import AddDHCP from "./testing/dhcp/AddDHCP";
import EditDHCP from "./testing/dhcp/EditDHCP";
import VLAN from "./componets/renderPage/vlan/VLAN";
import AddVlan from "./testing/vlan/AddVlan";
import EditVlan from "./testing/vlan/EditVlan";
import NetworkPool from "./componets/renderPage/nework/NetworkPool";
import AddPool from "./testing/network/AddPool";
import EditPool from "./testing/network/EditPool";
import Network from "./componets/renderPage/nework/Network";
import AddNetwork from "./testing/network/AddNetwork";
import EditNetwork from "./testing/network/EditNetwork";
import NetworkJournal from "./componets/renderPage/nework/NetworkJournal";
import AddNetworkJournal from "./testing/network/AddNetworkJournal";
import EditNetworkJurnal from "./testing/network/EditNetworkJurnal";
import CrossesDevice from "./componets/renderPage/nework/CrossesDevice";
import AddCrossesDev from "./testing/network/AddCrossesDev";
import ConfigurationDevices from "./componets/renderPage/nework/ConfigurationDevices";
import AddConfigurationDev from "./testing/network/AddConfigurationDev";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/auth" component={FormAuth}></Route>
                    <Route path="/userpage" component={UserPage}></Route>
                    <Route path="/NetworkJournal" component={NetworkJournal}></Route>
                    <Route path="/ConfigurationDevices" component={ConfigurationDevices}></Route>
                    <Route path="/Users" component={Home}></Route>
                    <Route path="/Crosses" component={Crosses}></Route>
                    <Route path="/Devices" component={Devices}></Route>
                    <Route path="/TypeDevices" component={TypeDevices}></Route>
                    <Route path="/Network" component={Network}></Route>
                    <Route path="/addNetwork" component={AddNetwork}/>
                    <Route path="/VLAN" component={VLAN}></Route>
                    <Route path="/addVLAN" component={AddVlan}/>
                    <Route path="/editVlan/:id" component={EditVlan}/>
                    <Route path="/DHCP" component={DHCP}></Route>
                    <Route path="/Nodes" component={Nodes}></Route>
                    <Route path="/editNodes/:id" component={EditNodes}/>
                    <Route path="/addDHCP" component={AddDHCP}/>
                    <Route path="/editDHCP/:id" component={EditDHCP}/>
                    <Route path="/NetworkPool" component={NetworkPool}></Route>
                    <Route path="/addNetworkPool" component={AddPool}/>
                    <Route path="/addNetworkJournal" component={AddNetworkJournal}></Route>
                    <Route path="/editNetworkPool/:id" component={EditPool}/>
                    <Route path="/editNetworkJournal/:id" component={EditNetworkJurnal}></Route>
                    <Route path="/CrossesDevice" component={CrossesDevice}></Route>
                    <Route path="/addCrossDev" component={AddCrossesDev}></Route>
                    <Route path="/Rooms" component={Room}></Route>
                    <Route path="/addUser" component={AddUsers}/>
                    <Route path="/editUser/:id" component={EditUsers}/>
                    <Route path="/AddRoom" component={AddRoom}/>
                    <Route path="/addConfigurationDevices" component={AddConfigurationDev}/>
                    <Route path="/editRoom/:id" component={EditRoom}/>
                    <Route path="/editNetwork/:id" component={EditNetwork}/>
                    <Route path="/addNodes" component={AddNodes}/>
                    <Route path="/addCrosses" component={AddCrosses}/>
                    <Route path="/editCrosse/:id" component={EditCrosses}/>
                    <Route path="/addTypeDevices" component={AddTypeDevices}/>
                    <Route path="/editTypeDevices/:idTypeDev" component={EditTypeDevices}/>
                    <Route path="/addDevices" component={AddDevices}/>
                    <Route path="/editDevice/:id" component={EditDevices}/>
                </Switch>
            </Router>

        );
    }
}

const mapStateToProps = state => {
    return {
        user_inf: state.user_info
    };
};

export default connect(mapStateToProps)(App);