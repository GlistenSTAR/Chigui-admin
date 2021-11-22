import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {faUserAlt} from "@fortawesome/free-solid-svg-icons/faUserAlt";

class Dashboard extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        //const { user } = this.props.auth;
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <h1 className="mt-2 text-primary">Dashboard</h1>
                            <div className="row px-2">
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-primary text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Users</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p>
                                            <Link to="/users" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Users</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-secondary text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Battery</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p>
                                            <Link to="/battery" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Battery</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-info text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Electronic</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p>
                                                <Link to="/electronic" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Electronic</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-dark text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Car</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p>
                                                <Link to="/car" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Cars</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-dark text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Review</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p>
                                                <Link to="/review" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Review</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-dark text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Oil</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p>
                                                <Link to="/oil" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Oil</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-dark text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Highlight</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p>
                                                <Link to="/highlight" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Highlight</Link>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-dark text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Quote</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p>
                                                <Link to="/quote" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Quote</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-dark text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Services</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p>
                                                <Link to="/services" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Services</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
