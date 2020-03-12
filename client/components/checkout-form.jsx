import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {
        name: '',
        creditCard: '',
        shippingAddress: ''
      }
    }

    this.placeOrder = this.placeOrder.bind(this);
    this.updateStateText = this.updateStateText.bind(this);
  }

  updateStateText(e) {
    this.setState({
      inputs: {
        [e.target.id] : e.target.value
      }
    });
  }

  placeOrder(e) {
    e.preventDefault();
    this.props.placeOrderCallback(this.state.inputs)
    this.setView();
  }

  setView() {
    this.props.setViewCallback('catalog', {});
  }

  render() {
    return(
      <h1 className='my-4'>My Cart</h1>
      <h5 className='mb-4'>Order Total: {this.props.orderTotal}</h5>
      <form className='mb-5'>
        <div className='form-group'>
          <label for='name'>Name</label>
          <input type='text'
            name='name'
            value={this.state.name}
            onChange={this.updateStateText}
            className='form-control'
            id='name'>
        </div>
        <div className='form-group'>
          <label for='credit-card'>Credit Card</label>
            <input
              type='text'
              name='credit-card'
              value={this.state.creditCard}
              onChange={this.updateStateText}
              className='form-control'
              id='creditCard'>
        </div>
        <div className='form-group'>
          <label for='shipping-address'>Shipping Address</label>
              <input
                type='text'
                name='shipping-address'
                value={this.state.shippingAddress}
                onChange={this.updateStateText}
                className='form-control'
                id='shippingAddress'>
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
        type='submit'
        className='btn btn-primary btn-sm fit-content'
        onClick={this.placeOrder} >
        Add to Cart
      </button>
    );
  }
}
