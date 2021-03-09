import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class UpdateCustomerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    componentDidMount() {
        axios.get(`http://localhost:63623/customers/${this.props.updateId}`)
            .then(response => this.setState({ customer: response.data }))
            .then(() => {
                this.setState({ fname: this.state.customer.firstName });
                this.setState({ lname: this.state.customer.lastName });
                this.setState({ email: this.state.customer.email });
                this.setState({ contactno: this.state.customer.contactNo });
                this.setState({ password: this.state.customer.password });
                this.setState({ address: this.state.customer.address });
                this.setState({ pastOrderCount: this.state.customer.pastOrderCount });
            });
    }
    updateHandler = () => {
        this.setState({
            customer:
            {
                "customerId": this.state.customer.customerId
                , "firstName": this.state.fname
                , "lastName": this.state.lname
                , "email": this.state.email
                , "contactNo": this.state.contactno
                , "password": this.state.password
                , "address": this.state.address
                , "pastOrderCount": this.state.pastOrderCount
            }
        });
        axios.put(`http://localhost:63623/customers/${this.props.updateId}`
            , this.state.customer, this.options)
            .then(() => {
                this.props.reRender(false);
                this.props.onHide();
            })
        alert(`Successfuly updated Customer with Id: ${this.props.updateId}`);
    }
    render() {
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter details for Customer ID: {this.props.updateId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <label htmlFor="fname">First Name:</label>
                            <input type="text" className="form-control" id="fname"
                                onChange={(data) => this.setState({ fname: data.target.value })} name='fname'
                                value={this.state.fname} />
                        </Row>
                        <Row>
                            <label htmlFor="lname">Last Name:</label>
                            <input type="text" className="form-control" id="lname"
                                onChange={(data) => this.setState({ lname: data.target.value })} name='lname'
                                value={this.state.lname} />
                        </Row>
                        <Row>
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="form-control" id="email"
                                onChange={(data) => this.setState({ email: data.target.value })} name='email'
                                value={this.state.email} />
                        </Row>
                        <Row>
                            <label htmlFor="contactno">Contact:</label>
                            <input type="text" className="form-control" id="contactno"
                                onChange={(data) => this.setState({ contactno: data.target.value })} name='contactno'
                                value={this.state.contactno} />
                        </Row>
                        <Row>
                            <label htmlFor="password">Password:</label>
                            <input type="text" className="form-control" id="password"
                                onChange={(data) => this.setState({ password: data.target.value })} name='password'
                                value={this.state.password} />
                        </Row>
                        <Row>
                            <label htmlFor="address">Address:</label>
                            <input type="text" className="form-control" id="address"
                                onChange={(data) => this.setState({ address: data.target.value })} name='address'
                                value={this.state.address} />
                        </Row>
                        <Row>
                            <label htmlFor="pastOrderCount">Past Order Count:</label>
                            <input type="text" className="form-control" id="pastOrderCount"
                                onChange={(data) => this.setState({ pastOrderCount: data.target.value })} name='pastOrderCount'
                                value={this.state.pastOrderCount} />
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