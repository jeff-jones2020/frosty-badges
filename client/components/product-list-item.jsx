import React from 'react';

export default class ProductListItem extends React.Component {

  render() {
    return (
      <div id={this.props.productId} className='card col-4'>
        <img src={this.props.image} className='card-img-top' alt={this.props.name}/>
          <div className='card-body'>
            <h5 className='card-title'>{this.props.name}</h5>
            <p className='card-text text-muted'>{this.props.price}</p>
            <p className='card-text'>{this.props.shortDescription}</p>
          </div>
      </div>
    );
  }
}
