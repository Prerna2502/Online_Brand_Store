import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class UpdateOrdersModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: null,
            cid: null,
            datetime: null,
            contact: null,
            quantity: null,
            address: null,
            status: null,
            storeid: "S0001"
        }
    }
    options = {
        headers: {
            'content-type': 'application/json',
        }
    };

    updateHandler = () => {
        if (
            this.props.orderId != null
            && this.state.pid != null
            && this.state.cid != null
            && this.state.contact != null
            && this.state.address != null
            && this.state.quantity != null
            && this.state.storeid != null
            && this.state.status != null
        ) {
            axios.put(`http://localhost:63623/orders/${this.props.orderId}`
                , {
                    "orderId": this.props.orderId
                    , "productId": this.state.pid
                    , "customerId": this.state.cid
                    , "storeId": this.state.storeid
                    , "contact": this.state.contact
                    , "orderStatus": this.state.status
                    , "quantity": parseInt(this.state.quantity)
                    , "orderDateTime": this.state.datetime
                    , "address": this.state.address
                }
                , this.options)
                .then((response) => {
                    this.props.reRender(false);
                    this.props.onHide();
                })
                .then(() => alert(`Successfuly updated Order with Id: ${this.props.orderId}`));
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
                        Enter details for Order ID: {this.props.orderId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <label htmlFor="pid">Product Id:</label>
                            <input type="text" className="form-control" id="pid"
                                onChange={(data) => this.setState({ pid: data.target.value })} name='pid' />
                        </Row>
                        <Row>
                            <label htmlFor="cid">Customer Id:</label>
                            <input type="text" className="form-control" id="cid"
                                onChange={(data) => this.setState({ cid: data.target.value })} name='cid' />
                        </Row>
                        <Row>
                            <label htmlFor="storeid">Store Id:</label>
                            <input type="text" className="form-control" id="storeid" name='storeid' />
                        </Row>
                        <Row>
                            <label htmlFor="contactno">Contact:</label>
                            <input type="text" className="form-control" id="contactno"
                                onChange={(data) => this.setState({ contact: data.target.value })} name='contactno' />
                        </Row>
                        <Row>
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="text" className="form-control" id="quantity"
                                onChange={(data) => this.setState({ quantity: data.target.value })} name='quantity' />
                        </Row>
                        <Row>
                            <label htmlFor="address">Address:</label>
                            <input type="text" className="form-control" id="address"
                                onChange={(data) => this.setState({ address: data.target.value })} name='address' />
                        </Row>
                        <Row>
                            <label for="status">Choose Status:</label>
                            <select id="status" name="status"
                                onChange={(data) => this.setState({ status: data.target.value })}>
                                <option value="ordered">Ordered</option>
                                <option value="recieved">Recieved</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </Row>
                        <Row>
                            <label htmlFor="datetime">DateTime:</label>
                            <input type="text" className="form-control" id="datetime"
                                onChange={(data) => this.setState({ datetime: data.target.value })} name='datetime' />
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