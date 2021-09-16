import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCar } from "../../../../actions/carAction"
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class CarUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            mark: this.props.record.mark,
            name: this.props.record.name,
            mark1: this.props.record.mark,
            errors: {},
        };
        this.imageRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                name: nextProps.record.name,
                mark: nextProps.record.mark,
                mark1: nextProps.record.mark,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

            $('#update-car-modal').modal('hide');
            
    }
    fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    });

    onChangeFile = e => {
        this.fileToDataUri(e.target.files[0])
            .then(dataUri => this.setState({ mark: dataUri }));
    };

    onChange = e => {
        if (e.target.id === 'car-update-name') {
            this.setState({ name: e.target.value });
        }
    };

    onCarUpdate = e => {
        e.preventDefault();
        const formData = new FormData();
        const file = this.imageRef.current.files[0];
        Boolean(file) && formData.append("mark", file);
        formData.append("name", this.state.name);
        formData.append("_id", this.state.id);
        formData.append("mark1", this.state.mark1);
        this.props.updateCar(formData);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-car-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Actualizar coche</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onCarUpdate} id="update-car">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="car-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Nombre</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                id="car-update-name"
                                                type="text"
                                                error={errors.name}
                                                className={classnames("form-control", {
                                                    invalid: errors.name
                                                })}/>
                                              <span className="text-danger">{errors.name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="file">Image File</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                hidden
                                                ref={this.imageRef}
                                                onChange={this.onChangeFile}
                                                className="mark-img"
                                                error={errors.file}
                                                id="file"
                                                type="file"

                                            />
                                            {Boolean(this.state.mark) ? <img src={this.state.mark} /> : null}
                                            <button type="button" className="btn btn-primary" onClick={() => this.imageRef.current.click()}>Select image</button>
                                            <span className="text-danger">{errors.file}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button
                                    form="update-car"
                                    type="submit"
                                    className="btn btn-primary">
                                    Actualizar coche
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CarUpdateModal.propTypes = {
    updateCar: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    // auth: state.auth,
    car: state.car,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateCar }
)(withRouter(CarUpdateModal));
