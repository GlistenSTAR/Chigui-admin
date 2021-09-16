import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateHighlight } from "../../../actions/highlightAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class HighlightUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            price: this.props.record.price,
            time: this.props.record.time,
            serviceName: this.props.record.serviceName,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                price: nextProps.record.price,
                time: nextProps.record.time,
                serviceName: nextProps.record.serviceName,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-highlight-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'highlight-update-price') {
            this.setState({ price: e.target.value });
        }
        if (e.target.id === 'highlight-update-time') {
            this.setState({ time: e.target.value });
        }
        if (e.target.id === 'highlight-update-serviceName') {
            this.setState({ serviceName: e.target.value });
        }
    };

    onHighlightUpdate = e => {
        e.preventDefault();
        const newHighlight = {
            _id: this.state.id,
            price: this.state.price,
            time: this.state.time,
            serviceName: this.state.serviceName,
        };
        this.props.updateHighlight(newHighlight);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-highlight-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Actualizar lo destacado</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onHighlightUpdate} id="update-highlight">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="highlight-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="price">Precio</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.price}
                                                error={errors.price}
                                                id="highlight-update-price"
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
                                                id="highlight-update-time"
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
                                                id="highlight-update-serviceName"
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
                                    form="update-highlight"
                                    type="submit"
                                    className="btn btn-primary">
                                    Actualizar lo destacado
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HighlightUpdateModal.propTypes = {
    updateHighlight: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    highlight: state.highlight,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateHighlight }
)(withRouter(HighlightUpdateModal));
