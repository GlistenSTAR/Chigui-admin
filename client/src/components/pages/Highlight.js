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
import $ from 'jquery';

import HightlightAddModal from "../partials/HighlightModal/HighlightAddModal"
import HighlightUpdateModal from "../partials/HighlightModal/HighlightUpdateModal";
import HighlightDeleteModal from "../partials/HighlightModal/HighlightDeleteModal";
import ServiceAddModal from "../partials/HighlightModal/ServiceAddModal";
import ServiceUpdateModal from "../partials/HighlightModal/ServiceUpdateModal";
import ServiceDeleteModal from "../partials/HighlightModal/ServiceDeleteModal";
class Highlight extends Component {

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
                key: "price",
                text: "Precio",
                className: "price",
                align: "left",
                sortable: true,
            },
            {
                key: "time",
                text: "Tiempoe",
                className: "time",
                align: "left",
                sortable: true,
            },
            {
                key: "serviceName",
                text: "Nombre del Servicio",
                className: "serviceName",
                align: "left",
                sortable: true,
            },
            {
                key: "detaildata",
                text: "Datos detallados",
                className: "detaildata",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button className="btn btn-primary btn-sm"
                                onClick={() => this.getServiceData(record)}
                                style={{marginRight: '5px'}}>
                                    Datos detallados
                                {/* <i className="fa fa-serve"></i> */}
                            </button>
                        </Fragment>
                    );
                }
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
                                data-target="#update-highlight-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-highlight-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];
        this.columns_detaildata = [ 
            {
                key: "detail",
                text: "Detalle",
                className: "detail",
                align: "left",
                sortable: true,
                cell: (record) => {
                    return (
                        <span>{record}</span>
                    );
                }
            },                    
            {
                key: "action",
                text: "Acción",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: (record,index) => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-service-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => 
                                    this.ediServiceData(record, index)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-service-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteServiceData(index)}
                                >
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
            filename: "Battery",
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
            records: [],
        };

        this.state = {
            currentRecord: {
                id: '',
                price: 0,
                time: 0,
                serviceName: '',
                data: [
                    {detail: [],}

                ],
            },
            servicedata: { 
             }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
        $('#detaildata').hide();
    };

    componentWillReceiveProps(nextProps) {
        this.getData();
    }

    getData() {
        axios
            .post("/api/highlight/get")
            .then(res => {
                this.setState({ records: res.data});
                let currentRecord = this.state.currentRecord;
                if(currentRecord.id !== '') {
                   const  matchedIndex = res.data.findIndex(itme => itme.id === currentRecord.id);
                   if ( matchedIndex > -1) {
                    this.setState({
                        currentRecord: res.data[matchedIndex]
                    });
                   } else {
                    $('#detaildata').hide();
                   }
                    
                }
            })
            .catch();
        
    }

    editRecord(record) {
        this.setState({ currentRecord: record});
    }
    deleteRecord(record) {
        this.setState({ currentRecord: record});
    }
    getServiceData(record) {
        this.setState({ currentRecord: record});
        $('#detaildata').show();        
    }
    ediServiceData(record, index) {
        let service = {
            service: "",
            index: 0,
        };
        service.service= record;
        service.index = index;
        this.setState({ servicedata: service });
    }
    deleteServiceData(index) {
        let service = {
            index: 0,
        };
        service.index = index;
        this.setState({ servicedata: service }); 
    }

    pageChange(pageData) {
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <HightlightAddModal />
                    <HighlightUpdateModal record={this.state.currentRecord}/>
                    <HighlightDeleteModal record={this.state.currentRecord}/>
                    <ServiceAddModal id={this.state.currentRecord.id}/>
                    <ServiceUpdateModal id={this.state.currentRecord.id} data={this.state.servicedata}/>
                    <ServiceDeleteModal id={this.state.currentRecord.id} data={this.state.servicedata}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-highlight-modal"><FontAwesomeIcon icon={faPlus}/> Agregar resaltado</button>
                            <h1 className="mt-2 text-primary">Lista destacada </h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            /> 
                        </div>
                        <hr/>
                        <div className="container-fluid" id="detaildata">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-service-modal"><FontAwesomeIcon icon={faPlus}/> Agregar servicio</button>
                            <h1 className="mt-2 text-primary">Lista de servicios</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.currentRecord.data[0].detail}
                                columns={this.columns_detaildata}
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

Highlight.propTypes = {
    highlight: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    highlight: state.highlight,
    records: state.records
});

export default connect(
    mapStateToProps
)(Highlight);
