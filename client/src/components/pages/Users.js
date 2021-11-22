import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UserAddModal from "../partials/UserModal/UserAddModal";
import UserUpdateModal from "../partials/UserModal/UserUpdateModal";
import UserDeleteModal from "../partials/UserModal/UserDeleteModal";
import { ToastContainer } from "react-toastify";

class Users extends Component {

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
                sortable: true,
            },
            {
                key: "email",
                text: "Correo electrónico",
                className: "email",
                sortable: true
            },
            {
                key: "date",
                text: "Fecha",
                className: "date",
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
                                data-target="#update-user-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{ marginRight: '5px' }}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                data-toggle="modal"
                                data-target="#delete-user-modal"
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
            length_menu: [10, 20, 50],
            filename: "Users",
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
                name: '',
                email: '',
                password: '',
                password2: '',
            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .post("/api/user/get")
            .then(res => {
                this.setState({ records: res.data })
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    editRecord(record) {
        this.setState({ currentRecord: record });
    }
    
    deleteRecord(record) {
        this.setState({ currentRecord: record });
    }

    pageChange(pageData) {
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="d-flex" id="wrapper">
                    <Sidebar />
                    <UserAddModal />
                    <UserUpdateModal record={this.state.currentRecord} />
                    <UserDeleteModal record={this.state.currentRecord} />
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-user-modal"><FontAwesomeIcon icon={faPlus} /> Agregar usuario</button>
                            <h1 className="mt-2 text-primary">Lista de usuarios</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        );
    }

}

Users.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Users);
