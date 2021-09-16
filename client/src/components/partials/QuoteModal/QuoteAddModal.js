import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addQuote } from "../../../actions/quoteAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class QuoteAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            phonenumber: 0,
            detail:"",
            date:"",
            time:"",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-quote-modal').modal('hide');
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onQuoteAdd = e => {
        
        e.preventDefault();
        const newQuote = {
            name: this.state.name,
            email: this.state.email,
            phonenumber: this.state.phonenumber,
            detail: this.state.detail,
            date: this.state.date,
            time: this.state.time,
        };
        this.props.addQuote(newQuote);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-quote-modal" data-reset="true">
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
                                            <label htmlFor="email">Teléfono</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                error={errors.email}
                                                id="email"
                                                type="email"
                                                className={classnames("form-control", {
                                                    invalid: errors.email
                                                })}
                                            />
                                            <span className="text-danger">{errors.email}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="phonenumber">Teléfono</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.phonenumber}
                                                error={errors.phonenumber}
                                                id="phonenumber"
                                                type="tel"
                                                className={classnames("form-control", {
                                                    invalid: errors.phonenumber
                                                })}
                                            />
                                            <span className="text-danger">{errors.phonenumber}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="detail">Detalle</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.detail}
                                                error={errors.detail}
                                                id="detail"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.detail
                                                })}
                                            />
                                            <span className="text-danger">{errors.detail}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="date">Fecha</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.date}
                                                error={errors.date}
                                                id="date"
                                                type="date"
                                                className={classnames("form-control", {
                                                    invalid: errors.date
                                                })}
                                            />
                                            <span className="text-danger">{errors.date}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="time">Fecha</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.time}
                                                error={errors.time}
                                                id="time"
                                                type="time"
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

QuoteAddModal.propTypes = {
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
)(withRouter(QuoteAddModal));
