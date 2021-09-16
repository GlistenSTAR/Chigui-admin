import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addService } from '../../../actions/highlightAction';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ServiceAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            service: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-service-modal').modal('hide');
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onServiceAdd = e => {
        
        e.preventDefault();
        const newService = {
            id:this.props.id,
            service: this.state.service,
        };
        this.props.addService(newService);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-service-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar servicio</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onServiceAdd} id="add-service">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="service">Servicio</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.service}
                                                id="service"
                                                type="text"
                                                error={errors.service}
                                                className={classnames("form-control", {
                                                    invalid: errors.service
                                                })}/>
                                            <span className="text-danger">{errors.service}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="add-service"
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

ServiceAddModal.propTypes = {
    addService:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    highlight: state.highlight,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addService }
)(withRouter(ServiceAddModal));
