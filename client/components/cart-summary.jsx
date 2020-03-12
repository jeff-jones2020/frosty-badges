export default class CartSummary extends React.Component {
  render() {
    let cartTotal = 0;
    const cartComponents = this.props.cartItems.map(item => {
      cartTotal += item.price;
      <CartSummaryItem
        productId={item.productId}
        name={item.name}
        price={item.price}
        image={item.image}
        shortDescription={item.shortDescription} />
    })

    const formattedPrice = `$
    ${cartTotal.slice(0, cartTotal.length - 2)}.${cartTotal.slice(cartTotal.length - 2)}`;

    return(
      <section id='cart-summary-content' className='flex flex-column col-11 mx-auto'>
        <div
          id='back-to-catalog'
          onClick={this.setView}
          className='text-muted mb-2'>
          &lt; Back to catalog
        </div>
        <h2>My Cart</h2>
        <div id='cart-items'>
          {cartComponents}
        </div>
        <div id='cart-total'><strong>Item Total: {formattedPrice}</strong></div>
      </section>

    );
  }
}

function CartSummaryItem(props) {
  const price = this.props.price.toString();
  const formattedPrice = `$
    ${price.slice(0, price.length - 2)}.${price.slice(price.length - 2)}`;

  return (
    <div id={this.props.productId} onClick={this.props.setViewCallback} className='card card-unpad col-12 d-flex'>
      <div className='card-img-container'>
        <img src={this.props.image} className='h-100 flex-grow-1 item-img' alt={this.props.name} />
      </div>
      <div className='card-body card-body-unpad'>
        <h5 className='card-title title-text'>{this.props.name}</h5>
        <p className='card-text card-text-small text-muted'>{formattedPrice}</p>
        <p className='card-text'>{this.props.shortDescription}</p>
      </div>
    </div>
  );
}
