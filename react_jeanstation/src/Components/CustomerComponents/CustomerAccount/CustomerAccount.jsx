import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import axios from 'axios'
import './CustomerAccount.css'
function CustomerAccount(props) {
    const [showModalfirst, setShowfirst] = useState(false);
    const [showModalsecond, setShowsecond] = useState(false);
    const [showModalthird, setShowthird] = useState(false);
    const [customer, setCustomer] = useState({})
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        let url = `http://localhost:63623/customer/${props.customerId}`
        axios.get(url)
            .then(Response => {
                setCustomer(Response.data)
                setFlag(false)
            })
            .catch(() => { })
    }, [flag])
    const reRender = (f) => { setFlag(f) };
    const handleClosefirst = () => setShowfirst(false);
    const handleShowfirst = () => setShowfirst(true);
    const handleClosesecond = () => setShowsecond(false);
    const handleShowsecond = () => setShowsecond(true);
    const handleClosethird = () => setShowthird(false);
    const handleShowthird = () => setShowthird(true);

    const FirstSaveHandler = () => {
        let url = `http://localhost:63623/customer/${props.customerId}`
        axios.put(url
            , {
                firstName: document.getElementById('firstName').value
                , lastName: customer.lastName
                , email: customer.email
            })
        reRender(true)
        handleClosefirst()
    }
    const SecondSaveHandler = () => {
        let url = `http://localhost:63623/customer/${props.customerId}`
        axios.put(url
            , {
                firstName: customer.firstName
                , lastName: document.getElementById('lastName').value
                , email: customer.email
            })
        reRender(true)
        handleClosesecond()
    }
    const ThirdSaveHandler = () => {
        let url = `http://localhost:63623/customer/${props.customerId}`
        axios.put(url
            , {
                firstName: customer.firstName
                , lastName: customer.lastName
                , email: document.getElementById('email').value
            })
        reRender(true)
        handleClosethird()
    }

    return (
        <div className="Main col-md-8 offset-md-2">
            <h2 class="text-center">Account Details</h2>
            <hr />
            <section className="col-md-8 offset-2">

                <div class="d-flex bd-highlight text-left">
                    <div class="p-2 flex-fill bd-highlight col-md-4">First Name</div>
                    <div class="p-2 flex-fill bd-highlight col-md-7" >{customer.firstName}</div>
                    <div class="p-2 flex-fill bd-highlight col-md-1"><button className="btn btn-secondary" onClick={handleShowfirst}>Edit</button></div>
                </div>

                <div class="d-flex bd-highlight text-left ">
                    <div class="p-2 flex-fill bd-highlight col-md-4">Last Name</div>
                    <div class="p-2 flex-fill bd-highlight col-md-7">{customer.lastName}</div>
                    <div class="p-2 flex-fill bd-highlight col-md-1"><button className="btn btn-secondary" onClick={handleShowsecond}>Edit</button></div>
                </div>
                <div class="d-flex bd-highlight text-left">
                    <div class="p-2 flex-fill bd-highlight col-md-4">Email</div>
                    <div class="p-2 flex-fill bd-highlight col-md-7">{customer.email}</div>
                    <div class="p-2 flex-fill bd-highlight col-md-1"><button className="btn btn-secondary" onClick={handleShowthird}>Edit</button></div>
                </div>
            </section>

            <Modal show={showModalfirst} onHide={handleClosefirst}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group row">
                            <label for="firstName" class="col-sm-3 col-form-label">First Name</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="firstName" placeholder="Enter First Name" />
                            </div>

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClosefirst}>
                        Close
          </button>
                    <button className="btn btn-secondary" onClick={FirstSaveHandler}>
                        Save Changes
          </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalsecond} onHide={handleClosesecond}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group row">

                            <label for="lastName" class="col-sm-3 col-form-label">Last Name</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="lastName" placeholder="Enter Last Name" />
                            </div>

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClosesecond}>
                        Close
          </button>
                    <button className="btn btn-secondary" onClick={SecondSaveHandler}>
                        Save Changes
          </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalthird} onHide={handleClosethird}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group row">
                            <label for="email" class="col-sm-3 col-form-label">Email</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="email" placeHolder="Enter Email" />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClosethird}>
                        Close
          </button>
                    <button className="btn btn-secondary" onClick={ThirdSaveHandler}>
                        Save Changes
          </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CustomerAccount;
