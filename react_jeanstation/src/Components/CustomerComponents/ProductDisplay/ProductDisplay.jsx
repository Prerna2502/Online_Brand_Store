import { Button } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import React, { useState } from 'react'
import './ProductDisplay.css'
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { AddCartItemAction } from "../../../States/Actions/ActionCart";

export default function ProductDisplay(props) {
    const [currentQuantity, steCurrentQuantity] = useState(1);
    const [customerId, _] = useState(localStorage.getItem("customerId"));
    const CartItems = useSelector(state => state.cartItem);
    const customerLogedIn = useSelector(state => state.customerLogedIn)
    const dispatch = useDispatch();
    const addToCart = () => {
        if (!customerLogedIn) {
            alert("please login to continue");
            return;
        }
        let url = 'http://localhost:63623/Cart';
        let data = {
            customerId: customerId,
            productId: props.location.product.productId,
            quantity: currentQuantity
        }
        let tempcartItem = {
            productId: props.location.product.productId,
            productName: props.location.product.productName,
            quantity: currentQuantity,
            productPrice: props.location.product.productPrice,
            productImage: props.location.product.productImage,
        }
        let options = {
            headers: {
                'content-type': 'application/json',
            }
        }
        axios.post(url, data, options)
            .then(response => {
                dispatch(AddCartItemAction(tempcartItem))
            })
            .catch(error => alert("Problem Occoured- Not Added To Cart"))
    }
    if (!('location' in props)) {
        return (
            <div style={{ minHeight: "85vh" }}>Nothing found</div>
        )
    }
    else if (!('product' in props.location)) {
        return (
            <div style={{ minHeight: "85vh" }}>Nothing found</div>
        )
    }
    return (
        <section className="d-flex flex-column pb-5" id="product_description">
            <div className="product_section_1">
                <div className="product_image_section_1_1 col-sm-6">
                    <div className="product_image_display">
                        <img className="img-fluid product_image_display" src={props.location.product.productImage} alt="no images found" />
                    </div>
                </div>
                <div className="product_nameBuy_section_1_2 col-sm-6">
                    <div className="d-flex justify-content-center"><h4>{props.location.product.productName}</h4></div>
                    <div className="d-flex flex-column">
                        <div className="d-flex p-3 flex-column">
                            <h6 className="px-auto">About</h6>
                            <span><br></br>{props.location.product.description}</span>
                        </div>
                        <div className="d-flex p-3">
                            <h6>Price $</h6>
                            <h6>{props.location.product.productPrice} per item</h6>
                        </div>
                        <div className="d-flex p-3 align-items-center">
                            <h6>Quantity</h6>
                            <div className="m-1">
                                <Button variant="dark" className="m-2" onClick={e => steCurrentQuantity(currentQuantity + 1)}>+</Button>
                                <span>{currentQuantity}</span>
                                <Button variant="dark" className="m-2" onClick={e => steCurrentQuantity(currentQuantity - 1)}>-</Button>
                            </div>
                        </div>
                        <div className="d-flex p-3">
                            <div className="d-flex p-3">
                                <button className="btn btn-primary" onClick={addToCart}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
