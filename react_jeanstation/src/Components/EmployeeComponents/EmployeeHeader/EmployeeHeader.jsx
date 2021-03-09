import React, { useState } from 'react'
import './EmployeeHeader.css'
import { Link } from 'react-router-dom'
import EmployeeLogOut from '../EmployeeLogOut/EmployeeLogOut';

export default function EmployeeHeader(props) {
    const [modalShow, setModalShow] = useState(false);
    const logOutHandler = () => {
        setModalShow(!modalShow);
    };

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
                        <Link to='/employee/' className='nav-item'>Home</Link>
                    </li>
                    {
                        props.flag ?
                            null
                            :
                            <li className="nav-item mr-1">
                                <Link to='/employee/log_in' className='nav-item'>Log In</Link>
                            </li>
                    }
                    {
                        props.flag ?
                            <li className="nav-item">
                                <Link to='/employee/stock'>Stocks</Link>
                            </li>
                            : null
                    }
                    {
                        props.flag ?
                            <li className="nav-item">
                                <Link to='/employee/orders'>Orders</Link>
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
            <EmployeeLogOut show={modalShow} onHide={() => setModalShow(false)} setFlag={props.setFlag} />
        </nav>
    )
}
