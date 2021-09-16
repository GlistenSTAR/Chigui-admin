import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateModel } from "../../../../actions/carAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ModelUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            Model_id: this.props.modeldata._id,
            modelName: this.props.modeldata.modelName,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modeldata) {
            this.setState({
                id: nextProps.id,
                Model_id: nextProps.modeldata._id,
                modelName: nextProps.modeldata.modelName,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-model-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'model-update-modelName') {
            this.setState({ modelName: e.target.value });
        }
    }
    
    onModelUpdate = e => {
        e.preventDefault();
        const newModel = {
            id: this.state.id,
            Model_id: this.state.Model_id,
            modelName: this.state.modelName,
        };
        console.log("model-update-modal", newModel);
        this.props.updateModel(newModel);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-model-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Modelo de actualización</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onModelUpdate} id="update-model">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id || ''}
                                        id="model-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="modelName">Nombre del modelo</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.modelName}
                                                id="model-update-modelName"
                                                type="text"
                                                error={errors.modelname}
                                                className={classnames("form-control", {
                                                    invalid: errors.modelName
                                                })}/>
                                              <span className="text-danger">{errors.modelName}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="update-model"
                                    type="submit"
                                    className="btn btn-primary">
                                    Modelo de actualización
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
ModelUpdateModal.propTypes = {
    updateModel: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    car: state.car,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateModel }
)(withRouter(ModelUpdateModal));
