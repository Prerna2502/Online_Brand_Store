import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminProducts.css'
import AdminDisplayProducts from './AdminDisplayProducts/AdminDisplayProducts';
import AddProductModal from './AddProductModal/AddProductModal';
import UpdateProductModal from './UpdateProductModal/UpdateProductModal';

export default function AdminProducts() {
    const [flag, setFlag] = useState(true);
    const [products, setProducts] = useState([]);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [UpdatemodalShow, setUpdateModalShow] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState({});
    useEffect(() => {
        axios.get('http://localhost:63623/product')
            .then(response => {
                setProducts(response.data);
            })
            .then(setFlag(true));
    }, [flag]);
    const reRender = (f) => { setFlag(false) };
    const AddHandler = () => {
        setAddModalShow(!AddmodalShow);
    }
    const UpdateHandler = (id) => {
        axios.get(`http://localhost:63623/product/productId/${id}`)
            .then((response) => {
                setProductToUpdate({
                    "productId": response.data.productId
                    , "productName": response.data.productName
                    , "productPrice": response.data.productPrice
                    , "productType": response.data.productType
                    , "productImage": response.data.productImage
                    , "description": response.data.description
                    , "gender": response.data.gender
                    , "filterTag": response.data.filterTag
                })
            })
            .then(setUpdateModalShow(!UpdatemodalShow));
    }
    return (
        <div className="product-container">
            <h2 className="mt-4">Products Information</h2>
            <p>Here You can edit and add products</p>
            <div className="scroll-me">
                <table className="table table-striped product-table mt-5">
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>ImageUrl</th>
                            <th>Description</th>
                            <th>Suitable Gender</th>
                            <th>Filter Tag</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) =>
                                <AdminDisplayProducts product={product}
                                    UpdateHandler={UpdateHandler}
                                    rerender={reRender}
                                    key={index} />
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Link to='/admin/products' className='btn btn-primary mr-5 mt-5 mb-5'
                onClick={AddHandler.bind(this)}>Add Product</Link>
            <AddProductModal show={AddmodalShow} onHide={() => setAddModalShow(false)}
                rerender={reRender} />
            <UpdateProductModal show={UpdatemodalShow} onHide={() => setUpdateModalShow(false)}
                product={productToUpdate} reRender={reRender} />
        </div>
    )
}
