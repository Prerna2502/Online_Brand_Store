import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DeleteCartItemAction } from "../../../../States/Actions/ActionCart";
import { useDispatch, useSelector } from "react-redux";
import PlacingOrderModal from '../../PlacingOrder/PlacingOrderModal';

export default function CartCard({ customerId, productId, quantity, setFlag }) {
    const cartItems = useSelector(state => state.cartItem);
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        "productImage": null,
        "productName": null,
        "productPrice": null,
        "productType": null,
        "description": null
    });
    const [buyModalShow, setBuyModelShow] = useState(false);
    useEffect(() => {
        axios.get(`http://localhost:63623/product/productId/${productId}`)
            .then((response) => {
                setProduct(response.data);
            })
    }, [productId])
    const buyHandler = () => {
        setBuyModelShow(!buyModalShow);
    }
    const removeHandler = () => {
        axios.delete(`http://localhost:63623/cart/${customerId}/${productId}`)
            .then(() => {
                setFlag(false);
                dispatch(DeleteCartItemAction({ productId: productId }))
            })
    }
    return (
        <div className='card product-card'>
            {
                product.productImage != null ?
                    <img className='card-img-top' src={product.productImage} alt='No img availabe for this product' />
                    : null
            }
            <div className='card-body'>
                {
                    product.productName != null ?
                        <div className='card-text'><h4>{product.productName}</h4></div>
                        : null
                }
                {
                    product.productPrice != null ?
                        <div className='card-title font-weight-bold'>Price:{product.productPrice} </div>
                        : null
                }
                {
                    product.productType != null ?
                        <div className='card-text'><b>  Product Type: </b>{product.productType}</div>
                        : null
                }
                <br />
                {
                    product.description != null ?
                        <div className='card-text'>{product.description}</div>
                        : null
                }
                <br />
                {
                    quantity != null ?
                        <div className='card-text'><b>  Quantity: </b>{quantity}</div>
                        : null
                }
                <br />
                <button className='btn btn-success d-block mb-1 mx-auto' onClick={buyHandler}>Buy</button>
                <button className='btn btn-success d-block mb-1 mx-auto' onClick={removeHandler}>Remove</button>
            </div>
            <PlacingOrderModal show={buyModalShow} onHide={() => setBuyModelShow(false)}
                productId={productId} customerId={customerId} quantity={quantity} setFlag={setFlag}
                removeHandler={removeHandler} />
        </div>
    )
}