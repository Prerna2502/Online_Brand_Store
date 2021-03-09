import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard/OrderCard'

export default function OrderStatus() {
    const [order, setOrder] = useState([]);
    const [customerId, _] = useState(localStorage.getItem("customerId"))
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        let url = `http://localhost:63623/orders/${customerId}`;
        axios.get(url)
            .then((response) => {
                setOrder(response.data);
            })
    }, [flag]);

    return (
        <div className='container pb-5'>
            {
                order.map((product, index) =>
                    <OrderCard Address={product.address} Contact={product.contact} orderId={product.orderId} productId={product.productId} quantity={product.quantity} orderStatus={product.orderStatus} orderDateTime={product.orderDateTime} key={index} setFlag={setFlag} />
                )
            }
        </div>
    )
}
