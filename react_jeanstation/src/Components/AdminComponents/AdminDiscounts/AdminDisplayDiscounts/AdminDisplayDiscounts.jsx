import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

export default function AdminDisplayDiscounts(props) {
    const DeleteHandler = () => {
        axios.delete(`http://localhost:63623/discount/${props.discount.minimumOrderAmount}`)
            .then(res => alert(`Successfully deleted discount on : ${props.discount.minimumOrderAmount}`))
            .then(() => props.rerender(false))
    }
    const UpdateHandler = () => {
        props.UpdateHandler(props.discount.minimumOrderAmount);
    }
    return (
        <tr>
            <td>{props.discount.minimumOrderAmount}</td>
            <td>{props.discount.minimumPastOrder}</td>
            <td>{props.discount.discountPercent}</td>
            <td><Link to='/admin/discount' className='btn btn-primary' onClick={UpdateHandler}>Edit</Link></td>
            <td><Link to='/admin/discount' className='btn btn-primary' onClick={DeleteHandler}>Delete</Link></td>
        </tr>
    )
}