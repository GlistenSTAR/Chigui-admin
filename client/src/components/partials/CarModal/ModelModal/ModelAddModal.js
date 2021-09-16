import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addModel } from '../../../../actions/carAction';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ModelAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            modelname: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-model-modal').modal('hide');
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onModelAdd = e => {
        
        e.preventDefault();
        const newModel = {
            id:this.props.id,
            modelname: this.state.modelname,
        };
        console.log("model-add-modal", newModel);
        this.props.addModel(newModel);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-model-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar modelo</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onModelAdd} id="add-model">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="modelname">Nombre del modelo</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.modelname}
                                                id="modelname"
                                                type="text"
                                                error={errors.modelname}
                                                className={classnames("form-control", {
                                                    invalid: errors.modelname
                                                })}/>
                                            <span className="text-danger">{errors.modelname}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="add-model"
                                    type="submit"
                                    className="btn btn-primary">
                                    Agregar modelo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ModelAddModal.propTypes = {
    addModel:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    car: state.car,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addModel }
)(withRouter(ModelAddModal));
