import React from 'react'
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteElectronic } from '../../../actions/electronicAction';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

class ElectronicDeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            description: this.props.record.description,
            name: this.props.record.name,
            price: this.props.record.price,
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
        
        $('#delete-electronic-modal').modal('hide');
            
        
    }

    // onChange = e => {
    //     this.setState({ [e.target.id]: e.target.value });
    // };

    onElectronicDelete = e => {
        e.preventDefault();
        
        const deleteElectronic = {
           _id: this.state.id,
        };
        this.props.deleteElectronic(deleteElectronic);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="delete-electronic-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">¿Realmente quieres eliminar estos datos?</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form noValidate onSubmit={this.onElectronicDelete} id="delete-electronic"></form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="delete-electronic"
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

ElectronicDeleteModal.propTypes = {
    deleteElectronic: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    electronic: state.electronic,
    // auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { deleteElectronic }
)(withRouter(ElectronicDeleteModal));
