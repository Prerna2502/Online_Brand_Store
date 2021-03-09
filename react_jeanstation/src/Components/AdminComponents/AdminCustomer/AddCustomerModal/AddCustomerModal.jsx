import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class AddCustomerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId:'',
            fname: '',
            lname: '',
            email: '',
            contactno: '',
            password: '',
            address: '',
            pastOrderCount: '',
            customer: ''
        }
    }
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
      };
    addHandler = () => {
        this.setState({
            customer:
            {
                "customerId": this.state.customerId
                , "firstName": this.state.fname
                , "lastName": this.state.lname
                , "email": this.state.email
                , "contactNo": this.state.contactno
                , "password": this.state.password
                , "address": this.state.address
                , "pastOrderCount": this.state.pastOrderCount
            }
        });
        axios.post(`http://localhost:63623/customers`
            , this.state.customer,this.options)
            .then(() => {
                this.props.reRender(false);
                this.props.onHide();
            })
            .then(alert(`Successfuly added Customer with Id: ${this.state.customerId}`));
    }
    
    render() {
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter details for new Customer:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <label htmlFor="customerId">Customer Id:</label>
                            <input type="text" className="form-control" id="customerId"
                                onChange={(data) => this.setState({ customerId: data.target.value })}
                                name='customerId' />
                        </Row>
                        <Row>
                            <label htmlFor="fname">First Name:</label>
                            <input type="text" className="form-control" id="fname"
                                onChange={(data) => this.setState({ fname: data.target.value })}
                                name='fname' />
                        </Row>
                        <Row>
                            <label htmlFor="lname">Last Name:</label>
                            <input type="text" className="form-control" id="lname"
                                onChange={(data) => this.setState({ lname: data.target.value })}
                                name='lname' />
                        </Row>
                        <Row>
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="form-control" id="email"
                                onChange={(data) => this.setState({ email: data.target.value })}
                                name='email' />
                        </Row>
                        <Row>
                            <label htmlFor="contactno">Contact:</label>
                            <input type="text" className="form-control" id="contactno"
                                onChange={(data) => this.setState({ contactno: data.target.value })}
                                name='contactno' />
                        </Row>
                        <Row>
                            <label htmlFor="password">Password:</label>
                            <input type="text" className="form-control" id="password"
                                onChange={(data) => this.setState({ password: data.target.value })}
                                name='password' />
                        </Row>
                        <Row>
                            <label htmlFor="address">Address:</label>
                            <input type="text" className="form-control" id="address"
                                onChange={(data) => this.setState({ address: data.target.value })}
                                name='address' />
                        </Row>
                        <Row>
                            <label htmlFor="pastOrderCount">Past Order Count:</label>
                            <input type="text" className="form-control" id="pastOrderCount"
                                onChange={(data) => this.setState({ pastOrderCount: data.target.value })}
                                name='pastOrderCount' />
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.addHandler}>Add</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}