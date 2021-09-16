import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateDetailData } from "../../../actions/reviewAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class DetailDataUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id0 : this.props.id,
            id: this.props.detailData._id,
            subname: this.props.detailData.subname,
            description: this.props.detailData.description,
            price: this.props.detailData.price,
            time: this.props.detailData.time,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.detailData) {
            this.setState({
                id0: nextProps.id,
                id: nextProps.detailData._id,
                subname: nextProps.detailData.subname,
                description: nextProps.detailData.description,
                time: nextProps.detailData.time,
                price: nextProps.detailData.price,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-detaildata-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'detaildata-update-subname') {
            this.setState({ subname: e.target.value });
        }
        if (e.target.id === 'detaildata-update-description') {
            this.setState({ description: e.target.value });
        }
        if (e.target.id === 'detaildata-update-price') {
            this.setState({ price: e.target.value });
        }
        if (e.target.id === 'detaildata-update-time') {
            this.setState({ time: e.target.value });
        }
    };

    onDetailDataUpdate = e => {
        e.preventDefault();
        const newDetailData = {
            _id0: this.state.id0,
            _id: this.state.id,
            subname: this.state.subname,
            description: this.state.description,
            time: this.state.time,
            price: this.state.price
        };
        this.props.updateDetailData(newDetailData);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-detaildata-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Actualizar datos detallados</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onDetailDataUpdate} id="update-detaildata">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id || ''}
                                        id="detaildata-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="subname">Subnombre</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.subname}
                                                id="detaildata-update-subname"
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
                                                id="detaildata-update-description"
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
                                                id="detaildata-update-time"
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
                                                id="detaildata-update-price"
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
                                    form="update-detaildata"
                                    type="submit"
                                    className="btn btn-primary">
                                    Actualizar datos detallados
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DetailDataUpdateModal.propTypes = {
    updateDetailData: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    review: state.review,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateDetailData }
)(withRouter(DetailDataUpdateModal));
