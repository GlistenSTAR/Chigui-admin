import React from 'react'
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteSubdata } from "../../../../actions/servicesAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

class SubdataDeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            data_id: this.props.data_id,
            subdata_id: this.props.subdata._id,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.subdata) {
            this.setState({
                id : nextProps.id,
                data_id: nextProps.data_id,
                subdata_id: nextProps.subdata._id
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        
        $('#delete-subdata-modal').modal('hide');
            
        
    }
    onSubdataDelete = e => {
        e.preventDefault();
        
        const deleteSubdata = {
            id: this.state.id,
            data_id: this.state.data_id,
            subdata_id: this.state.subdata_id
        };
        console.log("subdata-delete-modal", deleteSubdata);
        this.props.deleteSubdata(deleteSubdata);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="delete-subdata-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">¿Realmente quieres eliminar estos datos?</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form noValidate onSubmit={this.onSubdataDelete} id="delete-subdata"></form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="delete-subdata"
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

SubdataDeleteModal.propTypes = {
    deleteSubdata: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    services: state.services,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { deleteSubdata }
)(withRouter(SubdataDeleteModal));
