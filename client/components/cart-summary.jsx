import React from 'react';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productToDelete: null
    };
    this.changeQty = this.changeQty.bind(this);
    this.setView = this.setView.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  changeQty(e) {
    if (e.target.value === '') return;
    if (e.target.value < 1 & e.target.value !== '') {
      e.target.value = 1;
    } else if (e.target.value % 1 !== 0) {
      e.target.value = Math.floor(e.target.value);
    } else {
      this.props.changeQtyCallback(e.target.getAttribute('product-id'), e.target.value);
    }
  }

  checkQty(e) {
    if (Number.isNaN(parseInt(e.target.value, 10))) {
      e.target.value = e.target.getAttribute('last-quantity');
    }
  }

  saveQty(e) {
    e.target.setAttribute('last-quantity', e.target.value);
  }

  removeFromCart(e) {
    const cancel = e.target.getAttribute('cancel');
    if (e.target.getAttribute('product-id')) {
      this.setState({
        productToDelete: parseInt(e.target.getAttribute('product-id'), 10)
      });
    } else if (cancel) {
      this.setState({ productToDelete: null });
      document.getElementsByTagName('body')[0].classList.remove('disable-scroll');
    } else {
      this.props.removeFromCartCallback(this.state.productToDelete);
      document.getElementsByTagName('body')[0].classList.remove('disable-scroll');
    }
  }

  setView(e) {
    if (e.target.id === 'checkout-btn') {
      this.props.setViewCallback('checkout', {});
    } else if (e.target.id === 'back-to-catalog') {
      this.props.setViewCallback('catalog', {});
    } else {
      this.props.setViewCallback('details', { productId: e.currentTarget.id });
    }
  }

  render() {
    let cartTotal = 0;
    let imageOfItemToDelete;
    let nameOfItemToDelete;
    let quantityofItemToDelete;
    const cartComponents = this.props.cartItems.map((item, index) => {
      cartTotal += item.price * item.quantity;
      if (this.state.productToDelete === item.productId) {
        imageOfItemToDelete = item.image;
        nameOfItemToDelete = item.name;
        quantityofItemToDelete = item.quantity;
      }
      return (
        <CartSummaryItem
          key={index}
          productId={item.productId}
          name={item.name}
          price={item.price}
          image={item.image}
          shortDescription={item.shortDescription}
          quantity={item.quantity}
          setViewCallback={this.setView}
          removeFromCart={this.removeFromCart}
          changeQty={this.changeQty}
          checkQty={this.checkQty}
          saveQty={this.saveQty} />
      );
    });
    const removingModal =
      <RemovingModal
        removeFromCart={this.removeFromCart}
        image={imageOfItemToDelete}
        name={nameOfItemToDelete}
        quantity={quantityofItemToDelete} />;

    cartTotal = (cartTotal / 100).toFixed(2);
    const formattedPrice = '$' + cartTotal;

    return (
      <>
        { this.state.productToDelete ? removingModal : <></> }
        <section id='cart-summary-content' className='flex flex-column col-md-10 col-lg-8 col-11 mx-auto'>
          <div
            id='back-to-catalog'
            onClick={this.setView}
            className='text-muted mb-2'>
            &lt; Back to catalog
          </div>
          <h2 className='my-4'>My Cart</h2>
          <div id='cart-items' className='row row-cols-1 mb-3'>
            {cartComponents}
          </div>
          <div id='cart-footer' className='d-flex flex-row justify-content-between align-items-center mb-4'>
            <div id='cart-total'>
              <strong>Item Total: {formattedPrice}</strong>
            </div>
            <button
              id='checkout-btn'
              type='button'
              className='btn btn-primary btn-sm p-1 fit-content'
              onClick={this.setView}
              disabled={!cartComponents.length}>
              Checkout
            </button>
          </div>
        </section>
      </>
    );
  }
}

function CartSummaryItem(props) {
  const price = props.price.toString();
  const formattedPrice = `$
    ${price.slice(0, price.length - 2)}.${price.slice(price.length - 2)}`;

  return (
    <div className='card col-12 d-flex flex-row mb-3'>
      <div onClick={props.setViewCallback} id={props.productId} className='summary-img card-img-container col-4 d-flex justify-content-center'>
        <img src={props.image} className='h-100 flex-grow-1 img-fluid item-img' alt={props.name} />
      </div>
      <div className='card-body card-body-unpad'>
        <h5 className='card-title title-text'>{props.name}</h5>
        <p className='card-text card-text-small text-muted'>{formattedPrice}</p>
        <p className='card-text'>{props.shortDescription}</p>
        <label htmlFor='quantity' className='mr-2'>Quantity: </label>
        <input
          onChange={props.changeQty}
          onBlur={props.checkQty}
          onFocus={props.saveQty}
          type='number'
          className='quantity mr-3'
          product-id={props.productId}
          name='quantity'
          last-quantity={null}
          defaultValue={props.quantity}
          size='5' />

        <i product-id={props.productId} onClick={props.removeFromCart} className="fas fa-trash-alt text-danger trashcan"></i>
      </div>
    </div>
  );
}

function RemovingModal(props) {
  document.getElementsByTagName('body')[0].classList.add('disable-scroll');

  return (
    <section id='modal-wrapper'>
      <div id='modal' className='mx-auto col-md-10 col-lg-5 col-xl-4 col-11 p-4'>
        <section className='d-flex flex-column align-items-center justify-content-around mx-0'>
          <h2 className='text-primary mb-4 text-center'>Are you sure you want to delete:</h2>
          <h5 className='text-info mb-4'>{props.name} x {props.quantity} ?</h5>
          <div id='detail-img-wrapper' className='d-flex justify-content-center col-8 mb-3'>
            <img src={props.image} className='img-fluid'></img>
          </div>
          <section className='d-flex align-items-center justify-content-around btn-column w-100'>
            <button type='button' onClick={props.removeFromCart} className='btn btn-danger mb-2 btn-slim'>Delete</button>
            <button type='button' cancel='true' onClick={props.removeFromCart} className='btn btn-secondary mb-2 btn-slim'>Cancel</button>
          </section>
        </section>
      </div>
    </section>
  );
}
