import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addReview } from "../../../actions/reviewAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class ReviewAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            type: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-review-modal').modal('hide');
        // if (nextProps.auth !== undefined
        //     && nextProps.auth.user !== undefined
        //     && nextProps.auth.user.data !== undefined
        //     && nextProps.auth.user.data.message !== undefined) {
        //         console.log("nextprops", nextProps);
        //     $('#add-user-modal').modal('hide');
        //     toast(nextProps.auth.user.data.message, {
        //         position: toast.POSITION.TOP_CENTER
        //     });
        // }

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onReviewAdd = e => {
        
        e.preventDefault();
        const newReview = {
            type: this.state.type,
        };
        this.props.addReview(newReview);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-review-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar una opinión</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onReviewAdd} id="add-review">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="type">Escribe</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.type}
                                                id="type"
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
                                    form="add-review"
                                    type="submit"
                                    className="btn btn-primary">
                                    Agregar una opinión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReviewAddModal.propTypes = {
    addReview:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    review: state.review,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addReview }
)(withRouter(ReviewAddModal));
