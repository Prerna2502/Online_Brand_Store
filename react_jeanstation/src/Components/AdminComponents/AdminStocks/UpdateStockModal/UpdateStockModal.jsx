import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class UpdateStockModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: null,
            productId: this.props.productId,
            storeId: this.props.storeId
        }
    }
    options = {
        headers: {
            'content-type': 'application/json',
        }
    };

    updateHandler = () => {
        // console.log(this.props.storeId,this.props.productId);
        // console.log(this.state.storeId,this.state.productId);
        if (
            this.props.storeId != null
            && this.props.productId != null
            && this.state.quantity != null
        ) {
            // console.log("in update handler calling ->");
            const updatedQuantity = parseInt(this.props.quantity)+parseInt(this.state.quantity)
            let url = `http://localhost:63623/stock/${this.props.storeId}/${this.props.productId}`;
            // console.log(url);
            axios.put(url
                , {
                    "quantity": parseInt(updatedQuantity)
                    , "productId": this.props.productId
                    , "storeId": this.props.storeId
                }
                , this.options)
                .then((response) => {
                    this.props.reRender(false);
                    this.props.onHide();
                })
                .then(() => alert(`Successfuly updated stock in store: ${this.props.storeId}`));
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
                        Enter new stock details:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="number" className="form-control" id="quantity"
                                onChange={(data) => this.setState({ quantity: data.target.value })}
                                name='quantity' />
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