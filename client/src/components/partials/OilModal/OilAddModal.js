import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addOil } from "../../../actions/oilAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class OilAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            price: 0,
            referr: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-oil-modal').modal('hide');
        // if (nextProps.auth !== undefined
        //     && nextProps.auth.user !== undefined
        //     && nextProps.auth.user.data !== undefined
        //     && nextProps.auth.user.data.message !== undefined) {
        //         console.log("nextprops", nextProps);
        //     $('#add-user-modal').modal('hide');
        //     toast(nextProps.auth.user.data.message, {
        //         position: toast.POSITION.TOP_CENTER
        //     });
        // }

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onOilAdd = e => {
        
        e.preventDefault();
        const newOil = {
            name: this.state.name,
            price: this.state.price,
            referr: this.state.referr
        };
        this.props.addOil(newOil);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-oil-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar el aceite</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onOilAdd} id="add-oil">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Nombre</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.name}
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
                                            <label htmlFor="referr">Referencia</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.referr}
                                                error={errors.referr}
                                                id="referr"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.referrence
                                                })}
                                            />
                                            <span className="text-danger">{errors.referr}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="add-oil"
                                    type="submit"
                                    className="btn btn-primary">
                                    Agregar el aceite
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

OilAddModal.propTypes = {
    addOil: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    oil: state.oil,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addOil }
)(withRouter(OilAddModal));
