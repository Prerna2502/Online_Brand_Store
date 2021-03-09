import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class UpdateProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            price: null,
            type: null,
            image: null,
            description: null,
            gender: null,
            filterTag: null
        }
    }
    options = {
        headers: {
            'content-type': 'application/json',
        }
    };

    updateHandler = () => {
        if (
            this.props.product.productId != null
            && this.state.name != null
            && this.state.price != null
            && this.state.type != null
            && this.state.description != null
            && this.state.gender != null
            && this.state.filterTag != null
        ) {
            axios.put(`http://localhost:63623/product/${this.props.product.productId}`
                , {
                    "productId": this.props.product.productId
                    , "productName": this.state.name
                    , "productPrice": parseFloat(this.state.price)
                    , "productType": this.state.type
                    , "productImage": this.state.image
                    , "description": this.state.description
                    , "gender": this.state.gender
                    , "filterTag": this.state.filterTag
                }
                , this.options)
                .then((response) => {
                    this.props.reRender(false);
                    this.props.onHide();
                })
                .then(() => alert(`Successfuly updated product with Id: ${this.props.product.productId}`));
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
                        Enter details for Product ID: {this.props.product.productId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" id="name"
                                onChange={(data) => this.setState({ name: data.target.value })} name='name' />
                        </Row>
                        <Row>
                            <label htmlFor="price">Price:</label>
                            <input type="text" className="form-control" id="price"
                                onChange={(data) => this.setState({ price: data.target.value })} name='price' />
                        </Row>
                        <Row>
                            <label htmlFor="ptype">Type:</label>
                            <input type="text" className="form-control" id="ptype"
                                onChange={(data) => this.setState({ type: data.target.value })} name='ptype' />
                        </Row>
                        <Row>
                            <label htmlFor="image">Image Url:</label>
                            <input type="text" className="form-control" id="image"
                                onChange={(data) => this.setState({ image: data.target.value })} name='image' />
                        </Row>
                        <Row>
                            <label htmlFor="description">Description:</label>
                            <input type="text" className="form-control" id="description"
                                onChange={(data) => this.setState({ description: data.target.value })} name='description' />
                        </Row>
                        <Row>
                            <label htmlFor="gender">Gender:</label>
                            <input type="text" className="form-control" id="gender"
                                onChange={(data) => this.setState({ gender: data.target.value })} name='gender' />
                        </Row>
                        <Row>
                            <label htmlFor="filterTag">FilterTag:</label>
                            <input type="text" className="form-control" id="filterTag"
                                onChange={(data) => this.setState({ filterTag: data.target.value })} name='filterTag' />
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