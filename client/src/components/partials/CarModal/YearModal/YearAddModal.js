import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addYear } from '../../../../actions/carAction';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class YearAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            date: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-year-modal').modal('hide');
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onYearAdd = e => {
        
        e.preventDefault();
        const newYear = {
            id:this.props.id,
            model_id: this.props.model_id,
            date: this.state.date,
        };
        console.log("year-add-modal", newYear);
        this.props.addYear(newYear);

    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-year-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar año</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onYearAdd} id="add-year">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="date">Año</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.date}
                                                id="date"
                                                type="text"
                                                error={errors.date}
                                                className={classnames("form-control", {
                                                    invalid: errors.date
                                                })}/>
                                            <span className="text-danger">{errors.date}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="add-year"
                                    type="submit"
                                    className="btn btn-primary">
                                    Agregar año
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

YearAddModal.propTypes = {
    addYear:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    car: state.car,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addYear }
)(withRouter(YearAddModal));
