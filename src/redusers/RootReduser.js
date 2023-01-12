import { combineReducers } from 'redux';
import user_reduser from "./users_reduser/users_reduser";
import networ_pool_reduser from "./network_reduser/network_pool_reduser";
import device_reduser from "./device_reduser/device_reduser";
import type_device_reduser from "./device_reduser/type_device_reduser";
import room_reduser from "./room_reduser/room_reduser";
import nodes_reduser from "./network_reduser/nodes_reduser";
import crosses_reduser from "./network_reduser/crosses_reduser";
import dhcp_reduser from "./network_reduser/dhcp_reduser";
import pool_reduser from "./network_reduser/pool_reduser";
import vlan_reduser from "./network_reduser/vlan_reduser";
import configuration_reduser from "./journal_reduser/configuration_reduser";
import crossDevice_reduser from "./journal_reduser/crossDevice_reduser";
import networkJournal_reduser from "./journal_reduser/networkJournal_reduser";
import network_reduser from "./network_reduser/network_reduser";
import action_user_reduser from "./action_user_reduser";
import status_reduser from "./status_reduser";

const root_reduser = combineReducers({
   user_reduser: user_reduser,
   networ_pool_reduser: networ_pool_reduser,
   device_reduser: device_reduser,
   type_device_reduser: type_device_reduser,
   room_reduser: room_reduser,
   nodes_reduser: nodes_reduser,
   crosses_reduser: crosses_reduser,
   dhcp_reduser: dhcp_reduser,
   pool_reduser: pool_reduser,
   vlan_reduser: vlan_reduser,
   configuration_reduser: configuration_reduser,
   crossDevice_reduser: crossDevice_reduser,
   networkJournal_reduser: networkJournal_reduser,
   network_reduser: network_reduser,
   action_visible: action_user_reduser,
   status_reduser: status_reduser
})

export default root_reduser;