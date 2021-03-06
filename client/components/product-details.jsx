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
        {this.state.itemAdded ? <AddedModal setView={this.setView} image={this.state.product.image}/> : <></>}
        <section id='details-area' className='card col-xl-4 col-lg-6-col-md-8 col-sm-9 col-11 mx-auto p-3'>
          <div
            id='back-to-catalog'
            view='catalog'
            onClick={this.setView}
            className='text-muted mb-2'>
            &lt; Back to catalog
          </div>

          <div id='details-content-top' className='d-flex flex-wrap mb-4'>
            <div className='d-flex justify-content-center col-5 detail-img-wrapper'>
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
    <section id='modal-wrapper'>
      <div id='modal' className='d-flex justify-content-between col-xl-4 col-lg-6 col-md-7 col-sm-10 col-11 p-4 added-modal'>
        <section className='d-flex flex-column align-items-center justify-content-around'>
          <h2 className='text-primary my-4'>Item added to cart!</h2>
          <div className='d-flex justify-content-center col-8 detail-img-wrapper'>
            <img src={props.image} className='img-fluid'></img>
          </div>
        </section>
        <div className='col-1 mx-0'></div>
        <section className='d-flex flex-column align-items-center justify-content-around btn-column'>
          <button type='button' view='catalog' onClick={props.setView} className='btn btn-primary mb-2'>Continue<br/> Shopping</button>
          <button type='button' view='cart' onClick={props.setView} className='btn btn-success mb-2'>View Cart</button>
          <button type='button' view='checkout' onClick={props.setView} className='btn btn-success'>Checkout</button>
        </section>
      </div>
    </section>
  );
}
