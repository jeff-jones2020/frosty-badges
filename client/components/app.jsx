import React from 'react';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const viewName = this.state.view.name;

    if(viewName === 'catalog')
      return (
        <>
          {Header()}
          <ProductList setViewCallback={this.setView}/>
        </>
      );
    else if (viewName === 'details')
      return (
        <>
          {Header()}
          <ProductDetails viewParams={this.state.view.params} setViewCallback={this.setView} />
        </>
      );
  }
}

function Header() {
  return (
    <div className='navbar-expand-md mb-5'>
      <nav id='header' className="d-flex justify-content-start navbar navbar-dark bg-dark">
        <a className='nav-brand'>$</a>
        <div>
          <a className='nav-item ml-2'>Wicked Sales</a>
        </div>
      </nav>
    </div>
  )
}
