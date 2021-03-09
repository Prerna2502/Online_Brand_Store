import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { DeleteCartItemAction } from "../../../States/Actions/ActionCart";
//import context from 'react-bootstrap/esm/AccordionContext';

export default function PlacingOrderModal(props) {
    const quantity = props.quantity;
    const productId = props.productId;
    const customerId = localStorage.getItem("customerId") || props.customerId || "C0001";
    const orderId = productId + customerId + quantity;
    const [address, setAddress] = useState();
    const [contact, setContact] = useState();
    const storeId = "S0001";
    const orderStatus = "Ordered";
    const options = {
        headers: {
            'content-type': 'application/json',
        }
    };
    const dispatch = useDispatch();
    const stockToUpdate = async () => {
        try {
            const { data } = await axios.get(`http://localhost:63623/stock/${storeId}/${productId}`);
            return data;
        }
        catch (err) {
            console.log(err.message);
        }
    }
    const postOrder = async () => {
        try {
            const { data } = await axios.post(`http://localhost:63623/orders`, {
                "orderId": orderId,
                "productId": productId,
                "customerId": customerId,
                "storeId": storeId,
                "quantity": quantity,
                "orderStatus": orderStatus,
                "address": address,
                "contact": contact
            }, options)
                .then(() => {
                    alert("Your order is placed successfully!!")
                    dispatch(DeleteCartItemAction({ productId: productId }))
                })
                .then(() => props.removeHandler());
            return data;
        }
        catch (err) {
            console.log(err.message);
        }
    }
    const updateStock = async (finalQuantity) => {
        try {
            await axios.put(`http://localhost:63623/stock/${storeId}/${productId}`, {
                "quantity": parseInt(finalQuantity)
                , "productId": productId
                , "storeId": storeId
            }
                , options)
        }
        catch (err) {
            console.log(err.message);
        }
    }
    const orderHandler = async () => {
        let finalQuantity = -1;
        const stockDetails = await stockToUpdate();
        finalQuantity = stockDetails.quantity - quantity;
        if (finalQuantity >= 0) {
            await updateStock(finalQuantity);
            await postOrder();
        }
        else {
            alert("Not enough stock in the store...will let you know when the stock updates.You can try reducing the order quantity. Thank you for your patience");
        }
    }
    // const searchStoerId = () => {
    //     storeId = "S0001";
    // }
    // const orderHandler = () => {
    //     axios.post(`http://localhost:63623/orders`, {
    //         "orderId": orderId,
    //         "productId": productId,
    //         "customerId": customerId,
    //         "storeId": storeId,
    //         "quantity": quantity,
    //         "orderStatus": orderStatus,
    //         "address": address,
    //         "contact": contact
    //     }, options)
    //         .then(() => {
    //             alert("Your order is placed successfully!!")
    //             dispatch(DeleteCartItemAction({ productId: productId }))
    //         })
    //         .then(() => props.removeHandler());
    // }
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enter delivery details for placing order:
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <label htmlFor="address">Delivery Address:</label>
                        <input type="text" className="form-control" id="address"
                            onChange={(data) => setAddress(data.target.value)}
                            name='address' />
                    </Row>
                    <Row>
                        <label htmlFor="contact">Contact No.:</label>
                        <input type="text" className="form-control" id="contact"
                            onChange={(data) => setContact(data.target.value)}
                            name='contact' />
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={orderHandler}>Order</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
