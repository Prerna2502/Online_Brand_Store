import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

export default function EmployeeDisplayOrders(props) {
    const DeleteHandler = () => {
        axios.delete(`http://localhost:63623/orders/${props.order.orderId}`)
            .then(() => {
                alert(`Successfully deleted order: ${props.order.orderId}`)
                props.rerender(false);
            })
    }
    const UpdateHandler = () => {
        props.UpdateHandler(props.order.orderId);
    }
    const UpdateStatusHandler = () => {
        props.UpdateStatusHandler(props.order.orderId, props.order);
    }
    return (
        <tr>
            <td>{props.order.orderId}</td>
            <td>{props.order.customerId}</td>
            <td>{props.order.productId}</td>
            <td>{props.order.storeId}</td>
            <td>{props.order.contact}</td>
            <td>{props.order.quantity}</td>
            <td>{props.order.address}</td>
            <td>{props.order.orderStatus}</td>
            <td>{props.order.orderDateTime}</td>
            <td><Link to='/employee/orders' className='btn btn-primary' onClick={UpdateStatusHandler}>Edit Status</Link></td>
            <td><Link to='/employee/orders' className='btn btn-primary' onClick={UpdateHandler}>Edit Order</Link></td>
            <td><Link to='/employee/orders' className='btn btn-primary' onClick={DeleteHandler}>Delete</Link></td>
        </tr>
    )
}
