import React from 'react';

export default class ProductListItem extends React.Component {

  render() {
    return (
      <div className="card">
        <img src={this.props.imgPath} className="card-img-top" alt={this.props.altText}/>
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <p className="card-text">{this.props.cardText}</p>
            <a href="#" className="btn btn-primary">{this.buttonText}</a>
          </div>
      </div>
    );
  }
}
