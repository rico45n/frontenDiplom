import React from "react";
import {Link} from "react-router-dom";

export default function Navbar(){
    return(
        <div>

            <nav className="navbar navbar-expand-lg bg-primary , navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" />
                    <Link className="btn btn-outline-light" to="/accountingSystem">Пользователи</Link>
                </div>

            </nav>
        </div>
    )
}