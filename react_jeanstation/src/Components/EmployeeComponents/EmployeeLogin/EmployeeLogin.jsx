import axios from 'axios';
import React, { useState } from 'react'
import './EmployeeLogin.css'

export default function EmployeeLogin(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [storeId, setStoreId] = useState('');
    const LogInHandler = (e) => {
        e.preventDefault();
        const loggedCred = { "EmployeeId": userName, "Password": password, "StoreId": storeId };
        const options = {
            headers: {
                'content-type': 'application/json',
            }
        };
        let token = null;
        let tokenType = null;
        let sId = null;
        axios.post("http://localhost:63623/employees/login", loggedCred, options)
            .then((response) => { token = response.data.token; tokenType = response.data.type; sId = response.data.storeId })
            .then(() => {
                if (token === null) {
                    alert('Wrong credentials');
                }
                else {
                    localStorage.setItem("token", token);
                    localStorage.setItem("tokenType", tokenType);
                    localStorage.setItem("storeId", sId)
                    alert('Logged In successfully!!!');
                    props.setFlag(!props.flag);
                }
            })
    }
    return (
        <div className='loginForm'>
            <form className='login_emp__form m-auto pt-5' onSubmit={LogInHandler}>
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
                <div className="form-group">
                    <label htmlFor="storeId"><b>StoreId</b></label>
                    <input type="text" className="form-control" id="storeId" placeholder="StoreId"
                        onChange={(data) => setStoreId(data.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">LogIn</button>
            </form>
        </div>
    )
}
