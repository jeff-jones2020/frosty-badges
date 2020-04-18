import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameShort: true,
      nameMsgVisible: false,
      creditCard: '',
      creditCardShort: true,
      cardMsgVisible: false,
      shippingAddress: '',
      shippingAddressShort: true,
      addressMsgVisible: false,
      orderDisabled: true,
      displaySuccessModal: false
    };

    this.nameMissingMsg = 'Full Name is required.';
    this.nameShortMsg = 'Full Name must be at least 5 characters long.';
    this.cardMissingMsg = 'Credit Card number is required.';
    this.cardShortMsg = 'Please enter a valid credit card number.';
    this.addressMissingMsg = 'Shipping address is required.';
    this.addressShortMsg = 'Address must be at least 21 characters long.';

    this.updateStateText = this.updateStateText.bind(this);
    this.revealMessage = this.revealMessage.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.setView = this.setView.bind(this);
  }

  updateStateText(e) {
    const { nameShort, creditCardShort, shippingAddressShort } = this.state;
    const inputEl = e.target;
    let orderDisabled;
    if (inputEl.id === 'name') {
      let name = inputEl.value;
      const trimmedName = inputEl.value.trim();
      let nameShort = false;
      if (trimmedName.length < 5) {
        nameShort = true;
      } else if (trimmedName.length >= 65) {
        name = name.slice(0, name.length - 1);
      }
      orderDisabled = nameShort || creditCardShort || shippingAddressShort;
      this.setState({ name, nameShort, orderDisabled, nameMsgVisible: false });
    } else if (inputEl.id === 'creditCard') {
      let creditCard = inputEl.value.trim().replace(/[-]/g, '');
      let creditCardShort = false;
      if (!creditCard.length) {
        creditCardShort = true;
      } else if (creditCard.length > 16 || !creditCard[creditCard.length - 1].match(/[0-9]/)) {
        creditCard = creditCard.slice(0, creditCard.length - 1);
      } else if (creditCard.length < 16) {
        creditCardShort = true;
      }
      const newLength = creditCard.length + Math.floor(creditCard.length / 4 - 1);
      for (let i = 4; i < newLength; i += 4) {
        creditCard = creditCard.slice(0, i) + '-' + creditCard.slice(i, creditCard.length);
        i++;
      }
      orderDisabled = nameShort || creditCardShort || shippingAddressShort;
      this.setState({ creditCard, creditCardShort, orderDisabled, cardMsgVisible: false });
    } else if (inputEl.id === 'shippingAddress') {
      let shippingAddress = inputEl.value;
      const trimmedAddress = inputEl.value.trim();
      let shippingAddressShort = false;
      if (trimmedAddress.length < 21) {
        shippingAddressShort = true;
      } else if (trimmedAddress.length > 156) {
        shippingAddress = shippingAddress.slice(0, shippingAddress.length - 1);
      }
      orderDisabled = nameShort || creditCardShort || shippingAddressShort;
      this.setState({ shippingAddress, shippingAddressShort, orderDisabled, addressMsgVisible: false });
    }
  }

  revealMessage(e) {
    const visibilityPropName = e.target.getAttribute('data-vis');
    this.setState({
      [visibilityPropName.toString()]: true
    });
  }

  async placeOrder(e) {
    e.preventDefault();
    if (this.state.orderDisabled) {
      this.setState({
        nameMsgVisible: true,
        cardMsgVisible: true,
        addressMsgVisible: true
      });
      return;
    }
    const { name, creditCard, shippingAddress } = this.state;
    const orderSuccess = await this.props.placeOrderCallback({ name, creditCard, shippingAddress });
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

    const errMessages = [null, null, null];
    if (this.state.orderDisabled) {
      if (this.state.nameShort) {
        errMessages[0] = this.state.name.length ? this.nameShortMsg : this.nameMissingMsg;
      }
      if (this.state.creditCardShort) {
        errMessages[1] = this.state.creditCard.length ? this.cardShortMsg : this.cardMissingMsg;
      }
      if (this.state.shippingAddressShort) {
        errMessages[2] = this.state.shippingAddress.length ? this.addressShortMsg : this.addressMissingMsg;
      }
    }

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
            <input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.updateStateText}
              onBlur={this.revealMessage}
              className='form-control'
              placeholder='John M Doe'
              data-vis='nameMsgVisible'
              id='name' />
            <div
              className={`validation-err text-danger ${this.state.nameMsgVisible ? '' : 'invisible'}`}>
              {errMessages[0]}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='credit-card'>Credit Card</label>
            <input
              type='text'
              name='credit-card'
              value={this.state.creditCard}
              onChange={this.updateStateText}
              onBlur={this.revealMessage}
              className='form-control'
              placeholder='0000-0000-0000-0000'
              data-vis='cardMsgVisible'
              id='creditCard' />
            <div className={`validation-err text-danger ${this.state.cardMsgVisible ? '' : 'invisible'}`}>
              {errMessages[1]}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='shipping-address'>Shipping Address</label>
            <textarea
              rows='5'
              name='shipping-address'
              value={this.state.shippingAddress}
              onChange={this.updateStateText}
              onBlur={this.revealMessage}
              className='form-control'
              placeholder='1234 Example Street&#10;Irvine, CA 92618'
              data-vis='addressMsgVisible'
              id='shippingAddress' />
            <div className={`validation-err text-danger ${this.state.addressMsgVisible ? '' : 'invisible'}`}>
              {errMessages[2]}
            </div>
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
            className={`btn btn-primary btn-sm fit-content ${this.state.orderDisabled ? 'disabled' : ''}`}
            onClick={this.placeOrder} >
            Place Order
          </button>
        </div>
      </section>
    );
  }
}
