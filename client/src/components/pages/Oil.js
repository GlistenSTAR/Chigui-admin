import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer} from "react-toastify";
import { getOil } from "../../actions/oilAction";
import OilAddModal from "../partials/OilModal/OilAddModal";
import OilUpdateModal from "../partials/OilModal/OilUpdateModal";
import OilDeleteModal from "../partials/OilModal/OilDeleteModal";

class Oil extends Component {

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
                key: "name",
                text: "Nombre",
                className: "name",
                align: "left",
                sortable: true,
            },
            {
                key: "price",
                text: "Precio",
                className: "price",
                align: "left",
                sortable: true
            },
            {
                key: "referr",
                text: "Referencia",
                className: "referr",
                align: "left",
                sortable: true
            },
            {
                key: "action",
                text: "Acción",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-oil-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-oil-modal"
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
            filename: "Oil",
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
                brand: '',
                price: 0,
                reference: ''
            }
        };
    }

    componentDidMount() {
        this.props.getOil();
        this.setState({
            oil: this.props.oil.oil
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            records: nextProps.oil.oil
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
                    <OilAddModal />
                    <OilUpdateModal record={this.state.currentRecord}/>
                    <OilDeleteModal record={this.state.currentRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-oil-modal"><FontAwesomeIcon icon={faPlus}/> Agregar el aceite</button>
                            <h1 className="mt-2 text-primary">Lista de aceite</h1>
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

Oil.propTypes = {
    getOil: PropTypes.func.isRequired,
    oil: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    oil: state.oil,  
    records: state.records
});

export default connect(
    mapStateToProps,
    { getOil }
)(Oil);
