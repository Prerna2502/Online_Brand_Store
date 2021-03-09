import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar_Main from "./Components/Header/NavBar";
import { BrowserRouter, Redirect, Route, Router, Switch } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import ProductDisplay from './Components/CustomerComponents/ProductDisplay/ProductDisplay';
import SearchProduct from './Components/CustomerComponents/SearchProduct/SearchProduct';
import Cart from './Components/CustomerComponents/Cart/Cart';
import Login from "./Components/CustomerComponents/Login/Login";
import Home from "./Components/CustomerComponents/HomePage/Home";
import CustomerService from "./Components/CustomerComponents/CustomerService/CustomerService";
import CustomerAccount from "./Components/CustomerComponents/CustomerAccount/CustomerAccount";
import OrderStatus from "./Components/CustomerComponents/OrderStatus/OrderStatus";
import { useDispatch } from "react-redux";
import { SetCustomerLogedInAction } from "./States/Actions/ActionCustomerLogedIn";
import Register from './Components/CustomerComponents/Register/Register';

import AdminHome from "./Components/AdminComponents/AdminHome/AdminHome";
import AdminHeader from "./Components/AdminComponents/AdminHeader/AdminHeader";
import AdminEmployees from "./Components/AdminComponents/AdminEmployees/AdminEmployees";
import AdminDiscounts from "./Components/AdminComponents/AdminDiscounts/AdminDiscounts";
import AdminCustomers from "./Components/AdminComponents/AdminCustomer/AdminCustomers";
import AdminProducts from "./Components/AdminComponents/AdminProducts/AdminProducts";
import AdminLogin from "./Components/AdminComponents/AdminLogin/AdminLogin";
import AdminFooter from "./Components/AdminComponents/AdminFooter/AdminFooter";
import AdminStocks from './Components/AdminComponents/AdminStocks/AdminStocks';
import AdminOrders from './Components/AdminComponents/AdminOrders/AdminOrders';
import AdminStore from './Components/AdminComponents/AdminStore/AdminStore';

import EmployeeHeader from './Components/EmployeeComponents/EmployeeHeader/EmployeeHeader';
import EmployeeHome from './Components/EmployeeComponents/EmployeeHome/EmployeeHome';
import EmployeeLogin from './Components/EmployeeComponents/EmployeeLogin/EmployeeLogin';
import EmployeeFooter from './Components/EmployeeComponents/EmployeeFooter/EmployeeFooter'
import EmployeeOrders from './Components/EmployeeComponents/EmployeeOrders/EmployeeOrders';
import EmployeeStocks from './Components/EmployeeComponents/EmployeeStocks/EmployeeStocks';
function PrivateRouteAdmin({ exact, path, component: Component, authenticated }) {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        authenticated === true ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect
            to={{ pathname: '/admin' }}
          />
        )
      }
    />
  );
}
function PrivateRouteEmployee({ exact, path, component: Component, authenticated }) {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        authenticated === true ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect
            to={{ pathname: '/employee'}}
          />
        )
      }
    />
  );
}

function App() {
  const [flag, setFlag] = useState(false);
  const [customerLogedIn, setCustomerLogedIn] = useState(false);
  const [adminLogedIn, setAdminLogedIn] = useState(false);
  const [employeeLogedIn, setEmployeeLogedIn] = useState(false);
  const dispatch = useDispatch();
  const [customerId, setCustomerId] = useState(localStorage.getItem("customerId"));
  const [customerName, setCustomerName] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("token") != null && localStorage.getItem("tokenType") === "admin") {
      setAdminLogedIn(true);
    }
    if (localStorage.getItem("token") != null && localStorage.getItem("tokenType") === "employee") {
      setEmployeeLogedIn(true);
    }
    if (localStorage.getItem("token") != null && localStorage.getItem("tokenType") === "customer") {
      setCustomerLogedIn(true);
      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("tokenType"));
      console.log(localStorage.getItem("customerId"));
      console.log(localStorage.getItem("customerName"));
      dispatch(SetCustomerLogedInAction(true)); // do not remove vary important 
      setCustomerId(localStorage.getItem("customerId"));
      setCustomerName(localStorage.getItem("customerName"));
    }
  }, [flag])
  function ReturnCustomerNavBar() {
    return (
      <NavBar_Main customerLogedIn={customerLogedIn} setCustomerLogedIn={setCustomerLogedIn} customerName={customerName} customerId={customerId} />
    )
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={({ match: { url } }) => {
            return <>
              <AdminHeader title='JeanStation' flag={adminLogedIn} setFlag={setAdminLogedIn} />
              <Route exact path={`${url}`} component={() => <AdminHome flag={adminLogedIn} />} />
              <PrivateRouteAdmin exact path={`${url}/employees`} component={AdminEmployees} authenticated={adminLogedIn} />
              <PrivateRouteAdmin exact path={`${url}/discounts`} component={AdminDiscounts} authenticated={adminLogedIn} />
              {/* <PrivateRouteAdmin exact path={`${url}/customers`} component={AdminCustomers} authenticated={adminLogedIn} /> */}
              <PrivateRouteAdmin exact path={`${url}/products`} component={AdminProducts} authenticated={adminLogedIn} />
              <PrivateRouteAdmin exact path={`${url}/orders`} component={AdminOrders} authenticated={adminLogedIn} />
              <PrivateRouteAdmin exact path={`${url}/discount`} component={AdminDiscounts} authenticated={adminLogedIn} />
              <PrivateRouteAdmin exact path={`${url}/stock`} component={AdminStocks} authenticated={adminLogedIn} />
              <PrivateRouteAdmin exact path={`${url}/store`} component={AdminStore} authenticated={adminLogedIn} />
              {
                adminLogedIn ? <Redirect exact path={`${url}/log_in`} to='/admin' />
                  : <Route exact path={`${url}/log_in`} component={() => <AdminLogin flag={flag} setFlag={setFlag} />} />
              }
              <AdminFooter footerText='All rights reserved' />
            </>
          }} />

          <Route path="/employee" render={({ match: { url } }) => {
            return <>
              <EmployeeHeader title='JeanStation' flag={employeeLogedIn} setFlag={setEmployeeLogedIn} />
              <Route exact path={`${url}`} component={() => <EmployeeHome flag={employeeLogedIn} />} />
              <PrivateRouteEmployee exact path={`${url}/orders`} component={EmployeeOrders} authenticated={employeeLogedIn} />
              <PrivateRouteEmployee exact path={`${url}/stock`} component={EmployeeStocks} authenticated={employeeLogedIn} />
              {
                employeeLogedIn ? <Redirect exact path={`${url}/log_in`} to='/employee' />
                  : <Route exact path={`${url}/log_in`} component={() => <EmployeeLogin flag={flag} setFlag={setFlag} />} />
              }
              <EmployeeFooter footerText='All rights reserved' />
            </>
          }} />

          <Route exact path="/" component={() => {
            return <>
              <ReturnCustomerNavBar />
              <Home />
              <Footer />
            </>
          }} />
          <Route exact path="/product" component={(props) => {
            return <>
              <ReturnCustomerNavBar />
              <ProductDisplay location={props.location} />
              <Footer />
            </>
          }} />
          <Route exact path="/SearchProduct" component={(props) => {
            return <>
              <ReturnCustomerNavBar />
              <SearchProduct products={props.location} />
              <Footer />
            </>
          }} />
          <Route exact path="/customerService" component={() => {
            return <>
              <ReturnCustomerNavBar />
              <CustomerService />
              <Footer />
            </>
          }} />
          <Route exact path="/customerOrders" component={() => {
            if (customerLogedIn)
              return <>
                <ReturnCustomerNavBar />
                <OrderStatus />
                <Footer />
              </>
            else return <ErrorPage />
          }} />
          <Route exact path="/customerAccount" component={() => {
            if (customerLogedIn)
              return <>
                <ReturnCustomerNavBar />
                <CustomerAccount AppRenderFlag={flag} customerId={customerId} />
                <Footer />
              </>
            else return <ErrorPage />
          }} />
          <Route exact path="/customer/cart" component={() => {
            console.log("customer logged in for cart? " + customerLogedIn);
            if (customerLogedIn) return <>
              <ReturnCustomerNavBar />
              <Cart />
              <Footer />
            </>
            else return <ErrorPage />;
          }} />
          <Route exact path="/customer/login" component={() => {
            if (!customerLogedIn)
              return <>
                <ReturnCustomerNavBar />
                <Login flag={flag} setFlag={setFlag} />
                <Footer />
              </>
            else return <Redirect to="/" />
          }} />
          <Route exact path="/customer/register" component={() => {
            if (!customerLogedIn)
              return <>
                <ReturnCustomerNavBar />
                <Register flag={flag} setFlag={setFlag} />
                <Footer />
              </>
            else return <Redirect to="/" />
          }} />
          <Route path="/" component={ErrorPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;

const ErrorPage = () => {
  return <div className="d-flex flex-column container">
    <img className="img-fluid m-5"src="https://m.media-amazon.com/images/I/517U4FNV1DL._AC_SL1000_.jpg" style={{maxWidth:"80vw",maxHeight:"80vh"}} alt="No error image"></img>
    </div>
}