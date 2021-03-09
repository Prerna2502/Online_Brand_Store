import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Login.css'
import { useDispatch } from "react-redux";
import { SetCustomerLogedInAction } from "../../../States/Actions/ActionCustomerLogedIn";

export default function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    //Harsh made a change
    const dispatch = useDispatch();
    //change ends
    const LogInHandler = (e) => {
        e.preventDefault();
        const loggedCred = { "CustomerId": userName, "Password": password };
        const options = {
            headers: {
                'content-type': 'application/json',
            }
        };
        let token = null;
        let tokenType = null;
        let customerId = null;
        let customerName = null;
        axios.post("http://localhost:63623/customers/login", loggedCred, options)
            .then((response) => { token = response.data.token; tokenType = response.data.type; customerId = response.data.cId })
            .then(() => {
                if (token === null) {
                    alert('Wrong credentials');
                }
                else {
                    localStorage.clear();
                    localStorage.setItem("token", token);
                    localStorage.setItem("tokenType", tokenType);
                    localStorage.setItem("customerId", customerId);
                    //Harsh made a change
                    dispatch(SetCustomerLogedInAction(true));
                    //change ends 
                    alert('Logged In successfully!!!');
                    axios.get(`http://localhost:63623/customer/${customerId}`)
                        .then((response) => {
                            customerName = response.data.firstName;
                            localStorage.setItem("customerName", customerName);
                        })
                        .then(() => props.setFlag(!props.flag));
                }
            })
    }
    return (
        <div className='loginForm'>
            <form className='m-auto pt-5 formForLogIn' onSubmit={LogInHandler}>
                <div className="form-group">
                    <label htmlFor="userName"><b>User Name</b></label>
                    <input type="text" className="form-control" id="userName" placeholder="Enter username"
                        onChange={(data) => setUserName(data.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1"><b>Password</b></label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                        onChange={(data) => setPassword(data.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">LogIn</button>
                <br />
                <br />
                <Link to='/customer/register'>New User? Click here to register</Link>
            </form>
        </div>
    )
}
