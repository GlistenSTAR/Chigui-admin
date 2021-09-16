import React, { Component } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBacon, faBatteryHalf, faBolt, faBook, faBorderAll, faCar, faOilCan, faReceipt, faSignOutAlt, faThumbsUp, faUser, faUserAlt, faWrench} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {Link} from "react-router-dom";

class Sidebar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        //const { user } = this.props.auth;
        return (
            <div className="border-right h-100" id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <Link to="/dashboard" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faBorderAll}/>Dashboard</Link>
                    <Link to="/users" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faUserAlt}/>Users</Link>
                    <Link to="/electronic" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faBolt}/>Electronic</Link>
                    <Link to="/battery" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faBatteryHalf}/>Battery</Link>
                    <Link to="/car" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faCar}/>Car</Link>
                    <Link to="/review" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faBook}/>Review</Link>
                    <Link to="/oil" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faOilCan}/>Oil</Link>
                    <Link to="/highlight" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faThumbsUp}/>Highlight</Link>
                    <Link to="/quote" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faReceipt}/>Quote</Link>
                    <Link to="/services" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faWrench}/>Services</Link>
                    <Link className="list-group-item list-group-item-action" onClick={this.onLogoutClick} to="#"><FontAwesomeIcon icon={faSignOutAlt} />Logout </Link>
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Sidebar);
