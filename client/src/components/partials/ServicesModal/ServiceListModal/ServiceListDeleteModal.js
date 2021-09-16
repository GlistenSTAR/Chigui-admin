import React from 'react'
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteServiceList } from "../../../../actions/servicesAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

class ServiceListDeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            data_id: this.props.data_id,
            subdata_id: this.props.subdata_id,
            servicelist_index: this.props.servicelist.index,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.servicelist) {
            this.setState({
                id : nextProps.id,
                data_id: nextProps.data_id,
                subdata_id: nextProps.subdata_id,
                servicelist_index: nextProps.servicelist.index
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        
        $('#delete-servicelist-modal').modal('hide');
            
        
    }
    onServicelistDelete = e => {
        e.preventDefault();
        
        const deletServicelist = {
            id: this.state.id,
            data_id: this.state.data_id,
            subdata_id: this.state.subdata_id,
            servicelist_index: this.state.servicelist_index,
        };
        console.log("servicelist-delete-modal", deletServicelist);
        this.props.deleteServiceList(deletServicelist);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="delete-servicelist-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">¿Realmente quieres eliminar estos datos?</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form noValidate onSubmit={this.onServicelistDelete} id="delete-servicelist"></form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="delete-servicelist"
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

ServiceListDeleteModal.propTypes = {
    deleteServiceList: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    services: state.services,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { deleteServiceList }
)(withRouter(ServiceListDeleteModal));
