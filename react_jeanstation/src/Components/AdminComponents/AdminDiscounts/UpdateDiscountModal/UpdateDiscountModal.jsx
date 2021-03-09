import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class UpdateDiscountModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minimumPastOrder: 0
            , discount: null
        }
    }
    options = {
        headers: {
            'content-type': 'application/json',
        }
    };

    updateHandler = () => {
        if (
            this.props.discount.minimumOrderAmount != null
            && this.state.discount != null
        ) {
            axios.put(`http://localhost:63623/discount/${this.props.discount.minimumOrderAmount}`
                , {
                    "discountPercent": parseFloat(this.state.discount)
                    , "minOrderAmount": parseFloat(this.props.discount.minimumOrderAmount)
                    , "minimumPastOrder": parseFloat(this.state.minimumPastOrder)
                }
                , this.options)
                .then((response) => {
                    this.props.reRender(false);
                    this.props.onHide();
                })
                .then(() => alert(`Successfuly updated Discont on Minimum Order of
                                    : ${this.props.discount.minimumOrderAmount}`));
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
                        Enter discount for minimum order of:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <label htmlFor="discount">Discount:</label>
                            <input type="text" className="form-control" id="discount"
                                onChange={(data) => { this.setState({ discount: data.target.value }); }}
                                name='discount' />
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.updateHandler.bind(this)}>Update</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}