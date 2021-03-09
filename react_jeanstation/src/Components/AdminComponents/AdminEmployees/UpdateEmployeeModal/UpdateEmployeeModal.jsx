import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class UpdateEmployeeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: null,
            lname: '',
            email: null,
            contactno: null,
            password: null,
            address: null,
            designation: null,
            storeid: "S0001",
            employee: {}
        }
    }
    options = {
        headers: {
            'content-type': 'application/json',
        }
    };

    updateHandler = () => {
        if (
            this.props.employee.employeeId != null
            && this.state.fname != null
            && this.state.email != null
            && this.state.contactno != null
            && this.state.password != null
            && this.state.address != null
            && this.state.designation != null
            && this.state.storeid != null
        ) {
            axios.put(`http://localhost:63623/employees/${this.props.employee.employeeId}`
                , {
                    "employeeId": this.props.employee.employeeId
                    , "firstName": this.state.fname
                    , "lastName": this.state.lname
                    , "email": this.state.email
                    , "contactNo": this.state.contactno
                    , "password": this.state.password
                    , "address": this.state.address
                    , "designation": this.state.designation
                    , "storeId": this.state.storeid
                }
                , this.options)
                .then((response) => {
                    this.props.reRender(false);
                    this.props.onHide();
                })
                .then(() => alert(`Successfuly updated Employee with Id: ${this.props.employee.employeeId}`));
        }
        else {
            alert("Please enter the required details!!");
        }
    }
    render() {
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter details for Employee ID: {this.props.employee.employeeId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <label htmlFor="fname">First Name:</label>
                            <input type="text" className="form-control" id="fname"
                                onChange={(data) => this.setState({ fname: data.target.value })} name='fname' />
                        </Row>
                        <Row>
                            <label htmlFor="lname">Last Name:</label>
                            <input type="text" className="form-control" id="lname"
                                onChange={(data) => this.setState({ lname: data.target.value })} name='lname' />
                        </Row>
                        <Row>
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="form-control" id="email"
                                onChange={(data) => this.setState({ email: data.target.value })} name='email' />
                        </Row>
                        <Row>
                            <label htmlFor="contactno">Contact:</label>
                            <input type="text" className="form-control" id="contactno"
                                onChange={(data) => this.setState({ contactno: data.target.value })} name='contactno' />
                        </Row>
                        <Row>
                            <label htmlFor="password">Password:</label>
                            <input type="text" className="form-control" id="password"
                                onChange={(data) => this.setState({ password: data.target.value })} name='password' />
                        </Row>
                        <Row>
                            <label htmlFor="address">Address:</label>
                            <input type="text" className="form-control" id="address"
                                onChange={(data) => this.setState({ address: data.target.value })} name='address' />
                        </Row>
                        <Row>
                            <label htmlFor="designation">Designation:</label>
                            <input type="text" className="form-control" id="designation"
                                onChange={(data) => this.setState({ designation: data.target.value })} name='designation' />
                        </Row>
                        <Row>
                            <label htmlFor="storeid">Store Id:</label>
                            <input type="text" className="form-control" id="storeid" name='storeid' />
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.updateHandler}>Update</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}