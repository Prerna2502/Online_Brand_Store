import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class AddStoreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeid: "S0001",
            location: null,
            manager: null,
            contact: null,
            address: null
        }
    }
    options = {
        headers: {
            'content-type': 'application/json',
        }
    };
    addHandler = () => {
        if (this.state.storeid != null
            && this.state.location != null
            && this.state.manager != null
            && this.state.contact != null
            && this.state.address != null
        ) {
            axios.post(`http://localhost:63623/store`
                , {
                    "storeId": this.state.storeid
                    , "location": this.state.location
                    , "manager": this.state.manager
                    , "contact": this.state.contact
                    , "address": this.state.address
                }
                , this.options)
                .then((response) => {
                    this.props.rerender(false);
                    this.props.onHide();
                })
                .then(alert(`Successfuly added store with Id: ${this.state.storeid}`));
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
                        Enter details for new store:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <label htmlFor="storeId">Store Id:</label>
                            <input type="text" className="form-control" id="storeId"
                                name='storeId' />
                        </Row>
                        <Row>
                            <label htmlFor="location">Location:</label>
                            <input type="text" className="form-control" id="location"
                                onChange={(data) => this.setState({ location: data.target.value })}
                                name='location' />
                        </Row>
                        <Row>
                            <label htmlFor="manager">Manager:</label>
                            <input type="text" className="form-control" id="manager"
                                onChange={(data) => this.setState({ manager: data.target.value })}
                                name='manager' />
                        </Row>
                        <Row>
                            <label htmlFor="contact">Contact:</label>
                            <input type="text" className="form-control" id="contact"
                                onChange={(data) => this.setState({ contact: data.target.value })}
                                name='contact' required />
                        </Row>
                        <Row>
                            <label htmlFor="address">Address:</label>
                            <input type="text" className="form-control" id="address"
                                onChange={(data) => this.setState({ address: data.target.value })}
                                name='address' />
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