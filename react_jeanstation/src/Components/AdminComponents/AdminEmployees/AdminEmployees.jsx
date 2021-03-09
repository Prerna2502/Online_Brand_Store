import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminDisplayEmployees from './AdminDisplayEmployees/AdminDisplayEmployees';
import AddEmployeeModal from './AddEmployeeModal/AddEmployeeModal';
import UpdateEmployeeModal from './UpdateEmployeeModal/UpdateEmployeeModal';
import './AdminEmployees.css'

export default function AdminEmployees() {
    const [flag, setFlag] = useState(true);
    const [Employees, setEmployees] = useState([]);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [UpdatemodalShow, setUpdateModalShow] = useState(false);
    const [employeeToUpdate, setEmployeeToUpdate] = useState({});
    useEffect(() => {
        axios.get('http://localhost:63623/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .then(setFlag(true));
    }, [flag]);
    const reRender = (f) => { setFlag(false) };
    const AddHandler = () => {
        setAddModalShow(!AddmodalShow);
    }
    const UpdateHandler = (id) => {
        axios.get(`http://localhost:63623/employees/${id}`)
            .then((response) => {
                setEmployeeToUpdate({
                    "employeeId": response.data.employeeId
                    , "firstName": response.data.firstName
                    , "lastName": response.data.lastName
                    , "email": response.data.email
                    , "contactNo": response.data.contactNo
                    , "password": response.data.password
                    , "address": response.data.address
                    , "designation": response.data.designation
                    , "storeId": response.data.storeId
                })
            })
            .then(setUpdateModalShow(!UpdatemodalShow));
    }
    return (
        <div className="employee-container">
            <h2 className="mt-4">Employees Information</h2>
            <p>Here You can edit available employees</p>
            <div className="scroll-me">
                <table className="table table-striped employee-table mt-5">
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                            <th>Contact No.</th>
                            <th>Password</th>
                            <th>Address</th>
                            <th>Designation</th>
                            <th>Store Id</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Employees.map((employee, index) =>
                                <AdminDisplayEmployees employee={employee}
                                    UpdateHandler={UpdateHandler}
                                    rerender={reRender}
                                    key={index} />
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Link to='/admin/employees' className='btn btn-primary mr-5 mt-5 mb-5'
                onClick={AddHandler.bind(this)}>Add Employee</Link>
            <AddEmployeeModal show={AddmodalShow} onHide={() => setAddModalShow(false)}
                rerender={reRender} />
            <UpdateEmployeeModal show={UpdatemodalShow} onHide={() => setUpdateModalShow(false)}
                employee={employeeToUpdate} reRender={reRender} />
        </div>
    )
}
