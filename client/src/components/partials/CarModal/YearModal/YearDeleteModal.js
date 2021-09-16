import React from 'react'
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteYear } from "../../../../actions/carAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

class YearDeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            model_id: this.props.model_id,
            year_id: this.props.yeardata._id,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.yeardata) {
            this.setState({
                id : nextProps.id,
                model_id: nextProps.model_id,
                year_id: nextProps.yeardata._id
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        
        $('#delete-year-modal').modal('hide');
            
        
    }
    onYearDelete = e => {
        e.preventDefault();
        
        const deleteYear = {
            id: this.state.id,
            model_id: this.state.model_id,
            year_id: this.state.year_id
        };
        console.log("year-delete-modal", deleteYear);
        this.props.deleteYear(deleteYear);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="delete-year-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">¿Realmente quieres eliminar estos datos?</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form noValidate onSubmit={this.onYearDelete} id="delete-year"></form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="delete-year"
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

YearDeleteModal.propTypes = {
    deleteYear: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    car: state.car,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { deleteYear }
)(withRouter(YearDeleteModal));
