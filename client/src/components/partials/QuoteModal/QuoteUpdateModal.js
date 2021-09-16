import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateQuote } from "../../../actions/quoteAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class QuoteUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            name: this.props.record.name,
            email: this.props.record.email,
            phonenumber: this.props.record.phonenumber,
            detail: this.props.detail,
            date: this.props.record.date,
            time: this.props.record.time,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                name: nextProps.record.name,
                email: nextProps.record.email,
                phonenumber: nextProps.record.phonenumber,
                detail: nextProps.record.detail,
                date: nextProps.record.date,
                time: nextProps.record.time
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-quote-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'quote-update-name') {
            this.setState({ name: e.target.value });
        }
        if (e.target.id === 'quote-update-email') {
            this.setState({ email: e.target.value });
        }
        if (e.target.id === 'quote-update-phonenumber') {
            this.setState({ phonenumber: e.target.value });
        }
        if (e.target.id === 'quote-update-detail') {
            this.setState({ detail: e.target.value });
        }
        if (e.target.id === 'quote-update-date') {
            this.setState({ date: e.target.value });
        }
        if (e.target.id === 'quote-update-time') {
            this.setState({ time: e.target.value });
        }
    };

    onQuoteUpdate = e => {
        e.preventDefault();
        const newQuote = {
            _id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            phonenumber: this.state.phonenumber,
            detail: this.state.detail,
            date: this.state.date,
            time: this.state.time,
        };
        this.props.updateQuote(newQuote);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-quote-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Quote</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onQuoteUpdate} id="update-quote">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="quote-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                id="quote-update-name"
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
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                id="quote-update-email"
                                                type="email"
                                                error={errors.email}
                                                className={classnames("form-control", {
                                                    invalid: errors.email
                                                })}/>
                                              <span className="text-danger">{errors.email}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="phonenumber">Phone</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.phonenumber}
                                                id="quote-update-phonenumber"
                                                type="tel"
                                                error={errors.phonenumber}
                                                className={classnames("form-control", {
                                                    invalid: errors.phonenumber
                                                })}/>
                                              <span className="text-danger">{errors.phonenumber}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="detail">Detail</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.detail}
                                                id="quote-update-detail"
                                                type="text"
                                                error={errors.detail}
                                                className={classnames("form-control", {
                                                    invalid: errors.detail
                                                })}/>
                                              <span className="text-danger">{errors.detail}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="date">Date</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.date}
                                                id="quote-update-date"
                                                type="date"
                                                error={errors.date}
                                                className={classnames("form-control", {
                                                    invalid: errors.date
                                                })}/>
                                              <span className="text-danger">{errors.date}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="time">Time</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.time}
                                                id="quote-update-time"
                                                type="time"
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
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-quote"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Quote
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

QuoteUpdateModal.propTypes = {
    updateQuote: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    // auth: state.auth,
    quote: state.quote,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateQuote }
)(withRouter(QuoteUpdateModal));
