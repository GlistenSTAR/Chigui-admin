import React from 'react'
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCylinder } from "../../../../actions/carAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

class CylinderDeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            model_id: this.props.model_id,
            year_id: this.props.year_id,
            cylinder_id: this.props.cylinderdata._id,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.cylinderdata) {
            this.setState({
                id : nextProps.id,
                model_id: nextProps.model_id,
                year_id: nextProps.year_id,
                cylinder_id: nextProps.cylinderdata._id
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        
        $('#delete-cylinder-modal').modal('hide');
            
        
    }
    onCylinderDelete = e => {
        e.preventDefault();
        
        const deletCylinder = {
            id: this.state.id,
            model_id: this.state.model_id,
            year_id: this.state.year_id,
            cylinder_id: this.state.cylinder_id,
        };
        console.log("cylinder-delete-modal", deletCylinder);
        this.props.deleteCylinder(deletCylinder);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="delete-cylinder-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">¿Realmente quieres eliminar estos datos?</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form noValidate onSubmit={this.onCylinderDelete} id="delete-cylinder"></form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="delete-cylinder"
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

CylinderDeleteModal.propTypes = {
    deleteCylinder: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    car: state.car,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { deleteCylinder }
)(withRouter(CylinderDeleteModal));
