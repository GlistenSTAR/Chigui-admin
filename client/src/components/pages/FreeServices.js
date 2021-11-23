import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";
import ReactDatatable from "@ashvin27/react-datatable";
import {connect} from "react-redux";
import {getFreeServices} from '../../actions/freeServicesAction'
import AddFreeServicesModal from '../partials/FreeServicesModal/AddFreeServicesModal';

class FreeServices extends Component {
    constructor() {
        super();
        this.state = {
            records: []
        };
    }

    componentDidMount() {
        this.props.getFreeServices();
        this.setState({
            records: this.props.freeServices.freeServices
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            records: nextProps.freeServices.freeServices
        });
    }

    config = {
        page_size: 10,
        length_menu: [10, 20, 50],
        filename: "FreeServices",
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

    columns = [
        {
            key: "service_name",
            text: "Service Name",
            className: "service_name",
            sortable: true,
        },
        {
            key: "time",
            text: "Time",
            className: "time",
            sortable: true,
        },
        {
            key: "free",
            text: "Free",
            className: "free",
            sortable: true,
            cell:record=>{
                return(
                    <Fragment>
                        {record.free?(<FontAwesomeIcon icon={faCheck} className="text-primary"/>):''}
                    </Fragment>
                )
            }
        },
        {
            key: "guarantee",
            text: "Quarantee",
            className: "guarantee",
            sortable: true,
            cell:record=>{
                return(
                    <Fragment>
                        {record.guarantee?(<FontAwesomeIcon icon={faCheck} className="text-primary"/>):''}
                    </Fragment>
                )
            }
        },
    ];

    pageChange(pageData) {
    }


    render() {
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <AddFreeServicesModal />
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <div id="page-content-wrapper">
                                <div className="container-fluid">
                                    <button className="btn btn-outline-primary float-right mt-3 mr-2"
                                            data-toggle="modal" data-target="#add-freeServices-modal">
                                        <FontAwesomeIcon icon={faPlus}/> Agregar electrónico
                                    </button>
                                    <h1 className="mt-2 text-primary">Lista Servicios Gratuitos</h1>
                                    <ReactDatatable
                                        config={this.config}
                                        records={this.state.records}
                                        columns={this.columns}
                                        onPageChange={this.pageChange.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

FreeServices.propTypes = {
    getFreeServices: PropTypes.func.isRequired,
    freeServices: PropTypes.object.isRequired
}

const mapStateToProps =state => ({
    freeServices : state.freeServices
});

export default connect(
    mapStateToProps,
    { getFreeServices }
)(FreeServices);
