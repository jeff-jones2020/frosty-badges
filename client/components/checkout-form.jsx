import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <h1 className='my-4'>My Cart</h1>
      <h5 className='mb-4'>Order Total: {this.props.orderTotal}</h5>
      <form className='mb-5'>
        <div className='form-group'>
          <label for='formGroupExampleInput'>Name</label>
          <input type='text' className='form-control' id='formGroupExampleInput' placeholder='Example input placeholder'>
        </div>
        <div className='form-group'>
          <label for='formGroupExampleInput2'>Credit Card</label>
          <input type='text' className='form-control' id='formGroupExampleInput2' placeholder='Another input placeholder'>
        </div>
          <div className='form-group'>
          <label for='formGroupExampleInput2'>Shipping Address</label>
          <input type='text' className='form-control' id='formGroupExampleInput2' placeholder='Another input placeholder'>
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
