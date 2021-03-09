import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

export default function AdminDisplayStocks(props) {
    const options = {
        headers: {
            'content-type': 'application/json',
        }
    };
    const DeleteHandler = () => {
        axios.put(`http://localhost:63623/stock/${props.stock.storeId}/${props.stock.productId}`
            , {
                "quantity": 0
                , "productId": props.stock.productId
                , "storeId": props.stock.storeId
            }
            , options)
            .then((response) => {
                props.rerender(false);
            })
            .then(() => alert(`Successfuly updated stock in store
                                    : ${props.stock.storeId}`));
        // axios.delete(`http://localhost:63623/stock/${props.stock.storeId}/${props.stock.productId}`)
        //     .then(res => alert(`Successfully deleted stock in the store : ${props.stock.productId}`))
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
            <td><Link to='/admin/stock' className='btn btn-primary' onClick={UpdateHandler}>Add Stock</Link></td>
            <td><Link to='/admin/stock' className='btn btn-primary' onClick={DeleteHandler}>Remove Stock</Link></td>
        </tr>
    )
}