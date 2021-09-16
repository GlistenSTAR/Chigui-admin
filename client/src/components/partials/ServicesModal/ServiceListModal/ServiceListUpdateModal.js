import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateServiceList } from "../../../../actions/servicesAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ServiceListUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            data_id: this.props.data_id,
            subdata_id: this.props.subdata_id,
            servicelist_index: this.props.servicelist.index,
            servicename: this.props.servicelist.service,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.servicelist) {
            this.setState({
                id: nextProps.id,
                data_id: nextProps.data_id,
                subdata_id: nextProps.subdata_id,
                servicelist_index: nextProps.servicelist.index,
                servicename: nextProps.servicelist.service,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-servicelist-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'servicelist-update-servicename') {
            this.setState({ servicename: e.target.value });
        }
    }
    
    onServiceListUpdate = e => {
        e.preventDefault();
        const newServicelist = {
            id: this.state.id,
            data_id: this.state.data_id,
            subdata_id: this.state.subdata_id,
            servicelist_index: this.state.servicelist_index,
            servicename: this.state.servicename,
        };
        console.log("servicelist-update-modal", newServicelist);
        this.props.updateServiceList(newServicelist);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-servicelist-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Servicio de actualización</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onServiceListUpdate} id="update-servicelist">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id || ''}
                                        id="model-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="servicename">Nombre del Servicio</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.servicename}
                                                id="servicelist-update-servicename"
                                                type="text"
                                                error={errors.servicename}
                                                className={classnames("form-control", {
                                                    invalid: errors.servicename
                                                })}/>
                                              <span className="text-danger">{errors.servicename}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="update-servicelist"
                                    type="submit"
                                    className="btn btn-primary">
                                    Servicio de actualización
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
ServiceListUpdateModal.propTypes = {
    updateServiceList: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    services: state.services,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateServiceList }
)(withRouter(ServiceListUpdateModal));
