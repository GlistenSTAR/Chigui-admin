import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateElectronic } from '../../../actions/electronicAction';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ElectronicUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            description: this.props.record.description,
            name: this.props.record.name,
            price: this.props.record.price,
            time: this.props.record.time,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                description: nextProps.record.description,
                name: nextProps.record.name,
                price: nextProps.record.price,
                time: nextProps.record.time,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-electronic-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'electronic-update-description') {
            this.setState({ description: e.target.value });
        }
        if (e.target.id === 'electronic-update-name') {
            this.setState({ name: e.target.value });
        }
        if (e.target.id === 'electronic-update-price') {
            this.setState({ price: e.target.value });
        }
        if (e.target.id === 'electronic-update-time') {
            this.setState({ time: e.target.value });
        }
    };

    onElectronicUpdate = e => {
        e.preventDefault();
        const newElectronic = {
            _id: this.state.id,
            description: this.state.description,
            name: this.state.name,
            price: this.state.price,
            time: this.state.time
        };
        this.props.updateElectronic(newElectronic);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-electronic-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Actualización electrónica</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onElectronicUpdate} id="update-electronic">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="electronic-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="description">Descripción</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.description || ""}
                                                id="electronic-update-description"
                                                type="text"
                                                error={errors.description}
                                                className={classnames("form-control", {
                                                    invalid: errors.description
                                                })}/>
                                              <span className="text-danger">{errors.description}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Nombre</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                error={errors.name}
                                                id="electronic-update-name"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.name
                                                })}
                                            />
                                            <span className="text-danger">{errors.name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="price">Precio</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                    onChange={this.onChange}
                                                    value={this.state.price}
                                                    id="electronic-update-price"
                                                    type="number"
                                                    error={errors.price}
                                                    className={classnames("form-control", {
                                                        invalid: errors.price
                                                    })}/>
                                            <span className="text-danger">{errors.price}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="time">Tiempo</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                    onChange={this.onChange}
                                                    value={this.state.time}
                                                    id="electronic-update-time"
                                                    type="number"
                                                    error={errors.time}
                                                    className={classnames("form-control", {
                                                        invalid: errors.time
                                                    })}/>
                                            <span className="text-danger">{errors.time}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Servicio</button>
                                <button
                                    form="update-electronic"
                                    type="submit"
                                    className="btn btn-primary">
                                    Actualización electrónica
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ElectronicUpdateModal.propTypes = {
    updateElectronic: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    // auth: state.auth,
    electronic: state.electronic,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateElectronic }
)(withRouter(ElectronicUpdateModal));
