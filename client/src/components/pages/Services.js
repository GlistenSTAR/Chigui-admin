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
import ServiceAddModal from "../partials/ServicesModal/TypeModal/ServiceAddModal";
import ServiceUpdateModal from "../partials/ServicesModal/TypeModal/ServiceUpdateModal";
import ServiceDeleteModal from "../partials/ServicesModal/TypeModal/ServiceDeleteModal";
import DataAddModal from "../partials/ServicesModal/DataModal/DataAddModal";
import DataUpdateModal from "../partials/ServicesModal/DataModal/DataUpdateModal";
import DataDeleteModal from "../partials/ServicesModal/DataModal/DataDeleteModal";
import SubdataAddModal from "../partials/ServicesModal/SubDataModal/SubdataAddModal";
import SubdataUpdateModal from "../partials/ServicesModal/SubDataModal/SubdataUpdateModal";
import SubdataDeleteModal from "../partials/ServicesModal/SubDataModal/SubdataDeleteModal";
import ServiceListAddModal from "../partials/ServicesModal/ServiceListModal/ServiceListAddModal";
import ServiceListUpdateModal from "../partials/ServicesModal/ServiceListModal/ServiceListUpdateModal";
import ServiceListDeleteModal from "../partials/ServicesModal/ServiceListModal/ServiceListDeleteModal";
class Services extends Component {

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
                key: "service_type",
                text: "Tipo de servicio",
                className: "service_type",
                align: "center",
                sortable: true,
            },
            {
                key: "data",
                text: "Datos",
                className: "data",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.getServiceData(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-motorcycle"></i>
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
                align: "center",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-service-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editServicetype(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-service-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteServicetype(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];
        this.columns_data = [
            {
                key: "name",
                text: "Nombre",
                className: "name",
                align: "left",
                sortable: true,
            },
            {
                key: "subdata",
                text: "Datos secundarios",
                className: "subdata",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.getSubData(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-calendar-o"></i>
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
                                data-target="#update-data-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editData(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-data-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteData(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];
        this.columns_subdata = [
            {
                key: "subname",
                text: "Subnombre",
                className: "subname",
                align: "left",
                sortable: true,
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
                text: "Tiempo",
                className: "time",
                align: "left",
                sortable: true,
            },
            {
                key: "service_list",
                text: "Lista de servicios",
                className: "service_list",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.getServicelist(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-calendar-o"></i>
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
                                data-target="#update-subdata-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editSubData(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-subdata-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteSubData(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];
        this.columns_servicelist = [
            {
                key: "servicename",
                text: "Nombre del Servicio",
                className: "servicename",
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
                                data-target="#update-servicelist-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => 
                                    this.ediServiceData(record, index)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-servicelist-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteServiceData(index)}
                                >
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ]
        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Service",
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
            currentservice: {
                id: '',
                service_type: ''
            },
            currentdata: {
                _id: '',
                name: ''
            },
            currentsubdata: {
                _id: '',
                subname: '',
                price: 0,
                time: 0,
            },
            servicedata: { 
            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
        $('#data-table').hide();
        $('#subdata-table').hide();
        $('#subservice-table').hide();
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .post("/api/services/get")
            .then(res => {
                this.setState({ records: res.data});
                let currentservice = this.state.currentservice;
                let currentdata = this.state.currentdata;
                let currentsubdata = this.state.currentsubdata;
                if(currentservice.id !== '') {
                   const  matchedserviceIndex = res.data.findIndex(item => item.id === currentservice.id);
                   if (matchedserviceIndex > -1) {
                    this.setState({
                        currentservice: res.data[matchedserviceIndex]
                    });
                   } else {}
                    
                    if(currentdata._id !== '') {
                        const matcheddataIndex = res.data[matchedserviceIndex].data.findIndex(item => item._id === currentdata._id);
                        if (matcheddataIndex > -1) {
                            this.setState({
                                currentdata: res.data[matchedserviceIndex].data[matcheddataIndex]
                            });
                        } else {}
                        
                        if(currentsubdata._id !== '') {
                            const mactchedSubdataIndex = res.data[matchedserviceIndex].data[matcheddataIndex].subdata.findIndex(item=> item._id === currentsubdata._id);
                            if ( mactchedSubdataIndex >-1 ) {
                                this.setState({
                                    currentsubdata: res.data[matchedserviceIndex].data[matcheddataIndex].subdata[mactchedSubdataIndex]
                                });
                            } else {}
                            

                        }
                    }                
                }
                
                
            })
            .catch()
    }

    editServicetype(record) {
        this.setState({ currentservice: record});

    }
    deleteServicetype(record) {
        this.setState({ currentservice: record});
    }
    getServiceData(record) {
        this.setState({ currentservice: record });
        $('#data-table').show();
    }
    editData(record) {
        this.setState({currentdata: record });
    }
    deleteData(record) {
        this.setState({currentdata: record });
    }
    getSubData(record) {
        this.setState({currentdata: record});
        $('#subdata-table').show();
    }
    editSubData(record) {
        this.setState({currentsubdata: record});
    }
    deleteSubData(record) {
        this.setState({currentsubdata: record});
    }
    getServicelist (record) {
        this.setState({currentsubdata: record});
        $('#subservice-table').show();
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
                    <ServiceAddModal />
                    <ServiceUpdateModal record={this.state.currentservice}/>
                    <ServiceDeleteModal record={this.state.currentservice}/>
                    <DataAddModal id={this.state.currentservice.id}/>
                    <DataUpdateModal id={this.state.currentservice.id} data={this.state.currentdata}/>
                    <DataDeleteModal id={this.state.currentservice.id} data={this.state.currentdata}/>
                    <SubdataAddModal id={this.state.currentservice.id} data_id={this.state.currentdata._id}/>
                    <SubdataUpdateModal id={this.state.currentservice.id} data_id={this.state.currentdata._id} subdata={this.state.currentsubdata}/>
                    <SubdataDeleteModal id={this.state.currentservice.id} data_id={this.state.currentdata._id} subdata={this.state.currentsubdata}/>
                    <ServiceListAddModal id={this.state.currentservice.id} data_id={this.state.currentdata._id} subdata_id={this.state.currentsubdata._id}/>
                    <ServiceListUpdateModal id={this.state.currentservice.id} data_id={this.state.currentdata._id} subdata_id={this.state.currentsubdata._id} servicelist={this.state.servicedata}/>
                    <ServiceListDeleteModal id={this.state.currentservice.id} data_id={this.state.currentdata._id} subdata_id={this.state.currentsubdata._id} servicelist={this.state.servicedata}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-service-modal"><FontAwesomeIcon icon={faPlus}/> Agregar servicio</button>
                            <h1 className="mt-2 text-primary">Lista de servicios</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                        <hr/>
                        <div className="container-fluid" id="data-table">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-data-modal"><FontAwesomeIcon icon={faPlus}/> Agregar datos</button>
                            <h1 className="mt-2 text-primary">Lista de datos</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.currentservice.data}
                                columns={this.columns_data}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                        <hr/>
                        <div className="container-fluid" id="subdata-table">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-subdata-modal"><FontAwesomeIcon icon={faPlus}/> Agregar subdatos</button>
                            <h1 className="mt-2 text-primary">Lista de subdatos</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.currentdata.subdata}
                                columns={this.columns_subdata}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                        <hr/>
                        <div className="container-fluid" id="subservice-table">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-servicelist-modal"><FontAwesomeIcon icon={faPlus}/> Agregar subservicio</button>
                            <h1 className="mt-2 text-primary">Lista de subservicios</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.currentsubdata.service_list}
                                columns={this.columns_servicelist}
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

Services.propTypes = {
    services: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    services: state.services,  
    records: state.records
});

export default connect(
    mapStateToProps
)(Services);
