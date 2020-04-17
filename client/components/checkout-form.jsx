import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameShort: true,
      creditCard: '',
      creditCardShort: true,
      shippingAddress: '',
      shippingAddressShort: true,
      orderDisabled: true
    };

    this.placeOrder = this.placeOrder.bind(this);
    this.updateStateText = this.updateStateText.bind(this);
    this.setView = this.setView.bind(this);
    this.validateAndCorrect = this.validateAndCorrect.bind(this);
  }

  updateStateText(e) {
    if (!this.validateAndCorrect(e.target)) return;
    const { name, creditCard, shippingAddress, nameShort, creditCardShort, shippingAddressShort } = this.state;
    const newInputs = { name, creditCard, shippingAddress };
    newInputs[e.target.id] = e.target.value;

    const disable = nameShort || creditCardShort || shippingAddressShort;
    this.setState({
      name: newInputs.name,
      creditCard: newInputs.creditCard,
      shippingAddress: newInputs.shippingAddress,
      orderDisabled: disable
    });

  }

  validateAndCorrect(inputEl) {
    let isValid = true;
    if (inputEl.id === 'name') {
      let name = inputEl.value.trim();
      let nameShort = false;
      if (name.length < 5) {
        nameShort = !nameShort;
        isValid = false;
      } else if (name.length >= 65) {
        name = name.slice(0, name.length - 1);
        isValid = false;
      }
      this.setState({ name, nameShort });
      return isValid;
    } else if (inputEl.id === 'creditCard') {
      let creditCard = inputEl.value.trim().replace(/[-]/g, '');
      let creditCardShort = false;
      if (!creditCard.length) {
        isValid = false;
      } else if (creditCard.length > 16 || !creditCard[creditCard.length - 1].match(/[0-9]/)) {
        creditCard = creditCard.slice(0, creditCard.length - 1);
        isValid = false;
      } else if (creditCard.length < 16) {
        creditCardShort = !creditCardShort;
        isValid = false;
      }
      const newLength = creditCard.length + Math.floor(creditCard.length / 4 - 1);
      for (let i = 4; i < newLength; i += 4) {
        creditCard = creditCard.slice(0, i) + '-' + creditCard.slice(i, creditCard.length);
        i++;
      }
      this.setState({ creditCard, creditCardShort });
      return isValid;
    } else if (inputEl.id === 'shippingAddress') {
      let shippingAddress = inputEl.value;
      let shippingAddressShort = false;
      if (shippingAddress.length < 21) {
        shippingAddressShort = !shippingAddressShort;
        isValid = false;
      } else if (shippingAddress.length > 156) {
        shippingAddress = shippingAddress.slice(0, shippingAddress.length - 1);
        isValid = false;
      }
      this.setState({ shippingAddress, shippingAddressShort });
      return isValid;
    }
  }

  placeOrder(e) {
    e.preventDefault();
    const { name, creditCard, shippingAddress } = this.state;
    this.props.placeOrderCallback({ name, creditCard, shippingAddress });
    this.setView();
  }

  setView() {
    this.props.setViewCallback('catalog', {});
  }

  render() {
    let totalPrice = this.props.cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0);

    totalPrice = (totalPrice / 100).toFixed(2); // convert to dollar amount
    const priceFormatted = '$' + totalPrice;

    return (
      <section id='checkout-form' className='d-flex flex-column col-md-8 col-lg-6 col-xl-4 col-12 mx-auto'>
        <h1 className='my-4'>Checkout</h1>
        <p className='text-muted mb-4'>
          <strong>Order Total: {priceFormatted}</strong>
        </p>
        <h3 className='text-danger text-center mb-4'><em>***Please do not enter personal information, this checkout form is for demo purposes only***</em></h3>
        <form className='mb-4'>
          <div className='form-group'>
            <label htmlFor='name'>Full Name</label>
            <input type='text'
              name='name'
              value={this.state.name}
              onChange={this.updateStateText}
              className='form-control'
              placeholder='John M Doe'
              id='name' />
          </div>
          <div className='form-group'>
            <label htmlFor='credit-card'>Credit Card</label>
            <input
              type='text'
              name='credit-card'
              value={this.state.creditCard}
              onChange={this.updateStateText}
              className='form-control'
              placeholder='0000-0000-0000-0000'
              id='creditCard' />
          </div>
          <div className='form-group'>
            <label htmlFor='shipping-address'>Shipping Address</label>
            <input
              type='text'
              name='shipping-address'
              value={this.state.shippingAddress}
              onChange={this.updateStateText}
              className='form-control'
              placeholder='1234 Example Street, Irvine CA 92618'
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
            onClick={this.placeOrder}
            disabled={this.state.orderDisabled}>
            Place Order
          </button>
        </div>
      </section>
    );
  }
}
