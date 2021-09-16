import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateReview } from "../../../actions/reviewAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ReviewUpdateModal extends React.Component {

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
                type: nextProps.record.type,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-review-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'review-update-type') {
            this.setState({ type: e.target.value });
        }
    };

    onReviewUpdate = e => {
        e.preventDefault();
        const newReview = {
            _id: this.state.id,
            type: this.state.type,
        };
        this.props.updateReview(newReview);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-review-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Actualizar revisión</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onReviewUpdate} id="update-review">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="review-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="type">Escribe</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.type}
                                                id="review-update-type"
                                                type="text"
                                                error={errors.type}
                                                className={classnames("form-control", {
                                                    invalid: errors.type
                                                })}/>
                                              <span className="text-danger">{errors.type}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="update-review"
                                    type="submit"
                                    className="btn btn-primary">
                                    Actualizar revisión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReviewUpdateModal.propTypes = {
    updateReview: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    review: state.review,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateReview }
)(withRouter(ReviewUpdateModal));
