import React, {useEffect, useState} from "react";
import axios from "axios"
import {Link, useParams} from "react-router-dom";
import PageFooter from "../../../componets/footer/PageFooter"

export default function Nodes() {

    const [nodes, setNodes] = useState([])

    const {nodesId} = useParams()

    useEffect(() => {
        loadNodes();
    }, []);

    const loadNodes = async () => {
        const result = await axios.get("http://localhost:8080/Nodes/NodesAll")
        setNodes(result.data)
    }


    const deleteNodes = async (nodesId) => {
        await axios.delete(`http://localhost:8080/Nodes/DeleteNodes/${nodesId}`)
        loadNodes()
    }

    return (
        <div>
            <PageFooter/>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th className="text-center" scope="col">#</th>
                            <th className="text-center" scope="col">Коммутационный центр</th>
                            <th className="text-center" scope="col">Ответственный</th>
                            <td>
                                <Link className="btn btn-success mx-2"
                                      to="/addNodes">Добавить коммут-центр</Link>
                            </td>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            nodes.map((node, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td className="text-center">{node.nameNodes}</td>
                                    <td className="text-center">{node.userOtv}</td>
                                    <td>
                                        <Link className="btn btn-outline-primary mx-2"
                                              to={`/editNodes/${node.idNodes}`}>Обновить</Link>
                                        <button className="btn btn-danger mx-2"
                                                onClick={()=>deleteNodes(node.idNodes)}>Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}