import React from 'react'
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteModel } from "../../../../actions/carAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

class ModelDeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            Model_id: this.props.modeldata._id,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.modeldata) {
            this.setState({
                id : nextProps.id,
                Model_id: nextProps.modeldata._id,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        
        $('#delete-model-modal').modal('hide');
            
        
    }
    onModelDelete = e => {
        e.preventDefault();
        
        const deleteModel = {
            id: this.state.id,
            Model_id: this.state.Model_id,
        };
        console.log("model-delete-modal", deleteModel);
        this.props.deleteModel(deleteModel);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="delete-model-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">¿Realmente quieres eliminar estos datos?</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form noValidate onSubmit={this.onModelDelete} id="delete-model"></form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Confirmar</button>
                                <button
                                    form="delete-model"
                                    type="submit"
                                    className="btn btn-primary">
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ModelDeleteModal.propTypes = {
    deleteModel: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    car: state.car,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { deleteModel }
)(withRouter(ModelDeleteModal));
