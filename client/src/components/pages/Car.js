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
import { toast, ToastContainer} from "react-toastify";
import CarDeleteModal from "../partials/CarModal/MotorModal/CarDeleteModal";
import CarAddModal from "../partials/CarModal/MotorModal/CarAddModal";
import CarUpdateModal from "../partials/CarModal/MotorModal/CarUpdateModal";
import $ from 'jquery';
import { getCar } from "../../actions/carAction";

import ModelAddModal from "../partials/CarModal/ModelModal/ModelAddModal";
import ModelUpdateModal from "../partials/CarModal/ModelModal/ModelUpdateModal";
import ModelDeleteModal from "../partials/CarModal/ModelModal/ModelDeleteModal";
import YearAddModal from "../partials/CarModal/YearModal/YearAddModal";
import YearUpdateModal from "../partials/CarModal/YearModal/YearUpdateModal";
import YearDeleteModal from "../partials/CarModal/YearModal/YearDeleteModal";
import CylinderAddModal from "../partials/CarModal/CylinderModal/CylinderAddModal";
import CylinderUpdateModal from "../partials/CarModal/CylinderModal/CylinderUpdateModal";
import CylinderDeleteModal from "../partials/CarModal/CylinderModal/CylinderDeleteModal";
class Car extends Component {

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
                key: "mark",
                text: "Marcos",
                className: "mark",
                width: 100,
                sortable: true,
                cell: record => {
                    return (
                        <Fragment>
                            <img src={record.mark} alt={record.mark} className="mark-img"/>
                        </Fragment>
                    );
                } 
            },
            {
                key: "name",
                text: "Nombre",
                className: "name",
                sortable: true,
            },
            {
                key: "model",
                text: "Modelo",
                className: "model",
                width: 100,
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.getModelData(record)}
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
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-car-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editCardata(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-car-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this. deleteCardata(record)}
                                >
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];
        this.columns_model = [
            {
                key: "modelName",
                text: "Nombre del modelo",
                className: "modelName",
                sortable: true,
            },
            {
                key: "year",
                text: "Año",
                className: "year",
                width: 100,
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.getYearData(record)}
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
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-model-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editModeldata(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-model-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteModeldata(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }

        ];
        this.columns_year = [
            {
                key: "date",
                text: "Fecha",
                className: "date",
                sortable: true,
            },
            {
                key: "cylinder",
                text: "Cilindro",
                className: "cylinder",
                width: 100,
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.getCylinderData(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-thermometer"></i>
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
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-year-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editYeardata(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-year-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteYeardata(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];
        this.columns_cylinder = [
            {
                key: "cylinderName",
                text: "Nombre del cilindro",
                className: "cylinderName",
                sortable: true,
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
                                data-target="#update-cylinder-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editCylinderdata(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-cylinder-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteCylinderdata(record)}>
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
            filename: "data",
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
            currentcardata: {
                id: '',
                mark: '',
                name: '',
            },
            currrentmodeldata: {
                _id: '',
                modelname: '' 
             },
             currentyeardata: {
                 _id: '',
                 date: '',
             },
             currentcylinderdata: {
                 _id: '',
                 cylinderName: '',
             }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
        $('#model-table').hide();
        $('#year-table').hide();
        $('#cylinder-table').hide();
    };

    componentWillReceiveProps(nextProps) {
        this.getData();
        // this.setState({
        //     records: this.props.car.car.data
        // });
    }

    getData() {
        axios
            .post("/api/car/get")
            .then(res => {
                this.setState({ records: res.data});
                console.log("currentcardata", this.state.currentcardata);
                let currentcardata = this.state.currentcardata;
                let currrentmodeldata = this.state.currrentmodeldata;
                let currentyeardata = this.state.currentyeardata;
                if(currentcardata.id != '') {
                   const  matchedcarIndex = res.data.findIndex(item => item.id == currentcardata.id);
                   if (matchedcarIndex > -1) {
                    this.setState({
                        currentcardata: res.data[matchedcarIndex]
                    });
                   } else {
                    $('#model-table').hide();
                   }
                   
                    if(currrentmodeldata._id != '') {
                        const matchedmodelIndex = res.data[matchedcarIndex].model.findIndex(item => item._id == currrentmodeldata._id);
                        if (matchedmodelIndex > -1) {
                            this.setState({
                                currrentmodeldata: res.data[matchedcarIndex].model[matchedmodelIndex]
                            });
                        } else {
                            $('#year-table').hide();
                        }
                        if(currentyeardata._id != '') {
                            const mactchedyearIndex = res.data[matchedcarIndex].model[matchedmodelIndex].year.findIndex(item=> item._id == currentyeardata._id);
                            if (mactchedyearIndex > -1 ) {
                                this.setState({
                                    currentyeardata: res.data[matchedcarIndex].model[matchedmodelIndex].year[mactchedyearIndex]
                                });
                            } else {
                                $('#cylinder-table').hide();
                            }
                            

                        }
                    }                
                }
            })
            .catch()
    }
    // getData() {
    //     this.props.getCar();
    //     this.setState({
    //         records: this.props.car.car.data
    //     });
    // };
    getModelData(record) {
        this.setState({ currentcardata: record });
        $('#model-table').show();
              
    }
    getYearData(record) {
        this.setState({ currrentmodeldata: record });
        $('#year-table').show();
        
    }
    getCylinderData(record) {
        this.setState({ currentyeardata: record });
        $('#cylinder-table').show();              
    }
    editCardata(record) {
        this.setState({  currentcardata: record });
    }
    deleteCardata(record) {
        this.setState({  currentcardata: record });
    }
    
    editModeldata(record) {
        this.setState({ currrentmodeldata: record });
    }
    deleteModeldata(record) {
        this.setState({ currrentmodeldata: record });
    }
    editYeardata(record) {
        this.setState({ currentyeardata: record });
    }
    deleteYeardata(record) {
        this.setState({ currentyeardata: record });
    }
    editCylinderdata(record) {
        this.setState({ currentcylinderdata: record });
    }
    deleteCylinderdata(record) {
        this.setState({ currentcylinderdata: record });
    }
    pageChange(pageData) {
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <CarAddModal />
                    <CarUpdateModal record={this.state.currentcardata}/>
                    <CarDeleteModal record={this.state.currentcardata}/>
                    <ModelAddModal id={this.state.currentcardata.id}/>
                    <ModelUpdateModal id={this.state.currentcardata.id} modeldata={ this.state.currrentmodeldata}/>
                    <ModelDeleteModal id={this.state.currentcardata.id} modeldata={ this.state.currrentmodeldata}/>
                    <YearAddModal id={this.state.currentcardata.id} model_id={this.state.currrentmodeldata._id}/>
                    <YearUpdateModal id={this.state.currentcardata.id} model_id={this.state.currrentmodeldata._id} yeardata={this.state.currentyeardata}/>
                    <YearDeleteModal id={this.state.currentcardata.id} model_id={this.state.currrentmodeldata._id} yeardata={this.state.currentyeardata}/>
                    <CylinderAddModal id={this.state.currentcardata.id} model_id={this.state.currrentmodeldata._id} year_id={this.state.currentyeardata._id}/>
                    <CylinderUpdateModal id={this.state.currentcardata.id} model_id={this.state.currrentmodeldata._id} year_id={this.state.currentyeardata._id} cylinderdata={this.state.currentcylinderdata}/>
                    <CylinderDeleteModal id={this.state.currentcardata.id} model_id={this.state.currrentmodeldata._id} year_id={this.state.currentyeardata._id} cylinderdata={this.state.currentcylinderdata}/>   
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-car-modal"><FontAwesomeIcon icon={faPlus}/> Agregar coche</button>
                            <h1 className="mt-2 text-primary">Lista de coches</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                        <hr/>
                        <div className="container-fluid" id="model-table">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-model-modal"><FontAwesomeIcon icon={faPlus}/> Agregar modelo</button>
                            <h1 className="mt-2 text-primary">Lista de modelos </h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.currentcardata.model}
                                columns={this.columns_model}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                        <hr/>
                        <div className="container-fluid" id="year-table">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-year-modal"><FontAwesomeIcon icon={faPlus}/> Agregar año</button>
                            <h1 className="mt-2 text-primary">Lista de años </h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.currrentmodeldata.year}
                                columns={this.columns_year}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                        <hr/>
                        <div className="container-fluid" id="cylinder-table">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-cylinder-modal"><FontAwesomeIcon icon={faPlus}/> Agregar cilindro</button>
                            <h1 className="mt-2 text-primary">Lista de cilindros </h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.currentyeardata.cylinder}
                                columns={this.columns_cylinder}
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

Car.propTypes = {
    car: PropTypes.object.isRequired,
    getCar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    car: state.car,  
    records: state.records
});

export default connect(
    mapStateToProps,
    { getCar }
)(Car);
