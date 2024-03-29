import React, { Component } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import  logo  from "../../img/logo.png";
import {Link} from "react-router-dom";
class Navbar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <Link className="navbar-brand" to="/"><img src={logo} className="logo" alt="logo"/></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav ml-auto">
                                {/* <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="settings"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Settings
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="settings">
                                        <a className="dropdown-item" href="#" onClick={this.onLogoutClick}>Logout</a>
                                    </div>
                                </li> */}
                                <li className="nav-item active text-center">
                                    <a className="nav-link" onClick={this.onLogoutClick}>
                                        <div align="center">Cerrar sesión <br/>({user.name})</div> 
                                        <FontAwesomeIcon icon={faSignOutAlt} size="2x"/> </a>
                                </li>
                            </ul>
                        </div>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);
