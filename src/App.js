import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Router from './Router';

const Navigation = (props) => 
<nav>
  <ul>
    <li><NavLink to='/'>Tienda</NavLink></li>
    <li><NavLink to='/Pedidos'>Pedidos</NavLink></li>
  </ul>
</nav>


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Router />
      </div>
    );
  }
}

export default App;
