import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddCustomerModal from './AddCustomerModal/AddCustomerModal'
import UpdateCustomerModal from './UpdateCustomerModal/UpdateCustomerModal';
import AdminDisplayCustomers from './AdminDisplayCustomer/AdminDisplayCustomer'

export default function AdminCustomers() {
    const [flag, setFlag] = useState(true);
    const [Customers, setCustomers] = useState([]);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [UpdatemodalShow, setUpdateModalShow] = useState(false);
    const [updateId, setUpdateId] = useState();
    useEffect(() => {
        axios.get('http://localhost:63623/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .then(setFlag(true));
    }, [flag]);
    const reRender = (f) => { setFlag(f) };
    const AddHandler = () => {
        setAddModalShow(!AddmodalShow);
    }
    const UpdateHandler = (id) => {
        setUpdateId(id);
        setUpdateModalShow(!UpdatemodalShow);
    }
    return (
        <div className="customer-container">
            <h2>Customers Information</h2>
            <p>Here You can edit available customers</p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Customer Id</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Contact No.</th>
                        <th>Password</th>
                        <th>Address</th>
                        <th>Past Order Count</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Customers.map((customer, index) =>
                            <AdminDisplayCustomers customer={customer}
                                UpdateHandler={UpdateHandler}
                                key={index} />
                        )
                    }
                </tbody>
            </table>
            <Link to='/admin/customers' className='btn btn-primary mr-5'
                onClick={AddHandler.bind(this)}>Add Customer</Link>
            <AddCustomerModal show={AddmodalShow} onHide={() => setAddModalShow(false)}
                reRender={reRender} />
            <UpdateCustomerModal show={UpdatemodalShow} onHide={() => setUpdateModalShow(false)}
                updateId={updateId} reRender={reRender} />
        </div>
    )
}
