import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { getElectronic } from "../../actions/electronicAction";
import ElectronicAddModal from "../partials/ElectronicModal/ElectronicAddModal";
import ElectronicUpdateModal from "../partials/ElectronicModal/ElectronicUpdateModal";
import ElectronicDeleteModal from "../partials/ElectronicModal/ElectronicDeleteModal";
import { toast, ToastContainer} from "react-toastify";

class Electronic extends Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                text: (
                        <input type="checkbox" className="form-control"/>
                    )
                ,
                cell: record => {
                    return (
                        <input type="checkbox" className="form-control"/>
                    )
                },
                align:'center',
                width:'40px'
            },
            {
                key: "description",
                text: "Descripción",
                className: "description",
                sortable: true,
            },
            {
                key: "name",
                text: "Nombre",
                className: "name",
                sortable: true,
            },
            {
                key: "price",
                text: "Precio",
                className: "price",
                sortable: true
            },
            {
                key: "time",
                text: "Tiempo",
                className: "time",
                sortable: true
            },
            {
                key: "action",
                text: "Acción",
                className: "action",
                width: 100,
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-electronic-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-electronic-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Electronic",
            no_data_text: '¡Datos no encontrados!',
            button: {
                excel: true,
                print: true,
                csv: true
            },
            language: {
                length_menu: "Show _MENU_ resultado por página",
                filter: "Filtrar en registros...",
                info: "Demostración _START_ para _END_ of _TOTAL_ registros",
                pagination: {
                    first: "<<",
                    previous: "<",
                    next: ">",
                    last: ">>"
                }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                id: '',
                descroption: '',
                name: '',
                price: 0,
                time: 0,
            }
        };
    }

    componentDidMount() {
        this.props.getElectronic();
        this.setState({
            records: this.props.electronic.electronic
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            records: nextProps.electronic.electronic
        });
    }
    editRecord(record) {
        this.setState({ currentRecord: record});
    }
    deleteRecord(record) {
        this.setState({ currentRecord: record});
    }

    pageChange(pageData) {
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <ElectronicAddModal/>
                    <ElectronicUpdateModal record={this.state.currentRecord}/>
                    <ElectronicDeleteModal record={this.state.currentRecord} />
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-electronic-modal"><FontAwesomeIcon icon={faPlus}/> Agregar electrónico</button>
                            <h1 className="mt-2 text-primary">Lista electrónica</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        );
    }

}

Electronic.propTypes = {
    getElectronic: PropTypes.func.isRequired,
    electronic: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    electronic: state.electronic,  
    // records: state.records
});

export default connect(
    mapStateToProps,
    { getElectronic }
)(Electronic);
