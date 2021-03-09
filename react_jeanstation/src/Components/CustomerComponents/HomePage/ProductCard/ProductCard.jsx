import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'
export default function ProductCard() {
    const [productDetails, setProductDetails] = useState([])
    useEffect(() => {
        axios.get('http://localhost:63623/Product')
            .then(Response => {
                setProductDetails(Response.data)
            })
            .catch(() => alert("Please Check Your Internet Connection"))
    }, [])

    return (

        <div class="ProductList row justify-content-center align-items-start offset-md-2">
            {
                productDetails.map(item =>
                    <div class="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                        <Link to={{
                            pathname: "/Product",
                            product: item
                        }} className="CardLink">
                            <div class="cardMain card p-2  m-2">
                                <div class="cardProduct card-body">
                                    <img className="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 p-0" src={item.productImage} alt="bag image" />
                                    <div className="CardCaption">
                                        <h5 class="card-title"><span className="text-dark">{item.productName}</span></h5>
                                        <p>$ <b className="text-success">{item.productPrice}</b></p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
        </div>

    )
}
