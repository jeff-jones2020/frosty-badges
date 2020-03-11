import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    }
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

    return (
      <div className='modal' tabIndex='-1' role='dialog'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
              <h5 className='modal-title'>Modal title</h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            <div className='modal-body'>
              <p>Modal body text goes here.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
