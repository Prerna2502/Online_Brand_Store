import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './OrderCard.css'

export default function OrderCard({ orderId, productId, quantity, orderStatus, orderDateTime, Contact, Address, setFlag }) {
    const [product, setProduct] = useState([]);
    const [discount, setDiscount] = useState();
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        let url = `http://localhost:63623/Product/productid/${productId}`;
        axios.get(url)
            .then((response) => {
                setProduct(response.data);
                let tempTotal = product.productPrice * quantity;
                setTotalPrice(tempTotal);
                let discurl = `http://localhost:56804/api/Discount/applydiscount/${response.data.productPrice * quantity}`;
                axios.get(discurl)
                    .then(res => {
                        setDiscount(res.data.discountPercent);
                        var tempDiscountedprice = product.productPrice * quantity - product.productPrice * quantity * discount / 100;
                        setDiscountedPrice(tempDiscountedprice);
                    })
                    .catch()
            })
            .catch();
    }, [discountedPrice])

    return (
        <div>
            <div class="flexmain d-flex bd-highlight text-left row ">
                <div class="p-2 flex-fill bd-highlight col-md-4">
                    <img className='card-img-top' src={product.productImage} alt='Image Not Available' />
                </div>
                <div class="flexsecond p-2 flex-fill bd-highlight col-md-4 p-4">
                    <b> <h3>Order<span className="text-secondary"> #{orderId}</span></h3></b>
                    <br />
                    <h5>{product.productName}</h5>
                    <p><b>  Product Type: </b>{product.productType}</p>
                    <br /><br />
                    <p><b>Delivery Address: </b>{Address}</p>
                    <p><b>Contact: </b>{Contact}</p>
                </div>
                <div class="flexthird p-2 flex-fill bd-highlight col-sm-3 col-md-3">
                    <p><b>Actual Total Price</b>:<span className="text-danger">${product.productPrice * quantity}</span> </p>
                    <p><b>Discount Total Price:<span className="text-primary">${discountedPrice}</span></b></p>
                    <p><b>Quantity: </b>{quantity}</p>
                    <p><b>Ordered on:</b> {orderDateTime.slice(0, 10)}</p>
                    <p> <b>Status: <span className="text-success">{orderStatus}</span></b></p>
                </div>
            </div>

        </div>
    )
}
