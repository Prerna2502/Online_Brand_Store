import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

export default function AdminDisplayEmployees(props) {
    const DeleteHandler = () => {
        axios.delete(`http://localhost:63623/employees/${props.employee.employeeId}`)
            .then(res => res.data === true ?
                alert(`Successfully deleted employee: ${props.employee.employeeId}`)
                : alert(`Deletion Unsuccessful..try again`)
            )
            .then(() => props.rerender(false))
    }
    const UpdateHandler = () => {
        props.UpdateHandler(props.employee.employeeId);
    }
    return (
        <tr>
            <td>{props.employee.employeeId}</td>
            <td>{props.employee.firstName}</td>
            <td>{props.employee.lastName}</td>
            <td>{props.employee.email}</td>
            <td>{props.employee.contactNo}</td>
            <td>{props.employee.password}</td>
            <td>{props.employee.address}</td>
            <td>{props.employee.designation}</td>
            <td>{props.employee.storeId}</td>
            <td><Link to='/admin/employees' className='btn btn-primary' onClick={UpdateHandler}>Edit</Link></td>
            <td><Link to='/admin/employees' className='btn btn-primary' onClick={DeleteHandler}>Delete</Link></td>
        </tr>
    )
}