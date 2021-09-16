import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateData } from "../../../../actions/servicesAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class DataUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            data_id: this.props.data._id,
            name: this.props.data.name,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                id: nextProps.id,
                data_id: nextProps.data._id,
                name: nextProps.data.name,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-data-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'data-update-name') {
            this.setState({ name: e.target.value });
        }
    }
    
    onDataUpdate = e => {
        e.preventDefault();
        const newData = {
            id: this.state.id,
            data_id: this.state.data_id,
            name: this.state.name,
        };
        console.log("service-data-update-modal", newData);
        this.props.updateData(newData);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-data-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Actualizar datos</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onDataUpdate} id="update-data">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id || ''}
                                        id="model-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Nombre</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                id="data-update-name"
                                                type="text"
                                                error={errors.name}
                                                className={classnames("form-control", {
                                                    invalid: errors.name
                                                })}/>
                                              <span className="text-danger">{errors.name}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="update-data"
                                    type="submit"
                                    className="btn btn-primary">
                                    Actualizar datos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
DataUpdateModal.propTypes = {
    updateData: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    services: state.services,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateData }
)(withRouter(DataUpdateModal));
