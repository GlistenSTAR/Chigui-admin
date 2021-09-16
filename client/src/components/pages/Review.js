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
import ReviewAddModal from "../partials/ReviewModal/ReviewAddModal";
import ReviewUpdateModal from "../partials/ReviewModal/ReviewUpdateModal";
import ReviewDeleteModal from "../partials/ReviewModal/ReviewDeleteModal";
import DetailDataAddModal from "../partials/ReviewModal/DetailDataAddModal";
import DetailDataUpdateModal from "../partials/ReviewModal/DetailDataUpdateModal";
import DetailDataDeleteModal from "../partials/ReviewModal/DetailDataDeleteModal";
import { toast, ToastContainer} from "react-toastify";
import $ from 'jquery';

class Review extends Component {

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
                key: "type",
                text: "Escribe",
                className: "type",
                sortable: true,
            },
            {
                key: "detaildata",
                text: "Datos detallados",
                className: "detaildata",
                width: 100,
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button className="btn btn-primary btn-sm"
                                onClick={() => this.getDetailData(record)}
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
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-review-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-review-modal"
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
                key: "subname",
                text: "Subnombre",
                className: "subname",
                sortable: true,
            },
            {
                key: "description",
                text: "Descripción",
                className: "description",
                sortable: true,
            },
            {
                key: "time",
                text: "Tiempo",
                className: "time",
                sortable: true,
            },
            {
                key: "price",
                text: "Precio",
                className: "price",
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
                                data-target="#update-detaildata-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editDetailData(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-detaildata-modal"
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteDetailData(record)}
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
                type: '',
            },
            detailData: {
                id: '',
                subname: '',
                description: '',
                price: 0,
                time: 0, 
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
        // this.getDetailData(this.state.currentRecord);
    }

    getData() {
        axios
            .post("/api/review/get")
            .then(res => {
                this.setState({ records: res.data});
                let currentRecord = this.state.currentRecord;
                if(currentRecord.id != '') {
                   const  matchedIndex = res.data.findIndex(itme => itme.id == currentRecord.id);
                   if (matchedIndex > -1) {
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
    getDetailData(record) {
        this.setState({ currentRecord: record});
        $('#detaildata').show();
              
    }
    editDetailData(record) {
        this.setState({ detailData: record });
       
    }
    deleteDetailData(record) {
        this.setState({ detailData: record }); 
    }

    pageChange(pageData) {
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <ReviewAddModal/>
                    <ReviewUpdateModal record={this.state.currentRecord}/>
                    <ReviewDeleteModal record={this.state.currentRecord}/>
                    <DetailDataAddModal id={this.state.currentRecord.id}/>
                    <DetailDataUpdateModal id={this.state.currentRecord.id} detailData={this.state.detailData}/>
                    <DetailDataDeleteModal id={this.state.currentRecord.id} detailData={this.state.detailData}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-review-modal"><FontAwesomeIcon icon={faPlus}/> Agregar una opinión</button>
                            <h1 className="mt-2 text-primary">Lista de revisión</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            /> 
                        </div>
                        <hr/>
                        <div className="container-fluid" id="detaildata">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-detaildata-modal"><FontAwesomeIcon icon={faPlus}/> Agregar Datos detallados</button>
                            <h1 className="mt-2 text-primary">Lista de datos detallados </h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.currentRecord.data}
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

Review.propTypes = {
    review: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    review: state.review,
    records: state.records
});

export default connect(
    mapStateToProps
)(Review);
