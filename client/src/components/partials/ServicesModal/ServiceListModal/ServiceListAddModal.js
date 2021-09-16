import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addServiceList } from '../../../../actions/servicesAction';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ServiceListAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            serviceitem: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-servicelist-modal').modal('hide');
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onServicelistAdd = e => {
        
        e.preventDefault();
        const newServicelist = {
            id:this.props.id,
            data_id: this.props.data_id,
            subdata_id: this.props.subdata_id,
            serviceitem: this.state.serviceitem,
        };
        console.log("servicelist-add-modal", newServicelist);
        this.props.addServiceList(newServicelist);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-servicelist-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar servicio</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onServicelistAdd} id="add-servicelist">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="serviceitem">Nombre del Servicio</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.serviceitem}
                                                id="serviceitem"
                                                type="text"
                                                error={errors.serviceitem}
                                                className={classnames("form-control", {
                                                    invalid: errors.serviceitem
                                                })}/>
                                            <span className="text-danger">{errors.serviceitem}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="add-servicelist"
                                    type="submit"
                                    className="btn btn-primary">
                                    Agregar servicio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ServiceListAddModal.propTypes = {
    addServiceList:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    services: state.services,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addServiceList }
)(withRouter(ServiceListAddModal));
