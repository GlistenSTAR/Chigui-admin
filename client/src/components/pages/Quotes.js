import React, {Component, Fragment} from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {ToastContainer} from "react-toastify";
import $ from 'jquery';

import QuoteAddModal from "../partials/QuoteModal/QuoteAddModal";
import QuoteUpdateModal from "../partials/QuoteModal/QuoteUpdateModal";
import QuoteDeleteModal from "../partials/QuoteModal/QuoteDeleteModal";
import QuoteEditPriceModal from '../partials/QuoteModal/QuotePriceEditModal';

class Quotes extends Component {

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
                align: 'center',
                width: '40px'
            },
            {
                key: "name",
                text: "Nombre",
                className: "name",
                align: "left",
                sortable: true,
            },
            {
                key: "email",
                text: "Correo electrónico",
                className: "email",
                align: "left",
                sortable: true,
            },
            {
                key: "phonenumber",
                text: "Teléfono",
                className: "phonenumber",
                align: "left",
                sortable: true,
            },
            {
                key: "detail",
                text: "Detalle",
                className: "detail",
                align: "left",
                sortable: true,
            },
            {
                key: "date",
                text: "Fecha",
                className: "date",
                align: "left",
                sortable: true,
            },
            {
                key: "time",
                text: "Tiempo",
                className: "time",
                align: "left",
                sortable: true,
            },
            {
                key: "total_price",
                text: "Precio total",
                className: "total_price",
                align: "left",
                sortable: true,
            },
            {
                key: "Motor",
                text: "Motor",
                className: "motor",
                width: 50,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                // data-toggle="modal"
                                // data-target="#motor-review-data-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.getMotor(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-motorcycle"></i>
                            </button>
                        </Fragment>
                    )
                }
            },
            {
                key: "service",
                text: "Servicio",
                className: "service",
                width: 50,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                // data-toggle="modal"
                                // data-target="#motor-review-data-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.getService(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-wrench"></i>
                            </button>
                        </Fragment>
                    )
                }
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-quote-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-quote-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];
        this.columns_motor = [
            {
                key: "motorname",
                text: "Nombre del motor",
                className: "motorname",
                align: "left",
                sortable: true,
            },
            {
                key: "motormodel",
                text: "MotorModelo",
                className: "motormodel",
                align: "left",
                sortable: true,
            },
            {
                key: "motoryear",
                text: "Año del motor",
                className: "motoryear",
                align: "left",
                sortable: true,
            },
            {
                key: "motorCylinder",
                text: "Cilindro de motor",
                className: "motorCylinder",
                align: "left",
                sortable: true,
            },
        ];
        this.columns_service = [
            {
                key: "service_name",
                text: "ServiceName",
                className: "service_name",
                align: "left",
                sortable: true,
            },
            {
                key: "price",
                text: "Precio",
                className: "price",
                align: "left",
                sortable: true,
                cell: record => {
                    return (
                        <Fragment>
                            { parseInt(record.price) > 0 ?
                                record.price : <span style={{color: "red"}}>Fijar Precio</span> }
                        </Fragment>
                    );
                }
            },
            {
                key: "time",
                text: "Tiempo",
                className: "time",
                align: "left",
                sortable: true,
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: (record) => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#eidt-quote-price-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editServiceRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ]

        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            filename: "Quote",
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
                name: "",
                email: "",
                phonenumber: 0,
                detail: "",
                date: "",
                time: "",
            },
            currentEditRecord:{
                id: '',
                service_name: '',
                price: 0,
                time: 0,
            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
        $('#motor-table').hide();
        $('#service-table').hide();
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .post("/api/quote/get")
            .then(res => {
                this.setState({records: res.data});
                let currentRecord = this.state.currentRecord;
                if(currentRecord.id !== '') {
                   const  matchedIndex = res.data.findIndex(itme => itme.id === currentRecord.id);
                   if (matchedIndex > -1) {
                    this.setState({
                        currentRecord: res.data[matchedIndex]
                    }); 
                } else {
                    $('#service-table').hide();
                    }
                     
                 }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    editRecord(record) {
        this.setState({currentRecord: record});
    }

    deleteRecord(record) {
        this.setState({currentRecord: record});
    }

    getMotor(record) {
        this.setState({currentRecord: record});
        $('#motor-table').show();
    }

    getService(record) {
        this.setState({currentRecord: record});
        $('#service-table').show();
    }

    editServiceRecord = (record) => {

        this.setState({currentEditRecord: record});
        
    }

    pageChange(pageData) {
    }

    editquote = (data) => {
        console.log(data);
    }

    render() {
        return (
            <div>
                <Navbar/>
        <div>{this.state.currentEditRecord.price}</div>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <QuoteAddModal/>
                    <QuoteUpdateModal record={this.state.currentRecord}/>
                    <QuoteDeleteModal record={this.state.currentRecord}/>
                    <QuoteEditPriceModal id={this.state.currentRecord.id} modal_record={this.state.currentEditRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            {/* <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-quote-modal"><FontAwesomeIcon icon={faPlus}/> Agregar cotización</button> */}
                            <h1 className="mt-2 text-primary">Lista de cotizaciones</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                        <hr/>
                        <div className="container-fluid" id="motor-table">
                            {/* <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-quote-modal"><FontAwesomeIcon icon={faPlus}/> Add Motor</button> */}
                            <h1 className="mt-2 text-primary">Lista de motores</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.currentRecord.motor}
                                columns={this.columns_motor}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                        <hr/>
                        <div className="container-fluid" id="service-table">
                            {/* <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-quote-modal"><FontAwesomeIcon icon={faPlus}/> Add Service</button> */}
                            <h1 className="mt-2 text-primary">Lista de servicios</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.currentRecord.services}
                                columns={this.columns_service}
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

Quotes.propTypes = {
    quote: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    quote: state.quote,
    records: state.records
});

export default connect(
    mapStateToProps
)(Quotes);