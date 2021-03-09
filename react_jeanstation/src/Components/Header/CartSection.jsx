import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
export default function CartSection() {
    const cartItem = useSelector(state => state.cartItem)
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItem.map(e =>
                            <tr>
                                <td>{e.productName}</td>
                                <td>{e.quantity}</td>
                                <td>{'$ ' + e.productPrice}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <Link className="btn btn-primary mt-2"
                style={{ color: "black" }}
                to={{
                    pathname: '/customer/cart',
                }}
            >View Complete Cart</Link>
        </div>
    )
}
