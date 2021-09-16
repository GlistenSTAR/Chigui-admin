import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateSubdata } from "../../../../actions/servicesAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class SubdataUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            data_id: this.props.data_id,
            subdata_id: this.props.subdata._id,
            subname: this.props.subdata.subname,
            price: this.props.subdata.price,
            time: this.props.subdata.time,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.subdata) {
            this.setState({
                id: nextProps.id,
                data_id: nextProps.data_id,
                subdata_id: nextProps.subdata._id,
                subname: nextProps.subdata.subname,
                price: nextProps.subdata.price,
                time: nextProps.subdata.time,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-subdata-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'subdata-update-subname') {
            this.setState({ subname: e.target.value });
        }
        if (e.target.id === 'subdata-update-price') {
            this.setState({ price: e.target.value });
        }
        if (e.target.id === 'subdata-update-time') {
            this.setState({ time: e.target.value });
        }
    }
    
    onSubdataUpdate = e => {
        e.preventDefault();
        const newSubdata = {
            id: this.state.id,
            data_id: this.state.data_id,
            subdata_id: this.state.subdata_id,
            subname: this.state.subname,
            price: this.state.price,
            time: this.state.time
        };
        console.log("service-subdata-update-modal", newSubdata);
        this.props.updateSubdata(newSubdata);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-subdata-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Actualizar subdatos</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onSubdataUpdate} id="update-subdata">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id || ''}
                                        id="subdata-update-id"
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
                                                id="subdata-update-subname"
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
                                            <label htmlFor="price">Precio</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.price}
                                                id="subdata-update-price"
                                                type="text"
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
                                                id="subdata-update-time"
                                                type="text"
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
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="update-subdata"
                                    type="submit"
                                    className="btn btn-primary">
                                    Actualizar subdatos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
SubdataUpdateModal.propTypes = {
    updateSubdata: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    services: state.services,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateSubdata }
)(withRouter(SubdataUpdateModal));
