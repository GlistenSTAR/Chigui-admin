import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addHighlight } from "../../../actions/highlightAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class HighlightAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            price: 0,
            time: 0,
            serviceName: '',
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-highlight-modal').modal('hide');
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onHighlightAdd = e => {
        
        e.preventDefault();
        const newHighlight = {
            price: this.state.price,
            time: this.state.time,
            serviceName: this.state.serviceName,
        };
        this.props.addHighlight(newHighlight);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-highlight-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar resaltado</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onHighlightAdd} id="add-highlight">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="price">Precio</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.price}
                                                id="price"
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
                                                id="time"
                                                type="number"
                                                error={errors.time}
                                                className={classnames("form-control", {
                                                    invalid: errors.time
                                                })}/>
                                            <span className="text-danger">{errors.time}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="serviceName">Nombre del Servicio</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.serviceName}
                                                id="serviceName"
                                                type="text"
                                                error={errors.serviceName}
                                                className={classnames("form-control", {
                                                    invalid: errors.serviceName
                                                })}/>
                                            <span className="text-danger">{errors.serviceName}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="add-highlight"
                                    type="submit"
                                    className="btn btn-primary">
                                    Agregar resaltado
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HighlightAddModal.propTypes = {
    addHighlight:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    highlight: state.highlight,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addHighlight }
)(withRouter(HighlightAddModal));
