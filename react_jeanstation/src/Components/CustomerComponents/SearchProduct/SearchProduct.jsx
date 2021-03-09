import React from 'react'
import { Redirect } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function SearchProduct(props) {
    if (!('products' in props)) {
        return (
            <div style={{ minHeight: "85vh" }}>Nothing found</div>
        )
    }
    else if (!('Searchedproducts' in props.products)) {
        return (
            <div style={{ minHeight: "85vh" }}>Nothing found</div>
        )
    }
    else
        return (
            <div className="container pb-5" style={{ minHeight: "80vh" }}>
                <div className="">
                    <div className="h1 text-center">Matching Products</div>
                </div>
                <div className="row justify-content-center">
                    {props.products.Searchedproducts.map(product =>
                        <ProductCard product={product} key={product.productId} />
                    )}
                </div>
            </div>
        )
}
