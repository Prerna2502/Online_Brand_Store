import React, { Component } from 'react';
import axios from 'axios';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Row, Col } from "react-bootstrap";
import FormControl from 'react-bootstrap/FormControl';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './Header.css';
import CartSection from "./CartSection";
import Sidebar from "./Sidebar";
import { compose } from '@reduxjs/toolkit';
import { AddCartItemAction,EmptyCartAction } from "../../States/Actions/ActionCart";
import { connect } from "react-redux";
import { SetCustomerLogedInAction } from "../../States/Actions/ActionCustomerLogedIn";

class NavbarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CustomerName: localStorage.getItem("customerName"),
      SearchedValue: "",
      Searchedproducts: [],
      categorySelected: "productname",
      reRenderSwitch: "true"
    }
  }
  componentDidMount() {
    let url = 'http://localhost:63623/cart/' + this.props.customerId;
    if (localStorage.getItem("token") != null && localStorage.getItem("tokenType") === "customer") {
      this.props.SetCustomerLogedInAction(true);
    }
    if (!this.props.customerLogedIn) {
      return;
    }
    axios.get(url)
      .then(response => {
        let tempCartitems = response.data;
        this.props.EmptyCartAction([]);
        tempCartitems.forEach(tempCart => {
          this.getProductDetails(tempCart.productId, tempCart.customerId, tempCart.quantity);
        });
      })
      .catch();
  }
  getProductDetails = (productId, customerId, itemQuantity) => {
    let url = 'http://localhost:63623/Product/productid/' + productId;
    axios.get(url)
      .then(response => {
        let tempProduct = response.data;
        let tempCartItem = {
          productId: productId,
          productName: tempProduct.productName,
          quantity: itemQuantity,
          productPrice: tempProduct.productPrice,
          productImage: tempProduct.productImage,
        }
        this.props.AddCartItemAction(tempCartItem);
      })
      .catch();
  }

  searchProducts = (e) => {
    let searchedValue = this.state.SearchedValue.split(" ")[0];
    let url = 'http://localhost:63623/Product/' + this.state.categorySelected + '/' + searchedValue;
    if (this.state.SearchedValue == "") {
      url = 'http://localhost:63623/Product';
    }
    axios.get(url)
      .then(response => {
        this.setState({ Searchedproducts: response.data });
        let to = {
          pathname: '/SearchProduct',
          Searchedproducts: this.state.Searchedproducts
        }
        this.props.history.push(to);
      })
      .catch(error => {
        alert("Check your internet connectivity");
      });
  }

  render() {
    return (
      <section className="navbar_main">
        <div className="navbar_main_1">
          <div className="">
            <Sidebar customerLogedIn={this.props.customerLogedIn} CustomerId={this.state.CustomerId} setCustomerLogedIn={this.props.setCustomerLogedIn} />
          </div>
          <div className="d-flex">
            <button className="navbar-toggler align-items-center"
              type="button" data-toggle="collapse" data-target="#sidebarToggle" aria-controls="sidebarToggle" aria-expanded="true" aria-label="Toggle sidebar">
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <Link className="navbar-brand" style={{ color: "#121212" }} to="/">Jean Station</Link>
        </div>
        <div className="navbar_main_2">
          <Form inline onSubmit={e => { e.preventDefault(); this.searchProducts(); }}>
            <FormControl type="text" placeholder="Search"
              className="mr-sm-2" value={this.state.SearchedValue} onChange={e => this.setState({ SearchedValue: e.target.value })} />
            <Form.Control as="select" className="col-5 col-md-3 mr-1" onChange={e => this.setState({ categorySelected: e.target.value })}>
              <option value="productname">Product</option>
              <option value="category">Category</option>
              <option value="tag">All</option>
            </Form.Control>
            <Button variant="outline-success" onClick={this.searchProducts} >
              <i className="fa fa-search" aria-hidden="true"></i>
            </Button>
          </Form>
        </div>
        <div className="navbar_main_3">
          <div className="d-flex flex-row">
            {(this.props.customerLogedIn) ?
              <Link to="/customerAccount" className="">Hi {this.props.customerName}</Link>
              :
              <Link to="/customer/login" className="btn btn-primary">Login</Link>
            }
            {this.props.customerLogedIn ?
              <div>
                <div className="cart-button d-flex flex-column" data-toggle="collapse" data-target="#cartCollapse" aria-expanded="true" aria-controls="cartcollapse" >
                  <span className="quantity">{this.props.CartItems.length}</span>
                  <i className="fas fa-shopping-cart cart-icon_nav"></i>
                </div>
              </div>
              :
              <div></div>
            }
          </div>
          {this.props.customerLogedIn ?
            <div className="collapse cart-absolute" id="cartCollapse">
              <div className="card card-body">
                <span>My Cart-</span>
                <CartSection CartItems />
              </div>
            </div>
            :
            <div></div>
          }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { CartItems: state.cartItem, customerLogedInRedux: state.customerLogedIn }
}
const mapDispatchToProps = { AddCartItemAction: AddCartItemAction, SetCustomerLogedInAction: SetCustomerLogedInAction, EmptyCartAction: EmptyCartAction }

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NavbarMain)
