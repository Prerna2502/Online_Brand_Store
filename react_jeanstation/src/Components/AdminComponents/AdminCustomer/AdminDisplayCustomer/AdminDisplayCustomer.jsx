import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

export default function AdminDisplayCustomers(props) {
    const DeleteHandler = () => {
        axios.delete(`http://localhost:63623/customers/${props.customer.customerId}`)
            .then(res => res.data === true ?
                alert(`Successfully deleted customer: ${props.customer.customerId}`)
                : alert(`Deletion Unsuccessful..try again`)
            )
    }
    const UpdateHandler = () => {
        props.updateHandler(props.customer.customerId);
    }
    return (
        <tr key={props.key}>
            <td>{props.customer.customerId}</td>
            <td>{props.customer.FirstName}</td>
            <td>{props.customer.LastName}</td>
            <td>{props.customer.Email}</td>
            <td>{props.customer.ContactNo}</td>
            <td>{props.customer.Password}</td>
            <td>{props.customer.Addresses}</td>
            <td>{props.customer.PastOrderCount}</td>
            <td><Link to='/admin/customers' className='btn btn-primary' onClick={UpdateHandler}>Edit</Link></td>
            <td><Link to='/admin/customers' className='btn btn-primary' onClick={DeleteHandler}>Delete</Link></td>
        </tr>
    )
}