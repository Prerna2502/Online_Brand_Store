import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class AddDiscountModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minimumOrderAmount: null,
            minimumPastOrder: null,
            discountPercent: null,
        }
    }
    options = {
        headers: {
            'content-type': 'application/json',
        }
    };
    addHandler = () => {
        if (this.state.minimumOrderAmount != null
            && this.state.discountPercent != null
        ) {
            axios.post(`http://localhost:63623/discount`
                , {
                    "minimumOrderAmount": parseFloat(this.state.minimumOrderAmount)
                    , "minimumPastOrder": parseFloat(this.state.minimumPastOrder)
                    , "discountPercent": parseFloat(this.state.discountPercent)
                }
                , this.options)
                .then((response) => {
                    this.props.rerender(false);
                    this.props.onHide();
                })
                .then(alert(`Successfuly added discount for minimum order amount of: ${this.state.minimumOrderAmount}`));
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
                        Enter details for new discount:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <label htmlFor="minimumOrderAmount">Minimum Order Amount:</label>
                            <input type="number" className="form-control" id="minimumOrderAmount"
                                onChange={(data) => this.setState({ minimumOrderAmount: data.target.value })}
                                name='minimumOrderAmount' />
                        </Row>
                        <Row>
                            <label htmlFor="minimumPastOrder">Minimum Past Order:</label>
                            <input type="number" className="form-control" id="minimumPastOrder"
                                onChange={(data) => this.setState({ minimumPastOrder: data.target.value })}
                                name='minimumPastOrder' />
                        </Row>
                        <Row>
                            <label htmlFor="discountPercent">Discount:</label>
                            <input type="number" className="form-control" id="discountPercent"
                                onChange={(data) => this.setState({ discountPercent: data.target.value })}
                                name='discountPercent' />
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