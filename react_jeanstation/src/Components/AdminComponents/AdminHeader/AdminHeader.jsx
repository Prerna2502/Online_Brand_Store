import React, { useState } from 'react'
import './AdminHeader.css'
import { Link } from 'react-router-dom'
import AdminLogOut from '../AdminLogOut/AdminLogOut'
import AddModal from '../AddNewAdmin/AddModal/AddModal'

export default function AdminHeader(props) {
    const [modalShow, setModalShow] = useState(false);
    const [addAdminModalShow, setAddAdminModalShow] = useState(false);
    const logOutHandler = () => {
        setModalShow(!modalShow);
    };
    const adminHandler = () => {
        setAddAdminModalShow(!addAdminModalShow);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand title" href=".">{props.title}</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ul-nav">
                    <li className="nav-item mr-1">
                        <Link to='/admin/' className='nav-item'>Home</Link>
                    </li>
                    {
                        props.flag ?
                            null
                            :
                            <li className="nav-item mr-1">
                                <Link to='/admin/log_in' className='nav-item'>Log In</Link>
                            </li>
                    }
                    {
                        props.flag ?
                            <li className="nav-item">
                                <Link to='/admin/employees'>Employees</Link>
                            </li>
                            : null
                    }
                    {
                        props.flag ?
                            <li className="nav-item">
                                <Link to='/admin/products'>Products</Link>
                            </li>
                            : null
                    }
                    {
                        props.flag ?
                            <li className="nav-item">
                                <Link to='/admin/store'>Stores</Link>
                            </li>
                            : null
                    }
                    {
                        props.flag ?
                            <li className="nav-item">
                                <Link to='/admin/stock'>Stocks</Link>
                            </li>
                            : null
                    }
                    {/* {
                        props.flag ?
                            <li className="nav-item">
                                <Link to='/admin/customers'>Customers</Link>
                            </li>
                            : null
                    } */}
                    {
                        props.flag ?
                            <li className="nav-item">
                                <Link to='/admin/orders'>Orders</Link>
                            </li>
                            : null
                    }
                    {
                        props.flag ?
                            <li className="nav-item">
                                <Link to='/admin/discount'>Discounts</Link>
                            </li>
                            : null
                    }
                    {
                        props.flag ?
                            <li className="nav-item mr-1">
                                <button className='btn btn-secondary mr-5'
                                    onClick={adminHandler}>Add New Admin</button>
                            </li>
                            : null
                    }
                    <br />
                    {
                        props.flag ?
                            <li className="nav-item mr-1">
                                <button className='btn btn-secondary mr-5'
                                    onClick={logOutHandler}>Log Out</button>
                            </li>
                            : null
                    }
                </ul>
            </div>
            <AddModal show={addAdminModalShow} onHide={() => setAddAdminModalShow(false)} />
            <AdminLogOut show={modalShow} onHide={() => setModalShow(false)} setFlag={props.setFlag} />
        </nav>
    )
}
