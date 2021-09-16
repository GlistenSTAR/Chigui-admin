import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSubdata } from '../../../../actions/servicesAction';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class SubdataAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            subname: "",
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
        $('#add-subdata-modal').modal('hide');
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubdataAdd = e => {
        
        e.preventDefault();
        const newSubdata = {
            id:this.props.id,
            data_id: this.props.data_id,
            subname: this.state.subname,
            price: this.state.price,
            time: this.state.time,
        };
        console.log("service-subdata-add-modal", newSubdata);
        this.props.addSubdata(newSubdata);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-subdata-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar subdatos</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onSubdataAdd} id="add-subdata">
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
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="add-subdata"
                                    type="submit"
                                    className="btn btn-primary">
                                    Agregar subdatos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SubdataAddModal.propTypes = {
    addSubdata:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    services: state.services,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addSubdata }
)(withRouter(SubdataAddModal));
