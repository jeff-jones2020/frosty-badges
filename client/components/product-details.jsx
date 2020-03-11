import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    }

    this.setView = this.setView.bind(this);
  }

  setView() {
    this.props.setViewCallback('catalog', {})
  }

  componentDidMount() {
    fetch('/api/products/' + this.props.viewParams.productId)
      .then(response => response.json())
      .then(data => {
        this.setState({
          product: data
        })
      })
  }

  render(){
    if (this.state.product === null) return null;

    const price = this.state.product.price.toString();
    const priceFormatted = '$' + price.slice(0, price.length - 2) + '.' + price.slice(price.length - 2);

    return (
      <section id='details-area' className='card col-10 mx-auto p-3'>
        <div
          id='back-to-catalog'
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
          </section>
        </div>
        <p>{this.state.product.longDescription}</p>
      </section>
    );
  }
}
