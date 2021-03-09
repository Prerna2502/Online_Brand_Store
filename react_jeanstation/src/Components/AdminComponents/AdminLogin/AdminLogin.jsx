import axios from 'axios';
import React, { useState } from 'react'
import './AdminLogin.css'

export default function AdminLogin(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const LogInHandler = (e) => {
        e.preventDefault();
        const loggedCred = { "AdminId": userName, "AdminPassword": password };
        const options = {
            headers: {
                'content-type': 'application/json',
            }
        };
        let token = null;
        let tokenType = null;
        axios.post("http://localhost:63623/admin/login", loggedCred, options)
            .then((response) => { token = response.data.token; tokenType = response.data.type })
            .then(() => {
                if (token === null) {
                    alert('Wrong credentials');
                }
                else {
                    localStorage.setItem("token", token);
                    localStorage.setItem("tokenType", tokenType);
                    alert('Logged In successfully!!!');
                    props.setFlag(!props.flag);
                }
            })
    }
    return (
        <div className='loginForm'>
            <form className='m-auto pt-5 login_admin_form' onSubmit={LogInHandler}>
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
            </form>
        </div>
    )
}
