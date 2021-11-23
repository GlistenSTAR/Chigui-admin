import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addFreeServices} from "../../../actions/freeServicesAction";
import {withRouter} from "react-router-dom";
import $ from 'jquery';

import Switch from '@mui/material/Switch';

import 'react-toastify/dist/ReactToastify.css';

class BatteryAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            service_name: '',
            time: '',
            free: false,
            guarantee: false,
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-freeServices-modal').modal('hide');
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    handleCheckChange = e => {
        this.setState({[e.target.id]: e.target.checked})
    }

    onFreeServicesAdd = e => {
        e.preventDefault();
        const newFreeServices = {
            service_name: this.state.service_name,
            time: this.state.time,
            free: this.state.free,
            guarantee: this.state.guarantee,
        };
        this.props.addFreeServices(newFreeServices);
    };

    render() {
        const {errors} = this.state;
        return (
            <div>
                <div className="modal fade" id="add-freeServices-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar batería</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onFreeServicesAdd} id="add-freeService">
                                    <div className="row mt-2">
                                        <div className="col-md-3 text-center">
                                            <label htmlFor="brand">Service Name : </label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.service_name}
                                                id="service_name"
                                                type="text"
                                                error={errors.service_name}
                                                className={classnames("form-control", {
                                                    invalid: errors.service_name
                                                })}/>
                                            <span className="text-danger">{errors.service_name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3 text-center">
                                            <label htmlFor="brand">Time : </label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.time}
                                                id="time"
                                                type="text"
                                                error={errors.time}
                                                className={classnames("form-control", {
                                                    invalid: errors.time
                                                })}/>
                                            <span className="text-danger">{errors.time}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3 text-center">
                                            <label htmlFor="brand">Free Servies: </label>
                                        </div>
                                        <div className="col-md-9">
                                            <Switch id="free"
                                                    defaultChecked={this.state.free}
                                                    style={{color: 'yellowgreen'}}
                                                    onChange={this.handleCheckChange.bind(this)}/>
                                            <span className="text-danger">{errors.free}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3 text-center">
                                            <label htmlFor="brand">Guarantee Servies: </label>
                                        </div>
                                        <div className="col-md-9">
                                            <Switch id="guarantee"
                                                    defaultChecked={this.state.guarantee}
                                                    style={{color: 'yellowgreen'}}
                                                    onChange={this.handleCheckChange.bind(this)}/>
                                            <span className="text-danger">{errors.guarantee}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="add-freeService"
                                    type="submit"
                                    className="btn btn-primary">
                                    Agregar Free Services
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

BatteryAddModal.propTypes = {
    addFreeServices: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    battery: state.battery,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {addFreeServices}
)(withRouter(BatteryAddModal));
