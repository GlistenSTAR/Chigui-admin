import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addElectronic } from '../../../actions/electronicAction';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ElectronicAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            description: "",
            price: 0,
            time: 0,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-electronic-modal').modal('hide');

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onElectronicAdd = e => {
        
        e.preventDefault();
        const newElectronic = {
            description: this.state.description,
            name: this.state.name,
            price: this.state.price,
            time: this.state.time
        };
        this.props.addElectronic(newElectronic);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-electronic-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar electrónico</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onElectronicAdd} id="add-user">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="description">Descripción</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.description}
                                                id="description"
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
                                                value={this.state.name || ""}
                                                id="name"
                                                type="text"
                                                error={errors.name}
                                                className={classnames("form-control", {
                                                    invalid: errors.name
                                                })}/>
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
                                                error={errors.price}
                                                id="price"
                                                type="number"
                                                className={classnames("form-control", {
                                                    invalid: errors.price
                                                })}
                                            />
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
                                                error={errors.time}
                                                id="time"
                                                type="number"
                                                className={classnames("form-control", {
                                                    invalid: errors.time
                                                })}
                                            />
                                            <span className="text-danger">{errors.time}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="add-user"
                                    type="submit"
                                    className="btn btn-primary">
                                    Agregar electrónico
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ElectronicAddModal.propTypes = {
    addElectronic: PropTypes.func.isRequired,
    
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    electronic: state.electronic,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addElectronic }
)(withRouter(ElectronicAddModal));
