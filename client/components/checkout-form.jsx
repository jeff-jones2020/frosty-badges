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
    };

    this.placeOrder = this.placeOrder.bind(this);
    this.updateStateText = this.updateStateText.bind(this);
    this.setView = this.setView.bind(this);
  }

  updateStateText(e) {
    const newInputs = JSON.parse(JSON.stringify(this.state.inputs));
    newInputs[e.target.id] = e.target.value;

    this.setState({
      inputs: newInputs
    });
  }

  placeOrder(e) {
    e.preventDefault();
    this.props.placeOrderCallback(this.state.inputs);
    this.setView();
  }

  setView() {
    this.props.setViewCallback('catalog', {});
  }

  render() {
    let totalPrice = this.props.cartItems.reduce(
      (accumulator, item) => accumulator + item.price,
      0);

    totalPrice = (totalPrice / 100).toFixed(2); // convert to dollar amount
    const priceFormatted = '$' + totalPrice;

    return (
      <section id='checkout-form' className='d-flex flex-column col-11 mx-auto'>
        <h1 className='my-4'>My Cart</h1>
        <p className='text-muted mb-4'>
          <strong>Order Total: {priceFormatted}</strong>
        </p>
        <form className='mb-4'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text'
              name='name'
              value={this.state.inputs.name}
              onChange={this.updateStateText}
              className='form-control'
              id='name' />
          </div>
          <div className='form-group'>
            <label htmlFor='credit-card'>Credit Card</label>
            <input
              type='text'
              name='credit-card'
              value={this.state.inputs.creditCard}
              onChange={this.updateStateText}
              className='form-control'
              id='creditCard' />
          </div>
          <div className='form-group'>
            <label htmlFor='shipping-address'>Shipping Address</label>
            <input
              type='text'
              name='shipping-address'
              value={this.state.inputs.shippingAddress}
              onChange={this.updateStateText}
              className='form-control'
              id='shippingAddress' />
          </div>
        </form>
        <div id='checkout-footer' className='d-flex flex-row justify-content-between mb-4'>
          <div
            id='continue-shopping'
            onClick={this.setView}
            className='text-muted'>
            &lt; Continue Shopping
          </div>
          <button
            id='place-order-btn'
            type='submit'
            className='btn btn-primary btn-sm fit-content'
            onClick={this.placeOrder} >
            Place Order
          </button>
        </div>
      </section>
    );
  }
}