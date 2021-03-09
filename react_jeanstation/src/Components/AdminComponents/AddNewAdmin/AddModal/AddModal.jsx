import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default class Modal_Update extends Component {
    constructor(props){
        super(props);
        this.state={
            adminid:'',
            adminPassword:'',
        }
    }
    options = {
        headers: {
            'Content-Type': 'application/json',
        }
      };
    addHandler = ()=>{
        axios.post(`http://localhost:63623/admin/register`
        ,{ "AdminId" : this.state.adminid, "AdminPassword" : this.state.adminPassword },this.options)
        .then(()=> {
            //this.props.reRender(false);
            this.props.onHide();})
        .then(alert(`Successfuly added the new admin.`));
    }
    render() {
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter details for new Admin:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <label for="adminid">Admin Id:</label>
                            <input type="text" class="form-control" id="adminid"
                                onChange={(data) => this.setState({adminid:data.target.value})} name='adminid' />
                        </Row>
                        <Row>
                            <label for="adminpassword">Password:</label>
                            <input type="text" class="form-control" id="adminpassword"
                                onChange={(data) => this.setState({adminPassword:data.target.value})} name='adminpassword' />
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