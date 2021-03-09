import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminStocks.css'
import AdminDisplayStocks from './AdminDisplayStocks/AdminDisplayStocks';
import AddStockModal from './AddStockModal/AddStockModal';
import UpdateStockModal from './UpdateStockModal/UpdateStockModal';

export default function AdminStocks() {
    const [flag, setFlag] = useState(true);
    const [stocks, setStocks] = useState([]);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [UpdatemodalShow, setUpdateModalShow] = useState(false);
    const [stockToUpdate, setStockToUpdate] = useState({});
    useEffect(() => {
        axios.get('http://localhost:63623/stock')
            .then(response => {
                setStocks(response.data);
            })
            .then(setFlag(true));
    }, [flag]);
    const reRender = (f) => { setFlag(false) };
    const AddHandler = () => {
        setAddModalShow(!AddmodalShow);
    }
    const UpdateHandler = (storeid, productid,quantity) => {
        setStockToUpdate({
                        "productId": productid
                        , "storeId": storeid
                        , "quantity": quantity
                    });
            setUpdateModalShow(!UpdatemodalShow);
    }
    return (
        <div className="stock-container">
            <h2 className="mt-4">Stocks Information</h2>
            <p>Here You can edit available stocks</p>
            <div className="scroll-me">
                <table className="table table-striped stock-table mt-5">
                    <thead>
                        <tr>
                            <th>Store Id</th>
                            <th>Product Id</th>
                            <th>Quantity</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stocks.map((stock, index) =>
                                <AdminDisplayStocks stock={stock}
                                    UpdateHandler={UpdateHandler}
                                    rerender={reRender}
                                    key={index} />
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Link to='/admin/stock' className='btn btn-primary mr-5 mt-5 mb-5'
                onClick={AddHandler.bind(this)}>Add Stock for new Product</Link>
            <AddStockModal show={AddmodalShow} onHide={() => setAddModalShow(false)}
                rerender={reRender} />
            <UpdateStockModal show={UpdatemodalShow} onHide={() => setUpdateModalShow(false)}
                storeId={stockToUpdate.storeId} productId={stockToUpdate.productId} quantity={stockToUpdate.quantity}
                stockToUpdate={stockToUpdate} reRender={reRender} />
        </div>
    )
}