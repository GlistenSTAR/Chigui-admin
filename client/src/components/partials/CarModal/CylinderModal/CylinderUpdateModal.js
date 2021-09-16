import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCylinder } from "../../../../actions/carAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class CylinderUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            model_id: this.props.model_id,
            year_id: this.props.year_id,
            cylinder_id: this.props.cylinderdata._id,
            cylinderName: this.props.cylinderdata.cylinderName,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cylinderdata) {
            this.setState({
                id: nextProps.id,
                model_id: nextProps.model_id,
                year_id: nextProps.year_id,
                cylinder_id: nextProps.cylinderdata._id,
                cylinderName: nextProps.cylinderdata.cylinderName,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-cylinder-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'cylinder-update-cylinderName') {
            this.setState({ cylinderName: e.target.value });
        }
    }
    
    onCylinderUpdate = e => {
        e.preventDefault();
        const newCylinder = {
            id: this.state.id,
            model_id: this.state.model_id,
            year_id: this.state.year_id,
            cylinder_id: this.state.cylinder_id,
            cylinderName: this.state.cylinderName,
        };
        console.log("year-update-modal", newCylinder);
        this.props.updateCylinder(newCylinder);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-cylinder-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Actualizar cilindro</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onCylinderUpdate} id="update-cylinder">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id || ''}
                                        id="model-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="cylinderName">Nombre del cilindro</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.cylinderName}
                                                id="cylinder-update-cylinderName"
                                                type="text"
                                                error={errors.cylinderName}
                                                className={classnames("form-control", {
                                                    invalid: errors.cylinderName
                                                })}/>
                                              <span className="text-danger">{errors.cylinderName}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="update-cylinder"
                                    type="submit"
                                    className="btn btn-primary">
                                    Actualizar cilindro
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
CylinderUpdateModal.propTypes = {
    updateCylinder: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    car: state.car,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateCylinder }
)(withRouter(CylinderUpdateModal));
