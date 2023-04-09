import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function EditNetwork(){
    const {id}=useParams()
    const [networks, setNetworks] = useState({
        idPoolAddress: "",
        idUserReg: "",
        idUserOld: "",
        idVlan: "",
        idDhcpPool: "",
        ipAddressNetwork: "",
        networkMask: "",
    })

    const {idPoolAddress, idUserReg, idUserOld, idVlan, idDhcpPool,ipAddressNetwork,networkMask} = networks

    const onInputChange = (e) => {
        setNetworks({...networks, [e.target.name]: e.target.value})
    };

    const loadNetworks = async () =>{
        const result = await  axios.get(`http://localhost:8080/Network/${id}`)
        setNetworks(result.data)
    }
    useEffect(() => {
        loadNetworks();
    }, []);

    const [users, setUsers] = useState([])
    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/User/AllUser")
        setUsers(result.data)
    }
    useEffect(() => {
        loadUsers();
    }, []);
    const options = users.map((user, index) => {
        return <option value={user.userId} key={index}>{user.fioUser}</option>;
    });


    const [pools, setPools] = useState([])
    const loadPools = async () => {
        const result = await axios.get("http://localhost:8080/Pool/PoolAll")
        setPools(result.data)
    }
    useEffect(() => {
        loadPools();
    }, []);
    const optionsPool = pools.map((pool, index) => {
        return <option value={pool.idPoolAddress} key={index}>{pool.namePool}</option>;
    });



    const [dhcps, setDhcps] = useState([])
    const loadDhcps = async () => {
        const result = await axios.get("http://localhost:8080/DHCP/DHCPAll")
        setDhcps(result.data)
    }
    useEffect(() => {
        loadDhcps();
    }, []);

    const optionsDhcp = dhcps.map((dhpc, index) => {
        return <option value={dhpc.idDhcpPool} key={index}>{dhpc.poolIP}</option>;
    });

    const [lans, setLans] = useState([])
    const loadLans = async () => {
        const result = await axios.get("http://localhost:8080/Vlan/VlanAll")
        setLans(result.data)
    }
    useEffect(() => {
        loadLans();
    }, []);

    const optionsLan = lans.map((lan, index) => {
        return <option value={lan.idVlan} key={index}>{lan.vlanName}</option>;
    });

    const onSubmit =async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/Network/UpdateNetwork/${id}` , networks)
        window.location.assign('http://localhost:3000/Network')
    }


    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
                <h2 className="text-center m-4">Обновить данные сети</h2>
                <form onSubmit={(e) => onSubmit(e)}>

                    <div className="mb-3">
                        <label htmlFor="idPoolAddress" className="form-label">
                            Пул сети
                        </label>
                        <select className="form-control" name="idPoolAddress" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsPool}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="ipAddressNetwork" className="form-label">
                            ip-адрес
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="ipAddressNetwork"
                            value={ipAddressNetwork}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="networkMask" className="form-label">
                            Маска сети
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="networkMask"
                            value={networkMask}
                            onChange={(e) => onInputChange(e)}
                            />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="idVlan" className="form-label" >
                            Наименование VLAN
                        </label>
                        <select className="form-control" name="idVlan" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsLan}
                        </select>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="idDhcpPool" className="form-label" >
                            DHCP пул
                        </label>
                        <select className="form-control" name="idDhcpPool" type="text" onChange={(e) => onInputChange(e)}>
                            {optionsDhcp}
                        </select>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="idUserReg" className="form-label" placeholder="Комутационный центр">
                            Пользователь создавший запись
                        </label>
                        <select className="form-control" name="idUserReg" type="text" onChange={(e) => onInputChange(e)}>
                            {options}
                        </select>

                    </div>

                    <div className="mb-3">
                        <label htmlFor="idUserOld" className="form-label" placeholder="Выберите ответственного">
                            Пользователь изменивший запись
                        </label>
                        <select className="form-control" name="idUserOld" type="text"
                                onChange={(e) => onInputChange(e)}>
                            {options}
                        </select>

                    </div>
                    <button type="submit" className="btn btn-success">Обновить</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/Network">Отмена</Link>
                </form>
            </div>

        </div>
    </div>
}