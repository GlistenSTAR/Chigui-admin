import React from 'react'
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteService } from "../../../actions/highlightAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

class ServiceDeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            index: this.props.data.index,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.data) {
            this.setState({
                id : nextProps.id,
                service: nextProps.data.service,
                index: nextProps.data.index,
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
            id: this.state.id,
            index: this.state.index,
        };
        console.log("service-delete-modal", deleteService);
        this.props.deleteService(deleteService);
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
                            <form noValidate onSubmit={this.onServiceDelete} id="delete-service"></form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Confirmar</button>
                                <button
                                    form="delete-service"
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
    deleteService: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    highlight: state.highlight,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { deleteService }
)(withRouter(ServiceDeleteModal));
