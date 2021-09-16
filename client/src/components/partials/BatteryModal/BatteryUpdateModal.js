import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateBattery } from "../../../actions/batteryActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class BatteryUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            brand: this.props.record.brand,
            price: this.props.record.price,
            referrence: this.props.record.referrence,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                brand: nextProps.record.brand,
                price: nextProps.record.price,
                referrence: nextProps.record.referrence,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-battery-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'battery-update-brand') {
            this.setState({ brand: e.target.value });
        }
        if (e.target.id === 'battery-update-price') {
            this.setState({ price: e.target.value });
        }
        if (e.target.id === 'battery-update-referrence') {
            this.setState({ referrence: e.target.value });
        }
    };

    onBatteryUpdate = e => {
        e.preventDefault();
        const newBattery = {
            _id: this.state.id,
            brand: this.state.brand,
            price: this.state.price,
            referrence: this.state.referrence
        };
        console.log("newBattery", newBattery);
        this.props.updateBattery(newBattery);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-battery-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Actualizar batería</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onBatteryUpdate} id="update-battery">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="battery-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="brand">Marca</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.brand}
                                                id="battery-update-brand"
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
                                                id="battery-update-price"
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
                                                    onChange={this.onChange}
                                                    value={this.state.referrence || ""}
                                                    id="battery-update-referrence"
                                                    type="text"
                                                    error={errors.referrence}
                                                    className={classnames("form-control", {
                                                        invalid: errors.referrence
                                                    })}/>
                                            <span className="text-danger">{errors.referrence}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="update-battery"
                                    type="submit"
                                    className="btn btn-primary">
                                    Actualizar batería
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

BatteryUpdateModal.propTypes = {
    updateBattery: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    // auth: state.auth,
    battery: state.battery,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateBattery }
)(withRouter(BatteryUpdateModal));
