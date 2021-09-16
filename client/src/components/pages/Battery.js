import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { getBattery } from "../../actions/batteryActions" 
import BatteryAddModal from "../partials/BatteryModal/BatteryAddModal";
import BatteryUpdateModal from "../partials/BatteryModal/BatteryUpdateModal";
import BatteryDeleteModal from "../partials/BatteryModal/BatteryDeleteModal";
import { toast, ToastContainer} from "react-toastify";

class Battery extends Component {

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
                key: "brand",
                text: "Marca",
                className: "brand",
                align: "center",
                sortable: true,
            },
            {
                key: "price",
                text: "Precio",
                className: "price",
                align: "center",
                sortable: true
            },
            {
                key: "referrence",
                text: "Referencia",
                className: "referrence",
                align: "center",
                sortable: true
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
                                data-target="#update-battery-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-battery-modal"
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
            currentRecord: {
                id: '',
                brand: '',
                price: 0,
                reference: ''
            }
        };

        // this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.props.getBattery();
        this.setState({
            records: this.props.battery.battery
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            records: nextProps.battery.battery
        });
    }

    // getData() {
    //     axios
    //         .post("/api/battery/get")
    //         .then(res => {
    //             this.setState({ records: res.data})
    //         })
    //         .catch()
    // }
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
                    <BatteryAddModal/>
                    <BatteryUpdateModal record={this.state.currentRecord}/>
                    <BatteryDeleteModal record={this.state.currentRecord} />
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-battery-modal"><FontAwesomeIcon icon={faPlus}/> Agregar batería</button>
                            <h1 className="mt-2 text-primary">Lista de baterías</h1>
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

Battery.propTypes = {
    battery: PropTypes.object.isRequired,
    getBattery: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    battery: state.battery,  
});

export default connect(
    mapStateToProps,
    { getBattery }
)(Battery);
