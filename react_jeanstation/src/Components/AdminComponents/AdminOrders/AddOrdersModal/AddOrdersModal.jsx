import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class AddOrdersModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: null,
            pid: null,
            cid: null,
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
    async addHandler() {
        await this.setState({ orderId: this.state.pid + this.state.cid + this.state.quantity })
        if (this.state.orderId != null
            && this.state.pid != null
            && this.state.cid != null
            && this.state.contact != null
            && this.state.address != null
            && this.state.quantity != null
            && this.state.storeid != null
            && this.state.status != null
        ) {
            axios.post(`http://localhost:63623/orders`
                , {
                    "orderId": this.state.orderId
                    , "productId": this.state.pid
                    , "customerId": this.state.cid
                    , "storeId": this.state.storeid
                    , "contact": this.state.contact
                    , "orderStatus": this.state.status
                    , "quantity": parseInt(this.state.quantity)
                    , "address": this.state.address
                }
                , this.options)
                .then((response) => {
                    this.props.rerender(false);
                    this.props.onHide();
                })
                .then(alert(`Successfuly added Order with Id: ${this.state.orderId}`));
        }
        else {
            alert("Please fill the required details!!");
        }
    }

    render() {
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter details for placing new Order:
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
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.addHandler.bind(this)}>Add</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}