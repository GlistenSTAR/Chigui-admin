import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateOil } from "../../../actions/oilAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class OilUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            name: this.props.record.name,
            price: this.props.record.price,
            referr: this.props.record.referr,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                name: nextProps.record.name,
                price: nextProps.record.price,
                referr: nextProps.record.referr,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-oil-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'oil-update-name') {
            this.setState({ name: e.target.value });
        }
        if (e.target.id === 'oil-update-price') {
            this.setState({ price: e.target.value });
        }
        if (e.target.id === 'oil-update-referr') {
            this.setState({ referr: e.target.value });
        }
    };

    onOilUpdate = e => {
        e.preventDefault();
        const newOil = {
            _id: this.state.id,
            name: this.state.name,
            price: this.state.price,
            referr: this.state.referr
        };
        // console.log("oil-update-modal", newOil);
        this.props.updateOil(newOil);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-oil-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Actualizar aceite</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onOilUpdate} id="update-oil">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="oil-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Actualizar aceite</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                id="oil-update-name"
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
                                                id="oil-update-price"
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
                                                    onChange={this.onChange}
                                                    value={this.state.referr || ""}
                                                    id="oil-update-referr"
                                                    type="text"
                                                    error={errors.referr}
                                                    className={classnames("form-control", {
                                                        invalid: errors.referr
                                                    })}/>
                                            <span className="text-danger">{errors.referr}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="update-oil"
                                    type="submit"
                                    className="btn btn-primary">
                                    Actualizar aceite
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

OilUpdateModal.propTypes = {
    updateOil: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    // auth: state.auth,
    oil: state.oil,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateOil }
)(withRouter(OilUpdateModal));
