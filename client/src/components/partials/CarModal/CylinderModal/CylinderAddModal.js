import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCylinder } from '../../../../actions/carAction';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class CylinderAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            cylinderName: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-cylinder-modal').modal('hide');
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onCylinderAdd = e => {
        
        e.preventDefault();
        const newCylinder = {
            id:this.props.id,
            model_id: this.props.model_id,
            year_id: this.props.year_id,
            cylinderName: this.state.cylinderName,
        };
        console.log("cylinder-add-modal", newCylinder);
        this.props.addCylinder(newCylinder);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-cylinder-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar cilindro</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onCylinderAdd} id="add-cylinder">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="cylinderName">Nombre del cilindro</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.cylinderName}
                                                id="cylinderName"
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
                                    form="add-cylinder"
                                    type="submit"
                                    className="btn btn-primary">
                                    Agregar cilindro
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CylinderAddModal.propTypes = {
    addCylinder:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    car: state.car,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addCylinder }
)(withRouter(CylinderAddModal));
