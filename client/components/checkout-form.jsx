import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.placeOrder = this.placeOrder.bind(this);
  }

  placeOrder() {
    this.props.placeOrderCallback(this.state)
  }

  render() {
    return(
      <h1 className='my-4'>My Cart</h1>
      <h5 className='mb-4'>Order Total: {this.props.orderTotal}</h5>
      <form className='mb-5'>
        <div className='form-group'>
          <label for='name'>Name</label>
          <input type='text' name='name' className='form-control' id='name-input'>
        </div>
        <div className='form-group'>
          <label for='credit-card'>Credit Card</label>
          <input type='text' name='credit-card' className='form-control' id='card-input'>
        </div>
        <div className='form-group'>
          <label for='shipping-address'>Shipping Address</label>
          <input type='text' name='shipping-address' className='form-control' id='shipping-input'>
        </div>
      </form>
      <div
        id='continue-shopping'
        onClick={this.setView}
        className='text-muted mb-2'>
        &lt; Continue Shopping
      </div>
      <button
        id='place-order-btn'
        type='button'
        className='btn btn-primary btn-sm fit-content'
        onClick={this.placeOrder} >
        Add to Cart
      </button>
    );
  }
}
