import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import EmployeeDisplayOrders from './EmployeeDisplayOrders/EmployeeDisplayOrders'
import AddOrdersModal from './AddOrdersModal/AddOrdersModal'
import UpdateOrdersModal from './UpdateOrdersModal/UpdateOrdersModal'
import UpdateOrderStatusModal from './UpdateOrderStatusModal/UpdateOrderStatusModal'
import './EmployeeOrders.css'

export default function EmployeeOrders() {
    const [flag, setFlag] = useState(true);
    const [orders, setOrders] = useState([]);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [UpdatemodalShow, setUpdateModalShow] = useState(false);
    const [UpdateStatusmodalShow, setUpdateStatusModalShow] = useState(false);
    const [orderIdToUpdate, setOrderIdToUpdate] = useState();
    const [orderToUpdate, setOrderToUpdate] = useState({});
    const storeId = localStorage.getItem("storeId")

    useEffect(() => {
        axios.get('http://localhost:63623/orders')
            .then(response => {
                setOrders(response.data);
            })
            .then(setFlag(true));
    }, [flag]);
    const reRender = (f) => { setFlag(false) };
    const AddHandler = () => {
        setAddModalShow(!AddmodalShow);
    }
    const UpdateHandler = (id) => {
        setOrderIdToUpdate(id);
        setUpdateModalShow(!UpdatemodalShow)
    }
    const UpdateStatusHandler = (id, order) => {
        setOrderIdToUpdate(id);
        setOrderToUpdate(order);
        setUpdateStatusModalShow(!UpdateStatusmodalShow)
    }
    return (
        <div className="order-container">
            <h2 className="mt-4">Orders Information</h2>
            <p>Here You can edit available orders and add new orders for store {localStorage.getItem("storeId")}</p>
            <div className="scroll-me">
                <table className="table table-striped order-table mt-5">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Customer Id</th>
                            <th>Product Id</th>
                            <th>Store Id</th>
                            <th>Contact</th>
                            <th>Quantity</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Order Placed DateTime</th>
                            <th>Edit Status</th>
                            <th>Edit whole order</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) =>
                                order.storeId === storeId ? <EmployeeDisplayOrders order={order}
                                    UpdateHandler={UpdateHandler}
                                    UpdateStatusHandler={UpdateStatusHandler}
                                    rerender={reRender}
                                    key={index} />
                                    : null
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Link to='/employee/orders' className='btn btn-primary mr-5 mt-5 mb-5'
                onClick={AddHandler.bind(this)}>Add Order</Link>
            <AddOrdersModal show={AddmodalShow} onHide={() => setAddModalShow(false)}
                rerender={reRender} />
            <UpdateOrdersModal show={UpdatemodalShow} onHide={() => setUpdateModalShow(false)}
                orderId={orderIdToUpdate} reRender={reRender} />
            <UpdateOrderStatusModal show={UpdateStatusmodalShow} onHide={() => setUpdateStatusModalShow(false)}
                orderId={orderIdToUpdate} order={orderToUpdate} reRender={reRender} />
        </div>
    )
}
