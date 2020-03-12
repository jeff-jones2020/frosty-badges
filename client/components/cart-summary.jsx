import React from 'react';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);

    this.setView = this.setView.bind(this);
  }

  setView() {
    this.props.setViewCallback('catalog', {});
  }

  render() {
    let cartTotal = 0;
    const cartComponents = this.props.cartItems.map(item => {
      cartTotal += item.price;
      return(
      <CartSummaryItem
        key={item.productId}
        productId={item.productId}
        name={item.name}
        price={item.price}
        image={item.image}
        shortDescription={item.shortDescription} />
      );
    })

    cartTotal = cartTotal.toString();
    const formattedPrice = `
    $${cartTotal.slice(0, cartTotal.length - 2)}.${cartTotal.slice(cartTotal.length - 2)}`;

    return(
      <section id='cart-summary-content' className='flex flex-column col-11 mx-auto'>
        <div
          id='back-to-catalog'
          onClick={this.setView}
          className='text-muted mb-2'>
          &lt; Back to catalog
        </div>
        <h2>My Cart</h2>
        <div id='cart-items' className='row row-cols-1 mb-3'>
          {cartComponents}
        </div>
        <div id='cart-total' className='mb-3'><strong>Item Total: {formattedPrice}</strong></div>
      </section>

    );
  }
}

function CartSummaryItem(props) {
  const price = props.price.toString();
  const formattedPrice = `$
    ${price.slice(0, price.length - 2)}.${price.slice(price.length - 2)}`;

  return (
    <div id={props.productId} onClick={props.setViewCallback} className='card card-unpad col-12 d-flex flex-row mb-3'>
      <div className='card-img-container col-4 d-flex justify-content-center'>
        <img src={props.image} className='h-100 flex-grow-1 item-img' alt={props.name} />
      </div>
      <div className='card-body card-body-unpad'>
        <h5 className='card-title title-text'>{props.name}</h5>
        <p className='card-text card-text-small text-muted'>{formattedPrice}</p>
        <p className='card-text'>{props.shortDescription}</p>
      </div>
    </div>
  );
}
