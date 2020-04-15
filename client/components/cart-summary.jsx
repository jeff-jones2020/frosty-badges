import React from 'react';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);

    this.setView = this.setView.bind(this);
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
    const cartComponents = this.props.cartItems.map((item, index) => {
      cartTotal += item.price;
      return (
        <CartSummaryItem
          key={index}
          productId={item.productId}
          name={item.name}
          price={item.price}
          image={item.image}
          shortDescription={item.shortDescription}
          quantity={item.quantity}
          setViewCallback={this.setView}/>
      );
    });

    cartTotal = (cartTotal / 100).toFixed(2);
    const formattedPrice = '$' + cartTotal;

    return (
      <section id='cart-summary-content' className='flex flex-column col-11 mx-auto'>
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
        <label htmlFor='quantity' className='mr-2'>Quantity (between 1 and 100):</label>
        <input type='number' id='quantity' name='quantity' min='1' max='100' value={props.quantity}/>
      </div>
    </div>
  );
}
