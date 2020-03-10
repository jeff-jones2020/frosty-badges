import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    const price = this.props.price.toString();
    const formattedPrice = `$
    ${price.slice(0, price.length - 2)}.${price.slice(price.length - 2)}`;

    return (
      <div id={this.props.productId} className='card card-unpad col-12 flex-column'>
        <div className='card-img-container'>
          <img src={this.props.image} className='h-100 flex-grow-1 card-img-top item-img' alt={this.props.name}/>
        </div>
          <div className='card-body card-body-unpad'>
            <h5 className='card-title title-text'>{this.props.name}</h5>
            <p className='card-text card-text-small text-muted'>{formattedPrice}</p>
            <p className='card-text'>{this.props.shortDescription}</p>
          </div>
      </div>
    );
  }
}
