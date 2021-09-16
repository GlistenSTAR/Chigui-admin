import React from 'react'
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteDetailData } from "../../../actions/reviewAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

class DetailDataDeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id0 : this.props.id,
            id: this.props.detailData._id,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.detailData) {
            this.setState({
                id0: nextProps.id,
                id: nextProps.detailData._id,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        
        $('#delete-detaildata-modal').modal('hide');
            
        
    }
    onDetailDataDelete = e => {
        e.preventDefault();
        
        const deleteDetailData = {
            _id0: this.state.id0,
            _id: this.state.id,
        };
        this.props.deleteDetailData(deleteDetailData);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="delete-detaildata-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">¿Realmente quieres eliminar estos datos?</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form noValidate onSubmit={this.onDetailDataDelete} id="delete-detaildata"></form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="delete-detaildata"
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

DetailDataDeleteModal.propTypes = {
    deleteDetailData: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    review: state.review,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { deleteDetailData }
)(withRouter(DetailDataDeleteModal));
