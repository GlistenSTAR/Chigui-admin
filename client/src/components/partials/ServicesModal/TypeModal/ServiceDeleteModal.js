import React from 'react'
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteServices } from "../../../../actions/servicesAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

class ServiceDeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,            
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        
        $('#delete-service-modal').modal('hide');
            
        
    }

    onServiceDelete = e => {
        e.preventDefault();
        
        const deleteService = {
           _id: this.state.id,
        };
        console.log("service-delete-modal", deleteService);
        this.props.deleteServices(deleteService);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="delete-service-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">¿Realmente quieres eliminar estos datos?</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form noValidate onSubmit={this.onServiceDelete} id="delete-car"></form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="delete-car"
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

ServiceDeleteModal.propTypes = {
    deleteServices: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    services: state.services,
    // auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { deleteServices }
)(withRouter(ServiceDeleteModal));
