import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBattery } from "../../../actions/batteryActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class BatteryAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            brand: "",
            price: 0,
            referrence: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-battery-modal').modal('hide');
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onBatteryAdd = e => {
        
        e.preventDefault();
        const newBattery = {
            brand: this.state.brand,
            price: this.state.price,
            referrence: this.state.referrence
        };
        this.props.addBattery(newBattery);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-battery-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar batería</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onBatteryAdd} id="add-user">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="brand">Marca</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.brand}
                                                id="brand"
                                                type="text"
                                                error={errors.brand}
                                                className={classnames("form-control", {
                                                    invalid: errors.brand
                                                })}/>
                                            <span className="text-danger">{errors.brand}</span>
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
                                            <label htmlFor="referrence">Referencia</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.referrence}
                                                error={errors.referrence}
                                                id="referrence"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.referrence
                                                })}
                                            />
                                            <span className="text-danger">{errors.referrence}</span>
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
                                   Agregar batería
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
    addBattery: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    battery: state.battery,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addBattery }
)(withRouter(BatteryAddModal));
