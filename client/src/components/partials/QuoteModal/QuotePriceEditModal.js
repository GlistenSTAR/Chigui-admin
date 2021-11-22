import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addQuote } from "../../../actions/quoteAction";
import { withRouter } from "react-router-dom";
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class QuotePriceEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            service_name: this.props.record.service_name,
            price: this.props.record.price,
            time: this.props.record.time,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                service_name: nextProps.record.service_name,
                price: nextProps.record.price,
                time: nextProps.record.time,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        $('#eidt-quote-price-modal').modal('hide');
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onQuoteAdd = e => {

        e.preventDefault();
        const newQuote = {
            service_name: this.state.service_name,
            price: this.state.price,
            time: this.state.time
        };
        this.props.addQuote(newQuote);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="eidt-quote-price-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar cotización</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onQuoteAdd} id="add-quote">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="service_name">ServiceName</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.service_name}
                                                id="service_name"
                                                type="text"
                                                error={errors.service_name}
                                                className={classnames("form-control", {
                                                    invalid: errors.service_name
                                                })}/>
                                            <span className="text-danger">{errors.service_name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="price">	Precio</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.price}
                                                error={errors.price}
                                                id="price"
                                                type="email"
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
                                                type="tel"
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
                                    form="add-quote"
                                    type="submit"
                                    className="btn btn-primary">
                                    Agregar cotización
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

QuotePriceEditModal.propTypes = {
    addQuote: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    quote: state.quote,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addQuote }
)(withRouter(QuotePriceEditModal));
