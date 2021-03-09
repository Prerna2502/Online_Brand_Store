import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class UpdateStoreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    updateHandler = () => {
        if (
            this.props.store.storeId != null
            && this.state.location != null
            && this.state.manager != null
            && this.state.contact != null
            && this.state.address != null
        ) {
            axios.put(`http://localhost:63623/store/${this.props.store.storeId}`
                , {
                    "storeId": this.props.store.storeId
                    , "location": this.state.location
                    , "manager": this.state.manager
                    , "contact": this.state.contact
                    , "address": this.state.address
                }
                , this.options)
                .then((response) => {
                    this.props.reRender(false);
                    this.props.onHide();
                })
                .then(() => alert(`Successfuly updated store with Id: ${this.props.store.storeId}`));
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
                        Enter details for Store ID: {this.props.store.storeId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <label htmlFor="location">Location:</label>
                            <input type="text" className="form-control" id="location"
                                onChange={(data) => this.setState({ location: data.target.value })} name='location' />
                        </Row>
                        <Row>
                            <label htmlFor="manager">Manager:</label>
                            <input type="text" className="form-control" id="manager"
                                onChange={(data) => this.setState({ manager: data.target.value })} name='manager' />
                        </Row>
                        <Row>
                            <label htmlFor="contact">Contact:</label>
                            <input type="text" className="form-control" id="contact"
                                onChange={(data) => this.setState({ contact: data.target.value })} name='contact' />
                        </Row>
                        <Row>
                            <label htmlFor="address">Address:</label>
                            <input type="text" className="form-control" id="address"
                                onChange={(data) => this.setState({ address: data.target.value })} name='address' />
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