import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminStore.css'
import AdminDisplayStore from './AdminDisplayStore/AdminDisplayStore';
import AddStoreModal from './AddStoreModal/AddStoreModal';
import UpdateStoreModal from './UpdateStoreModal/UpdateStoreModal';

export default function AdminStore() {
    const [flag, setFlag] = useState(true);
    const [stores, setStores] = useState([]);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [UpdatemodalShow, setUpdateModalShow] = useState(false);
    const [storeToUpdate, setStoreToUpdate] = useState({});
    useEffect(() => {
        axios.get('http://localhost:63623/store')
            .then(response => {
                setStores(response.data);
            })
            .then(setFlag(true));
    }, [flag]);
    const reRender = (f) => { setFlag(false) };
    const AddHandler = () => {
        setAddModalShow(!AddmodalShow);
    }
    const UpdateHandler = (id) => {
        axios.get(`http://localhost:63623/store/${id}`)
            .then((response) => {
                setStoreToUpdate({
                    "storeId": response.data.storeId
                    , "location": response.data.location
                    , "manager": response.data.manager
                    , "contact": response.data.contact
                    , "address": response.data.address
                })
            })
            .then(setUpdateModalShow(!UpdatemodalShow));
    }
    return (
        <div className="store-container">
            <h2 className="mt-4">Stores Information</h2>
            <p>Here You can edit available stores</p>
            <div className="scroll-me">
                <table className="table table-striped store-table mt-5">
                    <thead>
                        <tr>
                            <th>Store Id</th>
                            <th>Location</th>
                            <th>Manager</th>
                            <th>Contact</th>
                            <th>Address</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stores.map((store, index) =>
                                <AdminDisplayStore store={store}
                                    UpdateHandler={UpdateHandler}
                                    rerender={reRender}
                                    key={index} />
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Link to='/admin/store' className='btn btn-primary mr-5 mt-5 mb-5'
                onClick={AddHandler.bind(this)}>Add Store</Link>
            <AddStoreModal show={AddmodalShow} onHide={() => setAddModalShow(false)}
                rerender={reRender} />
            <UpdateStoreModal show={UpdatemodalShow} onHide={() => setUpdateModalShow(false)}
                store={storeToUpdate} reRender={reRender} />
        </div>
    )
}
