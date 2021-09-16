import React from 'react'
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteReview } from "../../../actions/reviewAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

class ReviewDeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            type: this.props.record.type,
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
        
        $('#delete-review-modal').modal('hide');
            
        
    }

    // onChange = e => {
    //     this.setState({ [e.target.id]: e.target.value });
    // };

    onReviewDelete = e => {
        e.preventDefault();
        
        const deleteReview = {
           _id: this.state.id,
        };
        this.props.deleteReview(deleteReview);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="delete-review-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">¿Realmente quieres eliminar estos datos?</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form noValidate onSubmit={this.onReviewDelete} id="delete-review"></form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="delete-review"
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

ReviewDeleteModal.propTypes = {
    deleteReview: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    review: state.review,
    // auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { deleteReview }
)(withRouter(ReviewDeleteModal));
