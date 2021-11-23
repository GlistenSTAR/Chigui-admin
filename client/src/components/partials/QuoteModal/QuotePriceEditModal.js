import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editquote } from "../../../actions/quoteAction";
import { withRouter } from "react-router-dom";
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class QuotePriceEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id0 : this.props.id,
            id: this.props.modal_record._id,
            service_name: this.props.modal_record.service_name,
            price: this.props.modal_record.price,
            time: this.props.modal_record.time,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modal_record) {
            this.setState({
                id0 : nextProps.id,
                id: nextProps.modal_record._id,
                service_name: nextProps.modal_record.service_name,
                price: nextProps.modal_record.price,
                time: nextProps.modal_record.time,
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
        if (e.target.id === 'service_name') {
            this.setState({ service_name: e.target.value });
        }
        if (e.target.id === 'price') {
            this.setState({ price: e.target.value });
        }
        if (e.target.id === 'time') {
            this.setState({ time: e.target.value });
        }
    };

    onQuoteEdit = e => {

        e.preventDefault();
        const newQuote = {
            _id0: this.state.id0,
            _id: this.state.id,
            service_name: this.state.service_name,
            price: this.state.price,
            time: this.state.time
        };
        this.props.editquote(newQuote);

    };

    render() {
        return (
            <div>
                <div className="modal fade" id="eidt-quote-price-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar cotización</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form noValidate onSubmit={this.onQuoteEdit.bind(this)} id="add-quote">
                                <div className="modal-body">
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
                                                className={classnames("form-control", {
                                                    // invalid: errors.service_name
                                                })}/>
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
                                                id="price"
                                                type="text"
                                                className={classnames("form-control", {
                                                    // invalid: errors.price
                                                })}
                                            />
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
                                                className={classnames("form-control", {
                                                    // invalid: errors.time
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary">
                                        Agregar cotización
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

QuotePriceEditModal.propTypes = {
    onQuoteEdit: PropTypes.func.isRequired,
    editquote: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired.modal_record,
};

const mapStateToProps = state => ({
    quote: state.quote,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { editquote }
)(withRouter(QuotePriceEditModal));
