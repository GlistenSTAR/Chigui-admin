import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCar } from "../../../../actions/carAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class CarAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            image: null,
            mark: "",
            errors: {},
        };
        this.imageRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        $('#add-car-modal').modal('hide');
        this.setState({
            image: null
        });
    }

    fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    });

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onChangeFile = e => {
        this.fileToDataUri(e.target.files[0])
            .then(dataUri => this.setState({ image: dataUri }));
    }
    onCarAdd = e => {
        e.preventDefault();

        const formData = new FormData();
        const file = this.imageRef.current.files[0];
        Boolean(file) && formData.append("mark", file);
        formData.append("name", this.state.name);
        this.setState({
            image: null
        });
        this.props.addCar(formData);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-car-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Car</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onCarAdd} id="add-car">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                id="name"
                                                type="text"
                                                error={errors.name}
                                                className={classnames("form-control", {
                                                    invalid: errors.name
                                                })} />
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
                                            {Boolean(this.state.image) ? <img src={this.state.image} /> : null}
                                            <button type="button" className="btn btn-primary" onClick={() => this.imageRef.current.click()}>Select image</button>
                                            <span className="text-danger">{errors.file}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-car"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Car
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CarAddModal.propTypes = {
    addCar: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    car: state.car,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addCar }
)(withRouter(CarAddModal));
