import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function EmployeeLogOut(props) {
    const LogOutHandler = () => {
        localStorage.clear();
        props.onHide();
        props.setFlag(false);
        alert('You are successfully LoggedOut.')
    }
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirm LogOut
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <p>Are you sure you want to LogOut?</p>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={LogOutHandler}>Yes</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
