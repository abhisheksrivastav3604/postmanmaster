import React, { Component } from "react";
import { Link } from "react-router-dom"
class navbar extends Component {
    state = {
    };
    render() {
        return (
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="#">
                    </Link>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <Link class="nav-link" to="/main">Home</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Workspaces
                                </a>
                                <ul class="dropdown-menu" style={{ margin: 0 }} aria-labelledby="navbarDropdown">
                                    <li><Link class="nav-link text-dark" to="/"></Link></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    API Network
                                </a>
                                <ul class="dropdown-menu" style={{ margin: 0 }} aria-labelledby="navbarDropdown">
                                    <li><Link class="nav-link text-dark" to="/">Private API Network</Link></li>
                                    <li><Link class="nav-link text-dark" to="/">Public API Network</Link></li>
                                    <li><Link class="nav-link text-dark" to="/">Partner APINetwork</Link></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/main">Explore</Link>
                            </li>
                        </ul>
                        <ul class="navbar-nav mr-auto ms-5">
                            <li class="nav-item">
                                <Link class="nav-link" to="/"></Link>
                            </li>
                        </ul>
                        <ul class="navbar-nav mr-auto ms-5">
                            <li class="nav-item">
                                <Link class="nav-link" to="/"></Link>
                            </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0  ms-5 me-5" >
                            <input class="form-control mr-sm-2" type="search" placeholder="   Search Postman" />
                        </form>
                        <ul class="navbar-nav mr-auto ms-5">
                            <li class="nav-item">
                                <Link class="nav-link" to="/"></Link>
                            </li>
                        </ul>
                        <button class="btn btn-sm btn-primary ms-5">+ Invite</button>
                        <ul class="navbar-nav mr-auto ms-4">
                            <li class="nav-item">
                                <Link data-toggle="tooltip" data-placement="down" title="Setting" style={{ "font-size": "19px" }}><i class="fa-solid fa-gear"></i></Link>
                            </li>
                        </ul>
                        <ul class="navbar-nav mr-auto ms-4">
                            <li class="nav-item">
                                <Link data-toggle="tooltip" data-placement="down" title="Notifications" style={{ "font-size": "19px" }}><i class="fa-regular fa-bell"></i></Link>
                            </li>
                        </ul>
                        <ul class="navbar-nav mr-auto ms-4">
                            <li class="nav-item">
                                <Link data-toggle="tooltip" data-placement="down" title="Manage Accounts" ><img style={{ "height": "25px" }} src="https://th.bing.com/th/id/OIP.3qwUMVqZBQjUQ0wIk5cJtQAAAA?pid=ImgDet&rs=1" /></Link>
                            </li>
                        </ul>
                        <ul class="navbar-nav mr-auto ms-4">
                            <li class="nav-item">
                                <button type="button" class="btn btn-light ms-4 btn-sm" onClick={this.handlesubmit}>Upgrade</button>
                                <button type="button" class="btn btn-light btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                </button>
                            </li>
                        </ul>



                    </div>
                </div>
            </nav>
        );

    }
}
export default navbar;