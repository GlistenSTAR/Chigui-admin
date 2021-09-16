import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateYear } from "../../../../actions/carAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class YearUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            model_id: this.props.model_id,
            year_id: this.props.yeardata._id,
            date: this.props.yeardata.date,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.yeardata) {
            this.setState({
                id: nextProps.id,
                model_id: nextProps.model_id,
                year_id: nextProps.yeardata._id,
                date: nextProps.yeardata.date,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-year-modal').modal('hide');
            
    }

    onChange = e => {
        if (e.target.id === 'year-update-date') {
            this.setState({ date: e.target.value });
        }
    }
    
    onYearUpdate = e => {
        e.preventDefault();
        const newYear = {
            id: this.state.id,
            model_id: this.state.model_id,
            year_id: this.state.year_id,
            date: this.state.date,
        };
        console.log("year-update-modal", newYear);
        this.props.updateYear(newYear);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-year-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Año de actualización</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onYearUpdate} id="update-year">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id || ''}
                                        id="model-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="date">Año</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.date}
                                                id="year-update-date"
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
                                    form="update-year"
                                    type="submit"
                                    className="btn btn-primary">
                                    Año de actualización
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
YearUpdateModal.propTypes = {
    updateYear: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    car: state.car,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateYear }
)(withRouter(YearUpdateModal));
