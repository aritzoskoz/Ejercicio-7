import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

import Router from './Router';

const Navigation = (props) => 

<div class="header">
  <ul class="list-group">
    <li class="list-group-item list-group-item-secondary"><NavLink  to={{ pathname:'/Tienda', state: { carritoActual: [] }}}> TIENDA (Realizar Pedido)</NavLink></li>
    <li class="list-group-item list-group-item-secondary"><NavLink  to={{ pathname:'/Pedidos', state: { carritoActual: [] }}}>PEDIDOS (Histórico de Pedidos)</NavLink></li>
  </ul>
</div>


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
