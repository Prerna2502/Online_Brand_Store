import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { SetCustomerLogedInAction } from "../../States/Actions/ActionCustomerLogedIn";
import "./Sidebar.css";
export default function Sidebar(props) {
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(SetCustomerLogedInAction(false));
        localStorage.clear();
        props.setCustomerLogedIn(false);
        alert('You are successfully LoggedOut.')
    }
    var history = useHistory();
    const categorySelected = (e, category) => {
        e.preventDefault();
        let url = 'http://localhost:63623/Product/categoryonly/' + category;
        axios.get(url)
            .then(response => {
                var result = response.data;
                let to = {
                    pathname: '/SearchProduct',
                    Searchedproducts: [...result]
                }
                history.push(to);
            })
            .catch();
    }
    return (
        <div className="sidebar_main col-md-3 collapse" id="sidebarToggle">
            {
                props.customerLogedIn ? <div className="sidebar_item">
                    <Link to={{
                        pathname: '/customerOrders',
                        CustomerId: props.CustomerId
                    }}>My Orders</Link>
                </div> : <div></div>
            }
            <div className="sidebar_item" data-toggle="collapse" href="#sidenavDropdown"
                role="button" aria-expanded="false" aria-controls="collapseExample">
                <div>
                    Categories
                </div>
                <span className="fa fa-caret-down ml-3"></span>
            </div>
            <div className="collapse" id="sidenavDropdown">
                <ul>
                    <li className=""><Link className="sidebar_item" to="" onClick={(e) => categorySelected(e, 'handbag')}>Hand Bags</Link></li>
                    <li className=""><Link className="sidebar_item" to="" onClick={(e) => categorySelected(e, 'sidebag')}>Side Bags</Link></li>
                    <li className=""><Link to="" className="sidebar_item" onClick={(e) => categorySelected(e, 'clutch')}>Clutch</Link></li>
                    <li className=""><Link to="" className="sidebar_item" onClick={(e) => categorySelected(e, 'travelbag')}>Travel Bags</Link></li>
                    <li className=""><Link to="" className="sidebar_item" onClick={(e) => categorySelected(e, 'wallet')}>Wallets</Link></li>
                    <li className=""><Link to="" className="sidebar_item" onClick={(e) => categorySelected(e, 'grocerybag')}>Grocery Bags</Link></li>
                    <li className=""><Link to="" className="sidebar_item" onClick={(e) => categorySelected(e, 'barrelbag')}>Barrel Bags</Link></li>
                </ul>
            </div>
            <div className="sidebar_item">
                <Link to={{
                    pathname: '/customerService',
                    CustomerId: props.CustomerId
                }}>Customer Service</Link>
            </div>
            {
                props.customerLogedIn ? <div className="sidebar_item">
                    <Button variant="light" onClick={logOut}>Log Out</Button>
                </div> : <div></div>
            }
        </div>
    )
}
