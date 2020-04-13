import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      itemAdded: false,
      quantity: 0
    };

    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(e) {
    const view = e.currentTarget.getAttribute('view');
    this.props.toggleWarning();
    this.props.setViewCallback(view, {});
  }

  addToCart() {
    this.props.addToCartCallback(this.state.product);
    this.setState({
      itemAdded: true,
      quantity: this.state.quantity + 1
    });
  }

  componentDidMount() {
    fetch('/api/products/' + this.props.viewParams.productId)
      .then(response => response.json())
      .then(data => {
        this.setState({
          product: data
        });
      });
  }

  render() {
    if (this.state.product === null) return null;

    const price = (this.state.product.price / 100).toFixed(2); // convert to dollar amount
    const priceFormatted = '$' + price;

    return (
      <>
        {this.state.itemAdded ? <AddedModal setView={this.setView}/> : <i/>}
        <section id='details-area' className='card col-10 mx-auto p-3'>
          <div
            id='back-to-catalog'
            view='catalog'
            onClick={this.setView}
            className='text-muted mb-2'>
            &lt; Back to catalog
          </div>

          <div id='details-content-top' className='d-flex flex-wrap mb-4'>
            <div id='detail-img-wrapper' className='d-flex justify-content-center col-5'>
              <img src={this.state.product.image} className='img-fluid'></img>
            </div>
            <section id='details-summary' className='d-flex flex-column col-7'>
              <h4 className='font-weight-bold'>{this.state.product.name}</h4>
              <div className='text-muted mb-4'>{priceFormatted}</div>
              <p>{this.state.product.shortDescription}</p>
              <button
                id='details-add-cart-btn'
                type='button'
                className='btn btn-primary btn-sm p-1 fit-content'
                onClick={this.addToCart} >
                Add to Cart
              </button>
            </section>
          </div>
          <p>{this.state.product.longDescription}</p>
        </section>
      </>
    );
  }
}

function AddedModal(props) {
  document.getElementsByTagName('body')[0].classList.add('disable-scroll');

  return (
    <section id='added-modal-wrapper'>
      <div id='added-modal' className='d-flex flex-column align-items-center'>
        <h1 className='text-primary mb-4'>Item added to cart!</h1>
        <button type='button' view='catalog' onClick={props.setView} className='btn btn-primary mb-2'>Continue Shopping</button>
        <button type='button' view='cart' onClick={props.setView} className='btn btn-primary'>View Cart</button>
      </div>
    </section>
  );
}
