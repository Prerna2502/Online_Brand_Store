import React, { useState, useEffect } from 'react'
import { Redirect, Route } from "react-router-dom";
import axios from 'axios'
import './CustomerService.css'
export default function CustomerService() {
    const [Store, _] = useState({ contact: "9999999999", address: "Jean Station Plot No.7, Oxygen Business Park SEZ, Tower, 3, Noida-Greater Noida Expy, Sector 144, Noida, Uttar Pradesh 201304" })
    return (
        <div className="main col-md-12">
            <div class="alert alert-success col-md-6  offset-md-3" role="alert">
                <h4 class="alert-heading">Questions about an issue? </h4>
                <p>Contact our store Manager on <b>{Store.contact}</b></p>
                <hr />
                <p class="mb-0">Or come meet us </p>
                <p><b >{Store.address}</b></p>
            </div>
        </div>
    )
}

