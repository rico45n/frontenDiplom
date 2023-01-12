import React, { Component } from 'react';
import './App.css';
import FormAuth from './componets/renderPage/auth_page/Auth.js';
import UserPage from './componets/renderPage/user_page/UserPage.js';
import NetworkJournal from './componets/renderPage/jurnal_page/NetworkJournal.js';
import CrossesDevice from './componets/renderPage/jurnal_page/CrossesDevice.js';
import ConfigurationDevices from './componets/renderPage/jurnal_page/ConfigurationDevices.js';
import Users from './componets/renderPage/user_page/Users.js';
import Crosses from './componets/renderPage/network_pages/Crosses.js';
import Devices from './componets/renderPage/device_page/Devices.js';
import TypeDevices from './componets/renderPage/device_page/TypeDevices.js';
import DHCP from './componets/renderPage/network_pages/DHCP.js';
import Network from './componets/renderPage/network_pages/Network.js';
import Nodes from './componets/renderPage/network_pages/Nodes.js';
import VLAN from './componets/renderPage/network_pages/VLAN.js';
import NetworkPool from './componets/renderPage/network_pages/NetworkPool.js';
import AnalysisIP from './componets/renderPage/network_pages/AnalysisIP.js';
import Room from './componets/renderPage/room_page/Room.js';
import Topologi from './componets/renderPage/topolog_page/Topologi.js';

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {getRefStatus} from "./action_creator/status_creator";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.RefStatus("http://localhost:8080/Status/StatusAll");
    }

    render() {
    return (
      <Router>
          <Switch>
            <Route path="/auth" component={FormAuth}></Route>
            <Route path="/userpage" component={UserPage}></Route>
            <Route path="/NetworkJournal" component={NetworkJournal}></Route>
            <Route path="/CrossesDevice" component={CrossesDevice}></Route>
            <Route path="/ConfigurationDevices" component={ConfigurationDevices}></Route>
            <Route path="/Users" component={Users}></Route>
            <Route path="/Crosses" component={Crosses}></Route>
            <Route path="/Devices" component={Devices}></Route>
            <Route path="/TypeDevices" component={TypeDevices}></Route>
            <Route path="/Network" component={Network}></Route>
            <Route path="/VLAN" component={VLAN}></Route>
            <Route path="/DHCP" component={DHCP}></Route>
            <Route path="/Nodes" component={Nodes}></Route>
            <Route path="/NetworkPool" component={NetworkPool}></Route>
            <Route path="/AnalysisIP" component={AnalysisIP}></Route>
            <Route path="/Rooms" component={Room}></Route>
            <Route path="/Topologi" component={Topologi}></Route>
          </Switch>
       </Router>

    );
  }
}
const  mapStateToProps  = state => {
  return {
    user_inf: state.user_info
  };
};
const  mapDispatchToProps = dispatch =>{
    return {
        RefStatus: url => dispatch(getRefStatus("all",url))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(App);