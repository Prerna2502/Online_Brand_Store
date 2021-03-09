import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Register.css'

export default function Register() {
    const [cusId, setCusId] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [contact, setContact] = useState();
    const [addresses, setAddresses] = useState();
    const pastOrderCount = "0";
    const intpastOrderCount = 0;
    const RegisterHandler = () => {
        if (cusId != null
            && fname != null
            && email != null
            && contact != null
            && addresses != null
            && password != null
        ) {
            const success = "You are successfuly registered";
            const successDetails = "Added Customer To Db";
            let customer = {
                "customerId": cusId,
                "firstName": fname,
                "lastName": lname,
                "email": email,
                "pastOrderCount": pastOrderCount,
                "password": password,
                "contactNo": contact,
                "addresses": [addresses]
            }
            let customerDetails = {
                "customerId": cusId,
                "firstName": fname,
                "lastName": lname,
                "email": email,
                "pastOrderCount": intpastOrderCount
            }
            const options = {
                headers: {
                    'content-type': 'application/json',
                }
            };
            let valid = false;
            const requestone = axios.post("http://localhost:63623/customers/register", customer, options)
            const requesttwo = axios.post("http://localhost:63623/customer", customerDetails, options)
            // axios.post("http://localhost:63623/customers/register", customer, options)
            //     .then((response) => {
            //         if (response.data === success) {
            //             valid = true;
            //             axios.post("http://localhost:63623/customer", customerDetails, options)
            //                 .then((response) => {
            //                     if (response.data == successDetails) {
            //                         alert("You are successfully registered..proceed to login");
            //                     }
            //                     else {
            //                         alert("Registration Failed 2");
            //                     }
            //                 })
            //         }
            //         else {
            //             alert("Registration Failed 1");
            //         }
            //     })
            axios.all([requestone,requesttwo]).then(axios.spread((...response)=>{
                alert("Registered");

            }))
            .catch(()=> alert("cant register"))
        }
        else {
            alert("Plese enter all the required details");
        }
    }
    return (
        <div className='registerForm'>
            <form className='m-auto pt-5 formForregister' onSubmit={RegisterHandler}>
                <div className="form-group">
                    <label htmlFor="cusId"><b>Your Id</b></label>
                    <input type="text" className="form-control" id="cusId" placeholder="Enter RegistrationId"
                        onChange={(data) => setCusId(data.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="fname"><b>First Name</b></label>
                    <input type="text" className="form-control" id="fname" placeholder="Enter first name"
                        onChange={(data) => setFname(data.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lname"><b>Last Name</b></label>
                    <input type="text" className="form-control" id="lname" placeholder="Enter last name"
                        onChange={(data) => setLname(data.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email"
                        onChange={(data) => setEmail(data.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="contact"><b>Contact</b></label>
                    <input type="text" className="form-control" id="contact" placeholder="Enter contact"
                        onChange={(data) => setContact(data.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address"><b>Address</b></label>
                    <input type="text" className="form-control" id="address" placeholder="Enter address"
                        onChange={(data) => setAddresses(data.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1"><b>Password</b></label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                        onChange={(data) => setPassword(data.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <br />
                <br />
                <Link to='/customer/login'>Already Registered with us? Click here to login</Link>
            </form>
        </div>
    )
}
