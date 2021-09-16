import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDetailData } from '../../../actions/reviewAction';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class DetailDataAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            subname: "",
            description: "",
            price: 0,
            time: 0,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-detaildata-modal').modal('hide');
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onDetailDataAdd = e => {
        
        e.preventDefault();
        const newDetailData = {
            id:this.props.id,
            subname: this.state.subname,
            description: this.state.description,
            price: this.state.price,
            time: this.state.time,
        };
        this.props.addDetailData(newDetailData);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-detaildata-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar datos detallados</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onDetailDataAdd} id="add-detaildata">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="subname">Subnombre</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.subname}
                                                id="subname"
                                                type="text"
                                                error={errors.subname}
                                                className={classnames("form-control", {
                                                    invalid: errors.subname
                                                })}/>
                                            <span className="text-danger">{errors.subname}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="description">Descripción</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.description}
                                                id="description"
                                                type="text"
                                                error={errors.description}
                                                className={classnames("form-control", {
                                                    invalid: errors.description
                                                })}/>
                                            <span className="text-danger">{errors.description}</span>
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
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="add-detaildata"
                                    type="submit"
                                    className="btn btn-primary">
                                    Agregar datos detallados
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DetailDataAddModal.propTypes = {
    addDetailData:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    review: state.review,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addDetailData }
)(withRouter(DetailDataAddModal));
