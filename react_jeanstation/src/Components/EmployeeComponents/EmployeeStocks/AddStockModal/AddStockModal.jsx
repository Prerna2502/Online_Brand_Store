import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class AddStockModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeId: localStorage.getItem("storeId"),
            productId: null,
            quantity: null,
        }
    }
    options = {
        headers: {
            'content-type': 'application/json',
        }
    };
    addHandler = () => {
        if (this.state.storeId != null
            && this.state.productId != null
            && this.state.quantity != null
        ) {
            axios.post(`http://localhost:63623/stock`
                , {
                    "productId": this.state.productId
                    , "storeId": this.state.storeId
                    , "quantity": parseInt(this.state.quantity)
                }
                , this.options)
                .then((response) => {
                    this.props.rerender(false);
                    this.props.onHide();
                })
                .then(alert(`Successfuly added stock in the store: ${this.state.storeId}`));
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
                        Enter details for new stock:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <label htmlFor="productId">Product Id:</label>
                            <input type="text" className="form-control" id="productId"
                                onChange={(data) => this.setState({ productId: data.target.value })}
                                name='productId' />
                        </Row>
                        <Row>
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="number" className="form-control" id="quantity"
                                onChange={(data) => this.setState({ quantity: data.target.value })}
                                name='quantity' />
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