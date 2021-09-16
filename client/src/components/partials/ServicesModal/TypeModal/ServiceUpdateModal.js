import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateServices } from "../../../../actions/servicesAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ServiceUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            service_type: this.props.record.service_type,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                service_type: nextProps.record.service_type,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-service-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'service-update-service_type') {
            this.setState({ service_type: e.target.value });
        }
        };
    

    onServiceUpdate = e => {
        e.preventDefault();
        const newService = {
            _id: this.state.id,
            service_type: this.state.service_type,
        };
        console.log("service-update-modal", newService);
        this.props.updateServices(newService);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-service-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Servicio de actualización</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onServiceUpdate} id="update-service">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="service-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="service_type">Servicio</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.service_type}
                                                id="service-update-service_type"
                                                type="text"
                                                error={errors.service_type}
                                                className={classnames("form-control", {
                                                    invalid: errors.service_type
                                                })}/>
                                              <span className="text-danger">{errors.service_type}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="update-service"
                                    type="submit"
                                    className="btn btn-primary">
                                    Servicio de actualización
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



ServiceUpdateModal.propTypes = {
    updateServices: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    // auth: state.auth,
    services: state.services,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateServices }
)(withRouter(ServiceUpdateModal));
