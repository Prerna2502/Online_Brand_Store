import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

export default function AdminDisplayStore(props) {
    const DeleteHandler=()=>{
        axios.delete(`http://localhost:63623/store/${props.store.storeId}`)
        .then(alert(`Successfully deleted store: ${props.store.storeId}`))
        .then(()=>props.rerender(false))
    }
    const UpdateHandler=()=>{
        props.UpdateHandler(props.store.storeId);
    }
    return (
        <tr>
            <td>{props.store.storeId}</td>
            <td>{props.store.location}</td>
            <td>{props.store.manager}</td>
            <td>{props.store.contact}</td>
            <td>{props.store.address}</td>
            <td><Link to='/admin/store' className='btn btn-primary' onClick={UpdateHandler}>Edit</Link></td>
            <td><Link to='/admin/store' className='btn btn-primary' onClick={DeleteHandler}>Delete</Link></td>
        </tr>
    )
}
