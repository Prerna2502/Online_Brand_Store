import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminDiscounts.css'
import AdminDisplayDiscounts from './AdminDisplayDiscounts/AdminDisplayDiscounts';
import AddDiscountModal from './AddDiscountModal/AddDiscountModal';
import UpdateDiscountModal from './UpdateDiscountModal/UpdateDiscountModal';

export default function AdminDiscounts() {
    const [flag, setFlag] = useState(true);
    const [Discounts, setDiscounts] = useState([]);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [UpdatemodalShow, setUpdateModalShow] = useState(false);
    const [discountToUpdate, setDiscountToUpdate] = useState();
    useEffect(() => {
        axios.get('http://localhost:63623/discount')
            .then(response => {
                setDiscounts(response.data);
            })
            .then(setFlag(true));
    }, [flag]);
    const reRender = (f) => { setFlag(false) };
    const AddHandler = () => {
        setAddModalShow(!AddmodalShow);
    }
    const UpdateHandler = (id) => {
        axios.get(`http://localhost:63623/discount/applydiscount/${id}`)
            .then((response) => {
                setDiscountToUpdate({
                    "minimumOrderAmount": response.data.minimumOrderAmount
                    , "minimumPastOrder": response.data.minimumPastOrder
                    , "discountPercent": response.data.discountPercent
                })
            })
            .then(setUpdateModalShow(!UpdatemodalShow));
    }
    return (
        <div className="discount-container">
            <h2 className="mt-4">Discount Information</h2>
            <p>Here You can edit available discounts</p>
            <div className="scroll-me">
                <table className="table table-striped discount-table mt-5">
                    <thead>
                        <tr>
                            <th>Minimum Order Amount</th>
                            <th>Minimum Past Order</th>
                            <th>Discount Percentage</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Discounts.map((discount, index) =>
                                <AdminDisplayDiscounts discount={discount}
                                    UpdateHandler={UpdateHandler}
                                    rerender={reRender}
                                    key={index} />
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Link to='/admin/discount' className='btn btn-primary mr-5 mt-5 mb-5'
                onClick={AddHandler.bind(this)}>Add Discount</Link>
            <AddDiscountModal show={AddmodalShow} onHide={() => setAddModalShow(false)}
                rerender={reRender} />
            <UpdateDiscountModal show={UpdatemodalShow} onHide={() => setUpdateModalShow(false)}
                discount={discountToUpdate} reRender={reRender} />
        </div>
    )
}