import React from 'react'
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteHighlight } from "../../../actions/highlightAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

class HighDeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            price: this.props.record.price,
            time: this.props.record.time,
            serviceName: this.props.record.serviceName,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                price: nextProps.record.price,
                time: nextProps.record.time,
                serviceName: nextProps.record.serviceName,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        
        $('#delete-highlight-modal').modal('hide');
            
        
    }

    // onChange = e => {
    //     this.setState({ [e.target.id]: e.target.value });
    // };

    onHighlightDelete = e => {
        e.preventDefault();
        
        const deleteHighlight = {
           _id: this.state.id,
           price: this.state.price,
           time: this.state.time,
           serviceName: this.state.serviceName,
        };
        this.props.deleteHighlight(deleteHighlight);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="delete-highlight-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">¿Realmente quieres eliminar estos datos?</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form noValidate onSubmit={this.onHighlightDelete} id="delete-highlight"></form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="delete-highlight"
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

HighDeleteModal.propTypes = {
    deleteHighlight: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    highlight: state.highlight,
    // auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { deleteHighlight }
)(withRouter(HighDeleteModal));
