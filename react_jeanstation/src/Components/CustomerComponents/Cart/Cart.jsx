import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CartCard from './CartCard/CartCard';

export default function Cart({ customerId }) {
    const [cart, setCart] = useState([]);
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        const cId = localStorage.getItem("customerId") || customerId || "c1";
        axios.get(`http://localhost:63623/cart/${cId}`)
            .then((response) => {
                setCart(response.data);
            })
    }, [flag]);

    return (
        <div className='card-columns pb-5 mt-3 mx-3'>
            {
                cart.map((product, index) =>
                    <CartCard customerId={product.customerId} productId={product.productId} quantity={product.quantity} key={index} setFlag={setFlag} />
                )
            }
        </div>
    )
}
