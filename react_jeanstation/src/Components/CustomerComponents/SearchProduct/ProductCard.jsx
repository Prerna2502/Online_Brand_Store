import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class ProductCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      product: this.props.product
    }
  }

  showLimitedHeader(title) {
    if (title != null) {
      if (title.length > 50)
        return title.substring(0, 48) + '...';
      else return title;
    }
  }
  render() {
    return (
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
        <Link to={{
          pathname: "/Product",
          product: this.props.product
        }} className="CardLink">
          <div class="cardMain card p-2  m-2">
            <div class="cardProduct card-body">
              <img className="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-12 p-0" src={this.state.product.productImage} alt="bag image" />
              <div className="CardCaption">
                <h5 class="card-title"><span className="text-dark">{this.state.product.productName}</span></h5>
                <p>$ <b className="text-success">{this.state.product.productPrice}</b></p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
