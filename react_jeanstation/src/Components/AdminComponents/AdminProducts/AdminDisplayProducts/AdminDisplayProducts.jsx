import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

export default function AdminDisplayProducts(props) {
    const DeleteHandler = () => {
        axios.delete(`http://localhost:63623/product/${props.product.productId}`)
            .then(res => res.data === "Product deleted successfully" ?
                alert(`Successfully deleted product: ${props.product.productId}`)
                : alert(`Deletion Unsuccessful..try again`)
            )
            .then(() => props.rerender(false))
    }
    const UpdateHandler = () => {
        props.UpdateHandler(props.product.productId);
    }
    return (
        <tr>
            <td>{props.product.productId}</td>
            <td>{props.product.productName}</td>
            <td>{props.product.productPrice}</td>
            <td>{props.product.productType}</td>
            <td id="scrolltd">{props.product.productImage}</td>
            <td id="scrolltd">{props.product.description}</td>
            <td>{props.product.gender}</td>
            <td>{props.product.filterTag}</td>
            <td><Link to='/admin/products' className='btn btn-primary' onClick={UpdateHandler}>Edit</Link></td>
            <td><Link to='/admin/products' className='btn btn-primary' onClick={DeleteHandler}>Delete</Link></td>
        </tr>
    )
}