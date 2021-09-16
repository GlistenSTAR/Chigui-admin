import React from 'react'
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteBattery } from "../../../actions/batteryActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

class BatteryDeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            brand: this.props.record.brand,
            price: this.props.record.price,
            referrence: this.props.record.referrence,
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
        
        $('#delete-battery-modal').modal('hide');
            
        
    }

    // onChange = e => {
    //     this.setState({ [e.target.id]: e.target.value });
    // };

    onBatteryDelete = e => {
        e.preventDefault();
        
        const deleteBattery = {
           _id: this.state.id,
        };
        this.props.deleteBattery(deleteBattery);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="delete-battery-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">¿Realmente quieres eliminar estos datos?</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form noValidate onSubmit={this.onBatteryDelete} id="delete-battery"></form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="delete-battery"
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

BatteryDeleteModal.propTypes = {
    deleteBattery: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    battery: state.battery,
    // auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { deleteBattery }
)(withRouter(BatteryDeleteModal));
