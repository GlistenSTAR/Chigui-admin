import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateService } from "../../../actions/highlightAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ServiceUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            service: this.props.data.service,
            index: this.props.data.index,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                id : nextProps.id,
                service: nextProps.data.service,
                index: nextProps.data.index,
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
        if (e.target.id === 'service-update-service') {
            this.setState({ service: e.target.value });
        }
    };

    onServiceUpdate = e => {
        e.preventDefault();
        const newService = {
            id: this.state.id,
            service: this.state.service,
            index: this.state.index
        };
        this.props.updateService(newService);
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
                                        value={this.state.id || ''}
                                        id="service-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="service">Servicio de actualización</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.service}
                                                id="service-update-service"
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
        )
    }
}

ServiceUpdateModal.propTypes = {
    updateService: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    highlight: state.highlight,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateService }
)(withRouter(ServiceUpdateModal));
