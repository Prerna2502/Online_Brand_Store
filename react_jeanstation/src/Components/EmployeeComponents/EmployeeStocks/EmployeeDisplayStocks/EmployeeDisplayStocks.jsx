import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

export default function EmployeeDisplayStocks(props) {
    const storeId = localStorage.getItem("storeId");
    const options = {
        headers: {
            'content-type': 'application/json',
        }
    };
    const DeleteHandler = () => {
        axios.put(`http://localhost:63623/stock/${storeId}/${props.stock.productId}`
            , {
                "quantity": 0
                , "productId": props.stock.productId
                , "storeId": storeId
            }
            , options)
            .then((response) => {
                props.rerender(false);
                // props.onHide();
            })
            .then(() => alert(`Successfuly updated stock in store
                                    : ${storeId}`));
        // axios.delete(`http://localhost:63623/stock/${storeId}/${props.stock.productId}`)
        //     .then(res => alert(`Successfully deleted stock of the product : ${props.stock.productId}`))
        //     .then(() => props.rerender(false))
    }
    const UpdateHandler = () => {
        props.UpdateHandler(props.stock.storeId, props.stock.productId,props.stock.quantity);
    }
    return (
        <tr>
            <td>{props.stock.storeId}</td>
            <td>{props.stock.productId}</td>
            <td>{props.stock.quantity}</td>
            <td><Link to='/employee/stock' className='btn btn-primary' onClick={UpdateHandler}>Add Stock</Link></td>
            <td><Link to='/employee/stock' className='btn btn-primary' onClick={DeleteHandler}>Remove Stock</Link></td>
        </tr>
    )
}