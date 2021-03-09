import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class UpdateOrderStatusModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null
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
            && this.state.status != null
        ) {
            axios.put(`http://localhost:63623/orders/${this.props.orderId}`
                , {
                    "orderId": this.props.order.orderId
                    , "productId": this.props.order.productId
                    , "customerId": this.props.order.customerId
                    , "storeId": this.props.order.storeId
                    , "contact": this.props.order.contact
                    , "orderStatus": this.state.status
                    , "quantity": this.props.order.quantity
                    , "address": this.props.order.address
                }
                , this.options)
                .then((response) => {
                    if (response.data === "Updated The Order") {
                        this.props.reRender(false);
                        this.props.onHide();
                    }
                })
                .then(() => alert(`Successfuly updated status of order with Id: ${this.props.order.orderId}`));
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
                        Enter status for Order ID: {this.props.order.orderId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
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
                    <Button onClick={this.updateHandler}>Update</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}