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
      <section id='details-area'>
        <button
          id='back-to-catalog'
          type='button'
          onClick={this.setView}
          className='text-muted'>
          &lt; Back to catalog
        </button>

        <div id='details-content' className='d-flex flex-wrap col-12 mx-auto'>
          <div id='detail-img-wrapper' className='details-img-container col-5'>
            <img src={this.state.product.image}></img>
          </div>
          <div>{this.state.product.name}</div>
          <div>{priceFormatted}</div>
        </div>
      </section>
    );
  }
}
